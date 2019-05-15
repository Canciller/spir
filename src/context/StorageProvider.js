import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import withSpir from './withSpir';

import StorageContext from './StorageContext';

const notificationOptions = {
    autoHideDuration: 1000,
    preventDuplicate: false,
    transitionDuration: {
        enter: 600, exit: 400
    }
}

class StorageProvider extends Component {
    state = {
        categories: [],
        cart: []
    }

    notify = (obj, variant, callback) => {
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(obj.message || obj, {
            variant
        });

        if(callback instanceof Function)
            callback(obj);
    }

    onError = (err) => {
        this.notify(err, 'error', () => {
            this.setState({ error: true, errorMessage: err.message });
        });
    }

    category = value => {
        let c = this.state.categories[value];
        c = c ? c.name : 'unknown';
        return c.charAt(0).toUpperCase() + c.slice(1);
    }

    items = () => {
        const { spir } = this.props;

        if(!this.fetching) {
            this.fetching = true;

            spir.inventory.get()
                .then(items => {
                    const cart = this.cart.get();

                    for(let i = items.length - 1; i >= 0; --i) {
                        let item = items[i];

                        const index = cart.findIndex(it => it._id === item._id);
                        if(index < 0) continue;

                        item.quantity -= cart[index].quantity;

                        items[i] = item;
                    }

                    this.setState({ items });
                })
                .catch(err => this.onError(err));
        }

        return this.state.items;
    }

    delete = item => {
        const { spir } = this.props;
        const { items, cart } = this.state;
        if(!items) return;

        spir.inventory.delete(item._id)
            .then(deleted => {
                this.setState({
                    items: items.filter(it => it._id !== item._id),
                    cart: cart.filter(it => it._id !== item._id)
                }, () => {
                    this.notify(`${item.name} successfully deleted from inventory`, 'success');
                });
            })
            .catch(err => this.notify(err, 'error'));
    }

    refresh = () => {
        this.fetching = false;
        this.setState({ items: undefined, error: false });
    }

    cart = {
        get: () => this.state.cart,
        add: item => {
            let items = this.state.items,
                cart = this.cart.get();

            const cartIndex = cart.findIndex(it => it._id === item._id),
                  itemsIndex = items.findIndex(it => it._id === item._id);

            let emptyItem = false;

            if(itemsIndex >= 0) {
                let fetched = items[itemsIndex];

                fetched.quantity -= 1;
                if(fetched.quantity < 0) {
                    fetched.quantity = 0;
                    emptyItem = true;
                    //items.splice(itemsIndex, 1);
                }
            }

            if(!emptyItem) {
                if(cartIndex >= 0) {
                    let found = cart[cartIndex];
                    found.quantity += 1;
                    cart[cartIndex] = found;
                } else {
                    const {
                        quantity,
                        ...other
                    } = item;

                    cart.push({ quantity: 1, ...other });
                }
            }

            const { enqueueSnackbar } = this.props;

            this.setState({ cart, items }, () => {
                if(!emptyItem)
                    enqueueSnackbar(`${item.name} added to cart`, {
                        variant: 'success',
                        ...notificationOptions
                    });
                else
                    enqueueSnackbar(`No more ${item.name} left`, {
                        variant: 'error',
                        ...notificationOptions
                    });
            });
        },
        remove: item => {
            let cart = this.cart.get();

            const cartIndex = cart.findIndex(it => it._id === item._id);

            if(cartIndex >= 0) {
                let found = cart[cartIndex];
                found.quantity -= 1;
                if(found.quantity === 0) cart.splice(cartIndex, 1);
                else cart[cartIndex] = found;

                this.setState({ cart }, () =>
                    this.props.enqueueSnackbar(`${item.name} removed from cart`, {
                        variant: 'info',
                        ...notificationOptions
                    }));
            }


        },
        removeAll: item => {
            let cart = this.cart.get();

            const cartIndex = cart.findIndex(it => it._id === item._id);

            if(cartIndex >= 0) {
                cart.splice(cartIndex, 1);

                this.setState({ cart }, () =>
                    this.props.enqueueSnackbar(`${item.name} removed from cart`, {
                        variant: 'info',
                        ...notificationOptions
                    }));
            }

        },
        refresh: () => this.setState({ cart: [] }),
        total: () => {
            const cart = this.cart.get();
            let total = 0;
            for(const item of cart)
                total += item.quantity * item.price;
            return total;
        }
    }

    getErrorMessage = () => this.state.errorMessage;

    hasError = () => this.state.error;

    componentDidMount() {
        const { spir } = this.props;

        spir.categories.get()
            .then(categories => this.setState({ categories }))
            .catch(this.onError);
    }

    render() {
        return (
            <StorageContext.Provider
                value={{
                    category: this.category,
                    items: this.items,
                    cart: this.cart,
                    refresh: this.refresh,
                    delete: this.delete,
                    add: this.add,
                    error: this.error,
                    getErrorMessage: this.getErrorMessage,
                    hasError: this.hasError
                }}
            >
                {this.props.children}
            </StorageContext.Provider>
        )
    }
}

export default withSpir(withSnackbar(StorageProvider));
