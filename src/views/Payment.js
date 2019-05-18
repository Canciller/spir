import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withStorage } from '../context';

import Typography from '@material-ui/core/Typography';
import FormView from '../components/FormView';

const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({
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
        console.log(amount);
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

        const total = storage.cart.total();

        const change = amount - total;

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
                        onChange: (e, amount) => this.setState({ amount })
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
                                {`Change: $${change}`}
                            </Typography>
                    }
                </div>
            </FormView>
        )
    }
}

export default withStorage(withSnackbar(withStyles(styles)(Payment)));
