import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { withStorage } from '../context';

import routes from '../config/routes';

import DataGridView from '../components/DataGridView';
import View from '../components/View';
import Button from '../components/Button';
import Typography from '@material-ui/core/Typography';
import EmptyIcon from '@material-ui/icons/ShoppingCart';

const styles = theme => ({
    actions: {
        position: 'relative'
    },
    cartRoot: {
        marginBottom: theme.spacing.unit * 2,
        overflow: 'auto',
        padding: 0,
        justifyContent: 'center'
    },
    cartContent: {
        /*
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing.unit
        */
    },
    cartActions: {
        bottom: 110,
        marginRight: theme.spacing.unit * 2
    }
})

class Checkout extends Component {
    state = {}

    onCheckout = () => {
    }

    componentDidMount() {
        const actions = ReactDOM.findDOMNode(this.actionsRef);

        if(!actions) return;
        this.setState({ height: window.innerHeight - actions.offsetHeight - 140 });

        window.addEventListener('resize', e => {
            const actions = ReactDOM.findDOMNode(this.actionsRef);

            if(!actions) return;
            this.setState({ height: window.innerHeight - actions.offsetHeight - 140 });
            this.forceUpdate();
        })
    }

    render() {
        const {
            classes,
            storage
        } = this.props;

        return (
            <View
                classes={{
                    content: classes.content,
                    root: classes.root
                }}

                title={`Checkout - Total: $${storage.cart.total().toFixed(2)}`}
                onRefresh={storage.cart.refresh}
                ref={ref => this.rootRef = ref}
            >
                <DataGridView
                    back={false}

                    classes={{
                        root: classes.cartRoot,
                        content: classes.cartContent,
                        actions: classes.cartActions
                    }}

                    style={{
                        height: this.state.height
                    }}

                    addPath={routes.inventory.path}

                    deleteDialog={{
                        message: 'Are you sure you want to delete this item from the cart?'
                    }}

                    data={storage.cart.get()}

                    emptyViewProps={{
                        message: 'Cart is empty',
                        icon: EmptyIcon
                    }}

                    dataCardProps={{
                        width: 400,
                        absolute: value => {
                            return (
                                <Typography
                                    variant='subtitle1'
                                    color='primary'
                                >
                                    {value.quantity}
                                </Typography>
                            )
                        },
                        onClick: (e, value) => storage.cart.remove(value),
                        format: {
                            name: {
                                variant: 'title'
                            },
                            price: {
                                variant: 'subheading',
                                gutterBottom: true,
                                label: 'Price',
                                transform: value => `$${value.toFixed(2)}`
                            },
                            description: {
                                variant: 'subtitle2',
                                defaultValue: 'No description',
                                align: 'justify',
                                transform: value => {
                                    if(value.length === 0) return 'No description';
                                    return value;
                                }
                            },
                            category_code: {
                                variant: 'subtitle2',
                                label: 'Category',
                                transform: value => storage.category(value)
                            },
                            quantity: { visible: false },
                            _id: { visible: false },
                            __v: { visible: false }
                        }
                    }}
                />
                <div
                    className={classes.actions}
                >
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={this.onCheckout}
                        ref={ref => this.actionsRef = ref}
                    >
                        Checkout - Total: ${storage.cart.total().toFixed(2)}
                    </Button>
                </div>
            </View>
        )
    }
}

export default withStorage(withStyles(styles)(Checkout));
