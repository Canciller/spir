import React, { Component, Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import { withSpirApi } from '../../util';
import { withSnackbar } from 'notistack';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import View from '../../components/View';
import Form from '../../components/Form';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import Card from '../../components/partners/Card';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({
    main: {
        display: 'flex',
        width: '100%'
    },
    form: {
        marginLeft: theme.spacing.unit * 2
    },
    actionButtons: {
        marginTop: theme.spacing.unit * 2,
        display: 'flex'
    },
    actionButton: {
        flex: 1
    },
    waiting: {
        color: theme.palette.grey[600],
        margin: 'auto 0',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none'
    },
    progress: {
        alignSelf: 'center',
        marginBottom: theme.spacing.unit * 3
    },
})

class Deposit extends Component {
    state = {
        card: null,
        partner: null,

        amount: 0,
        loaded: false
    }

    setInfo = (card, partner) => {
        card = card === undefined ? null : card;
        partner = partner === undefined ? null : partner;

        this.setState({ card, partner, loaded: card && partner });
    }

    findCard = tag => {
        const {
            spirApi,
            enqueueSnackbar
        } = this.props;

        spirApi.cards.get(cards => {
            const card = cards.find(card => card.tag === tag);
            if(!card) return this.setInfo();

            spirApi.partners.getOne(card.partner, partner => {
                this.setInfo(card, partner);
                enqueueSnackbar('Card detected', {
                    variant: 'success'
                });
            });
        });
    }

    onChangeAmount = (value, target, error) => {
        this.setState({ amount: value, amountError: error });
    }

    onClickConfirmButton = () => {
        const {
            spirApi,
            enqueueSnackbar
        } = this.props;

        const {
            card,
            amount,
            partner
        } = this.state;

        if(Number.isNaN(amount) || amount <= 0) {
            enqueueSnackbar('Amount not valid', {
                variant: 'error',
                preventDuplicate: true
            });
            return this.setState({ amountError: true});
        }

        // Update balance on server
        spirApi.cards.update(card._id, { balance: card.balance += amount }, updated => {
            enqueueSnackbar(`$${amount.toFixed(2)} deposited to ${partner.first_name}`, {
                variant: 'success'
            });
            this.setInfo();
        });
    }

    onClickCancelButton = () => this.setInfo();

    componentDidMount() {
        ipcRenderer.on('reader:data', (e, tag) => this.findCard(tag));
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners();
    }

    render() {
        const { classes } = this.props;

        const {
            card,
            partner,
            loaded,
            amountError
        } = this.state;

        return (
            <Fragment>
                {loaded &&
                    <View>
                        <div className={classes.main}>
                            <Card
                                partner={partner}
                                card={card}
                            />
                            <Form
                                classes={{ root: classes.form }}
                            >
                                <Typography
                                    variant='title'
                                >
                                    Deposit
                                </Typography>
                                <TextField
                                    autoFocus
                                    onChange={this.onChangeAmount}
                                    error={amountError}
                                    required
                                    number='+'
                                    gutterTop
                                    adorment='$'
                                    label='Amount'
                                    placeholder='0.00'
                                />
                            </Form>
                        </div>
                        <div className={classes.actionButtons}>
                            <Button
                                onClick={this.onClickConfirmButton}
                                classes={{ root: classes.actionButton }}
                            >
                                Confirm
                            </Button>
                            <Button
                                gutterLeft
                                onClick={this.onClickCancelButton}
                                classes={{ root: classes.actionButton }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </View> ||
                    <div className={classes.waiting}>
                        <CircularProgress
                            size={85}
                            className={classes.progress}
                        />
                        <Typography
                            color='inherit'
                            variant='h6'
                        >
                            Waiting for card reading...
                        </Typography>
                    </div>
                }
            </Fragment>
        )
    }
}

export default withStyles(styles)(withSpirApi(withSnackbar(Deposit)));
