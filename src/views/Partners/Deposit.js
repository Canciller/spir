import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withSpir } from '../../context';

import View from '../../components/View';
import FormView from '../../components/FormView';
import Card from '../../components/Card';

const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({
    root: {
        margin: 'auto',
        /*
        padding: theme.spacing.unit * 2,
        borderStyle: 'solid',
        borderRadius: theme.shape.borderRadius,
        borderWidth: 1,
        borderColor: theme.palette.divider
        */
    },
    content: {
        display: 'flex'
    },
    formViewHeaderActions: {
        position: 'absolute',
        top: 26
    },
    formViewPadding: {
        padding: 0
    },
    cardRoot: {
        marginBottom: theme.spacing.unit
    }
})

class Deposit extends Component {
    state = {}

    onConfirm = (e, { amount }) => {
        const {
            enqueueSnackbar,
            spir
        } = this.props;

        const {
            card,
            partner
        } = this.state;

        if(card === undefined || partner === undefined) return;

        spir.cards.update(card._id, { balance: card.balance + amount })
            .then(() => {
                this.clearCardAndPartner();
                enqueueSnackbar(`$${amount} deposited to ${partner.first_name} ${partner.last_name}`,
                    { variant: 'success' });
            })
            .catch(this.onError);
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
            spir,
            enqueueSnackbar
        } = this.props;

        this.clearCardAndPartner();

        spir.cards.get()
            .then(cards => {
                const card = cards.find(card => card.tag === tag);
                if(!card) return this.onError({ message: 'Card doesn\'t exist' });

                spir.partners.getOne(card.partner)
                    .then(partner => {
                        if(!partner) return;

                        this.setCardAndPartner(card, partner);
                        enqueueSnackbar('Card detected', { variant: 'success' });
                    })
                    .catch(this.onError);
            })
            .catch(this.onError);
    }

    componentDidMount() {
        ipcRenderer.on('reader:data', (e, tag) => this.findCard(tag));
        this.findCard('0000868785');
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }

    render() {
        const { classes } = this.props;

        const {
            card,
            partner,
            loaded
        } = this.state;

        return (
            <View
                title='Deposit'
                onRefresh={this.clearCardAndPartner}
                loading={!loaded}
                loadingViewProps={{
                    message: 'Waiting for card reading...'
                }}
                classes={{
                    content: classes.content
                }}
            >
                <div
                    className={classes.root}
                >
                    <Card
                        classes={{
                            root: classes.cardRoot
                        }}
                        data={{
                            card,
                            partner
                        }}
                    />
                    <FormView
                        back={false}
                        viewClasses={{
                            root: classes.formViewPadding,
                            content: classes.formViewPadding,
                            headerActions: classes.formViewHeaderActions
                        }}

                        fields={{
                            amount: {
                                control: 'textfield',
                                label: 'Amount',
                                placeholder: '0.00',
                                adorment: '$',
                                required: true,
                                autoFocus: true,
                                valueOptions: {
                                    type: Number,
                                    validate: value => {
                                        if(Number.isNaN(value)) return false;
                                        return value > 0;
                                    }
                                }
                            }
                        }}

                        actions={{
                            confirm: {
                                callback: this.onConfirm
                            }
                        }}
                    />
                </div>
            </View>
        )
    }
}

export default withSpir(withSnackbar(withStyles(styles)(Deposit)));
