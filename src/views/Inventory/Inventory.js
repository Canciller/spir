import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../../context';

import routes from '../../config/routes';

import DataView from '../../components/DataView';

const styles = theme => ({})

class Inventory extends Component {
    state = {}

    getCategoryName = categoryCode => {
        const { categories } = this.state;

        let unknown = 'Unknown';
        if(!categories) return unknown;

        let category = categories[categoryCode];
        if(!category) return unknown;

        return category.name;
    }

    fetchData = () => {
        const { spir } = this.props;

        this.setState({
            items: undefined,
            categories: undefined
        }, () => {
            spir.inventory.get()
                .then(items => this._isMounted && this.setState({ items }))
                .catch(err => console.log(err));

            spir.categories.get()
                .then(categories => this._isMounted && this.setState({ categories }))
                .catch(err => console.log(err));
        });
    }

    onDeleteItem = item => {
        const { spir } = this.props;
        const { items } = this.state;

        spir.inventory.delete(item._id)
            .then(item => {
                this.setState({ items: items.filter(it => it._id !== item._id) })
                //Item deleted message
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this._isMounted = true;

        this.fetchData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {
            items,
            error
        } = this.state;

        return (
            <DataView
                title='Inventory'

                error={error}

                editPath={routes.editItem.path}
                addPath={routes.addItem.path}

                onDelete={this.onDeleteItem}
                deleteDialog={{
                    message: 'Are you sure you want to delete this item?'
                }}
                onRefresh={this.fetchData}

                data={items}
                dataFormat={{
                    name: {
                        variant: 'title',
                        index: 0
                    },
                    price: {
                        variant: 'subtitle1',
                        gutterBottom: true,
                        label: 'Price',
                        format: '${}.00',
                        index: 1
                    },
                    description: {
                        variant: 'caption',
                        defaultValue: 'No description',
                        index: 2
                    },
                    category_code: {
                        variant: 'caption',
                        label: 'Category',
                        format: this.getCategoryName,
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
        )
    }
}

export default withSpir(withStyles(styles)(Inventory));
