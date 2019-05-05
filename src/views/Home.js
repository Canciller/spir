import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { withStorage } from '../context';

import routes from '../config/routes';

import DataView from '../components/DataView';
import View from '../components/View';
import Button from '../components/Button';

const styles = theme => ({
    cartRoot: {
        marginBottom: theme.spacing.unit * 2,
        overflow: 'auto',
        padding: 0
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
        this.setState({ height: window.innerHeight - actions.offsetHeight - 152 })

        window.addEventListener('resize', e => {
            const actions = ReactDOM.findDOMNode(this.actionsRef);

            if(!actions) return;
            this.setState({ height: window.innerHeight - actions.offsetHeight - 152 })
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

                title='Checkout'
                onRefresh={storage.cart.refresh}
                ref={ref => this.rootRef = ref}
            >
                <DataView
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

                    emptyMessage='Nothing in cart.'

                    onClick={storage.cart.remove}
                    onDelete={storage.cart.remove}

                    data={storage.cart.get()}
                    dataFormat={{
                        name: {
                            variant: 'title',
                            index: 0
                        },
                        price: {
                            variant: 'subheading',
                            gutterBottom: true,
                            label: 'Price',
                            format: '${}',
                            index: 1
                        },
                        description: {
                            variant: 'subtitle2',
                            defaultValue: 'No description',
                            align: 'justify',
                            gutterBottom: true,
                            index: 2
                        },
                        category_code: {
                            variant: 'caption',
                            label: 'Category',
                            format: storage.category,
                            index: 3
                        },
                        quantity: {
                            variant: 'caption',
                            label: 'Quantity',
                            index: 4
                        },
                        _id: { visible: false },
                        __v: { visible: false }
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
                        Checkout
                    </Button>
                </div>
            </View>
        )
    }
}

export default withStorage(withStyles(styles)(Checkout));
