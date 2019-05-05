import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import withSpir from './withSpir';

import StorageContext from './StorageContext';

const notificationOptions = {
    autoHideDuration: 800,
    preventDuplicate: false,
    /*
    transitionDuration: {
        enter: 400, exit: 250
    }
    */
}

class StorageProvider extends Component {
    state = {
        categories: [],
        cart: []
    }

    category = value => {
        const category = this.state.categories[value];
        if(category) return category.name;
        else return 'unknown';
    }

    items = () => {
        const {
            spir,
            enqueueSnackbar
        } = this.props;

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
                        if(item.quantity <= 0) {
                            items.splice(i, 1);
                            continue;
                        }

                        items[i] = item;
                    }

                    this.setState({ items });
                })
                .catch(err => console.log(err));
        }

        return this.state.items;
    }

    delete = item => {
        const { items } = this.state;
        if(!items) return;

        this.setState({ items: items.filter(it => it._id !== item._id) })
    }

    refresh = () => {
        this.fetching = false;
        this.setState({ items: undefined });
    }

    cart = {
        get: () => this.state.cart,
        add: item => {
            let items = this.state.items,
                cart = this.cart.get();

            const cartIndex = cart.findIndex(it => it._id === item._id),
                  itemsIndex = items.findIndex(it => it._id === item._id);

            if(itemsIndex >= 0) {
                let fetched = items[itemsIndex];

                fetched.quantity -= 1;
                if(fetched.quantity <= 0) items.splice(itemsIndex, 1);
            }

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


            this.setState({ cart, items }, () =>
                this.props.enqueueSnackbar(`${item.name} added to cart`, {
                    variant: 'success',
                    ...notificationOptions
                }));
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
        refresh: () => this.setState({ cart: [] })
    }

    componentDidMount() {
        const {
            spir,
            enqueueSnackbar
        } = this.props;

        spir.categories.get()
            .then(categories => this.setState({ categories }))
            .catch(err => console.log(err));
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
                    add: this.add
                }}
            >
                {this.props.children}
            </StorageContext.Provider>
        )
    }
}

export default withSpir(withSnackbar(StorageProvider));
