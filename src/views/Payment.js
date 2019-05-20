import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withHistory, withStorage, withSpir } from '../context';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormView from '../components/FormView';

import ClearIcon from '@material-ui/icons/Clear';

const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({
    cart: {
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.default,
        marginTop: theme.spacing.unit * 2,
        borderRadius: theme.shape.borderRadius,
        border: '1px solid',
        borderColor: theme.palette.divider,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    cartItem: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        display: 'flex'
    },
    cartItemPrice: {
        display: 'flex',
        alignItems: 'center'
    },
    cartItemName: {
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },
    cartItemQuantity: {
        paddingRight: theme.spacing.unit * 2
    },
    cartItemDelete: {
        marginLeft: theme.spacing.unit * 2,
        width: 35,
        height: 35,
        padding: 0,
        marginTop: 2,
        marginBottom: 2
    },
    info: {
        display: 'flex',
        marginTop: theme.spacing.unit * 2
    },
    infoLabel: {
        flex: 1
    }
})

class Payment extends Component {
    state = {
        change: NaN,
        payWithCard: false,
        bothPay: false
    }

    onPayment = callback => {
        const {
            enqueueSnackbar,
            history,
            storage,
            spir
        } = this.props;

        const {
            partner
        } = this.state;

        const products = storage.cart.get().map(item => ({
            product: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.quantity * item.price
        }));

        spir.payments.add({
            products,
            partner: partner ? partner._id : undefined,
            total: storage.cart.total()
        })
            .then(added => {
                const inventory = storage.items();
                if(inventory === undefined) return;

                let savesInventory = [];
                for(let i = 0; i < inventory.length; ++i)
                    savesInventory.push(spir.inventory.update(inventory[i]._id, inventory[i]));

                Promise.all(savesInventory)
                    .then(() => {
                        enqueueSnackbar('Inventory updated', { variant: 'info' });
                        storage.cart.refresh();
                        if(callback instanceof Function)
                            callback();
                        history.push('/');
                    })
                    .catch(this.onError);
            })
            .catch(this.onError);

    }

    onConfirm = (e, { amount, amount_card }) => {
        const {
            payWithCard,
            bothPay,
            card
        } = this.state;

        this.setState({ loading: true });

        const {
            spir,
            enqueueSnackbar,
        } = this.props;

        this.onPayment(() => {
            if((payWithCard || bothPay) && card) {
                spir.cards.update(card._id, { balance: card.balance - amount_card })
                    .then(updated => {
                        enqueueSnackbar(
                            `Payment completed, balance left: $${updated.balance.toFixed(2)}`,
                            { variant: 'success' }
                        );
                    })
                    .catch(this.onError);
            } else enqueueSnackbar('Payment completed', { variant: 'success' });
        })
    }

    onError = err => {
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(err.message, { variant: 'error' });
    }

    clearCardAndPartner = () => {
        this.setState({
            card: undefined,
            partner: undefined,
            loaded: false
        });
    }

    setCardAndPartner = (card, partner) => this.setState({
        card, partner, loaded: card !== undefined && partner !== undefined
    });

    findCard = tag => {
        const {
            storage,
            spir,
            enqueueSnackbar
        } = this.props;

        let {
            amount,
            cardAmount
        } = this.state;

        amount = Number(amount);
        amount = Number.isNaN(amount) ? 0 : amount;
        this.setState({ amount: amount.toFixed(2) })

        if(!this.state.payWithCard && !this.state.bothPay) return;
        let total = storage.cart.total() - amount;
        total = total < 0 ? 0 : total;

        this.clearCardAndPartner();

        spir.cards.get()
            .then(cards => {
                const card = cards.find(card => card.tag === tag);
                if(!card) return this.onError({ message: 'Card doesn\'t exist' });

                spir.partners.getOne(card.partner)
                    .then(partner => {
                        if(!partner) return;

                        this.setCardAndPartner(card, partner);
                        if(card.balance < total)
                            enqueueSnackbar(
                                `Not enough balance in card, current balance: $${card.balance.toFixed(2)}`,
                                { variant: 'error' }
                            );
                        else this.setState({ cardAmount: total }, () => {
                            enqueueSnackbar(
                                `Card detected, current balance: $${card.balance.toFixed(2)}`,
                                { variant: 'success' }
                            )
                        });
                    })
                    .catch(this.onError);
            })
            .catch(this.onError);
    }

    onChangePaymentType = (e, type) => this.setState({
        payWithCard: type === 1,
        bothPay: type === 2,
        amount: undefined,
        cardAmount: undefined
    });

    componentDidMount() {
        ipcRenderer.on('reader:data', (e, tag) => this.findCard(tag));
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }

    amount = 0;

    render() {
        const {
            classes,
            storage
        } = this.props;

        const {
            amount,
            cardAmount,
            payWithCard,
            bothPay,
            loading
        } = this.state;

        const total = storage.cart.total();
        const cart = storage.cart.get();

        let change = NaN;
        if(bothPay) {
            change = Number(amount) + (cardAmount === undefined ? 0 : cardAmount) - total;
        } else if(!payWithCard) change = amount - total;
        else change = cardAmount - total;

        const validToConfirm = !Number.isNaN(change) && change >= 0 && cart.length > 0;

        const validateAmount = value => {
            if(payWithCard && !bothPay) return true;
            if(Number.isNaN(value)) return false;
            return value >= 0;
        }

        return (
            <FormView
                loading={loading}
                loadingViewProps={{
                    message: 'Processing payment info...'
                }}
                title={`Payment - Total: $${total.toFixed(2)}`}
                fields={{
                    type: {
                        control: 'select',
                        label: 'Payment Type',
                        items: [
                            'Cash',
                            'SPIR Rewards',
                            'Cash + SPIR Rewards'
                        ],
                        onChange: this.onChangePaymentType
                    },
                    amount: {
                        control: 'textfield',
                        label: 'Pay with',
                        required: true,
                        adorment: '$',
                        placeholder: '0.00',
                        value: amount,
                        valueOptions: {
                            validate: validateAmount,
                            type: Number
                        },
                        onChange: (e, amount) => this.setState({ amount, cardAmount: undefined }),
                        autoFocus: true,
                        visible: !payWithCard || bothPay
                    },
                    amount_card: {
                        control: 'textfield',
                        adorment: cardAmount !== undefined ? '$' : undefined,
                        placeholder: 'Waiting for card reading...',
                        value: cardAmount !== undefined ? cardAmount.toFixed(2) : undefined,
                        valueOptions: {
                            type: Number
                        },
                        disabled: true,
                        visible: payWithCard || bothPay
                    }
                }}
                actions={{
                    confirm: {
                        callback: this.onConfirm,
                        disabled: !validToConfirm
                    }
                }}
            >
                { cart.length !== 0 &&
                        <div
                            className={classes.cart}
                        >
                            {cart.map((item, i) => {
                                return (
                                    <Fragment
                                        key={i}
                                    >
                                        <div
                                            className={classes.cartItem}
                                        >
                                            <Typography
                                                variant='subtitle1'
                                                className={classes.cartItemName}
                                            >
                                                {item.name} x {item.quantity}
                                            </Typography>
                                            <Typography
                                                className={classes.cartItemPrice}
                                                variant='subtitle1'
                                            >
                                                {`$${(item.price * item.quantity).toFixed(2)}`}
                                            </Typography>
                                            <IconButton
                                                color='primary'
                                                className={classes.cartItemDelete}
                                                onClick={e =>  storage.cart.remove(item)}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </div>
                                        { i !== cart.length - 1 &&
                                                <Divider />
                                        }
                                    </Fragment>
                                )
                            })}
                        </div>
                }
                <div
                    className={classes.info}
                >
                    <Typography
                        className={classes.infoLabel}
                        variant='subtitle1'
                    >
                        {`Total: $${total.toFixed(2)}`}
                    </Typography>
                    { (!Number.isNaN(change) && change > 0 && (!payWithCard || bothPay)) &&
                            <Typography
                                className={classes.infoLabel}
                                variant='subtitle1'
                            >
                                {`Change: $${change.toFixed(2)}`}
                            </Typography>
                    }
                </div>
            </FormView>
        )
    }
}

export default withHistory(withSpir(withStorage(withSnackbar(withStyles(styles)(Payment)))));
