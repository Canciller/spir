import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withStorage } from '../context';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormView from '../components/FormView';

const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({
    cart: {
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.paper,
        marginTop: theme.spacing.unit * 2,
        borderRadius: theme.shape.borderRadius,
        border: '1px solid',
        borderColor: theme.palette.divider,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit
    },
    cartItem: {
        padding: theme.spacing.unit,
        display: 'flex'
    },
    cartItemName: {
        flex: 1
    },
    cartItemQuantity: {
        paddingRight: theme.spacing.unit * 2
    },
    info: {
        display: 'flex',
        marginTop: theme.spacing.unit * 2
    },
    infoLabel: {
        flex: '1'
    }
})

class Payment extends Component {
    state = {
        change: NaN
    }

    onConfirm = (e, { amount }) => {
        const {
            change
        } = this.state;

    }

    componentDidMount() {
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
            amount
        } = this.state;

        const total = storage.cart.total(),
              change = amount - total;

        const cart = storage.cart.get();

        return (
            <FormView
                title={`Payment - Total: $${total.toFixed(2)}`}
                fields={{
                    address: {
                        control: 'select',
                        label: 'Payment Type',
                        items: [
                            'Cash',
                            'SPIR Rewards'
                        ]
                    },
                    amount: {
                        control: 'textfield',
                        label: 'Pay with',
                        required: true,
                        adorment: '$',
                        placeholder: '0.00',
                        valueOptions: {
                            validate: value => {
                                if(Number.isNaN(value)) return false;
                                return value > 0;
                            }
                        },
                        onChange: (e, amount) => this.setState({ amount }),
                        autoFocus: true
                    }
                }}
                actions={{
                    confirm: {
                        callback: this.onConfirm,
                        disabled: Number.isNaN(change) || change < 0
                    }
                }}
            >
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
                                        variant='subtitle1'
                                    >
                                        {`$${item.price.toFixed(2)}`}
                                    </Typography>
                                </div>
                                { i !== cart.length - 1 &&
                                    <Divider />
                                }
                            </Fragment>
                        )
                    })}
                </div>
                <div
                    className={classes.info}
                >
                    <Typography
                        className={classes.infoLabel}
                        variant='subtitle1'
                    >
                        {`Total: $${total.toFixed(2)}`}
                    </Typography>
                    { (!Number.isNaN(Number(change)) && change >= 0) &&
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

export default withStorage(withSnackbar(withStyles(styles)(Payment)));