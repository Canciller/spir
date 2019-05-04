import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../../context';

import FormView from '../../components/FormView';
import ErrorView from '../../components/ErrorView';

const styles = theme => ({})

class EditItem extends Component {
    state = {}

    onSave = (e, item) => {
        this.props.spir.inventory.update(item.id, item)
            .then(saved => console.log(saved))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        const {
            history,
            spir
        } = this.props;

        spir.categories.get()
            .then(categories => {
                categories = categories.map(category => category.name);
                this.setState({ categories });
            })
            .catch(err => console.log(err));

        const location = history.location;
        if(!location || !location.state) return;

        this.setState({ data: location.state.data });
    }

    render() {
        const {
            categories,
            data
        } = this.state;

        if(!data)
            return (
                <ErrorView
                    message='Edit view not available.'
                />
            )
        else
            return (
            <FormView
                title='Edit Item'
                fields={[
                    {
                        type: 'textfield',
                        required: true,
                        autoFocus: true,
                        label: 'Name',
                        target: 'name',
                        value: data.name
                    },
                    {
                        type: 'textfield',
                        label: 'Description',
                        target: 'description',
                        placeholder: 'No description',
                        value: data.description
                    },
                    {
                        type: 'textfield',
                        label: 'Price',
                        target: 'price',
                        number: '+',
                        required: true,
                        placeholder: '0.00',
                        adorment: '$',
                        value: data.price
                    },
                    {
                        type: 'select',
                        items: categories,
                        label: 'Category',
                        target: 'category_code',
                        value: data.category_code
                    },
                    {
                        type: 'textfield',
                        label: 'Quantity',
                        target: 'quantity',
                        number: '+',
                        placeholder: '1',
                        defaultValue: 1,
                        value: data.quantity
                    },
                    {
                        label: 'Item ID',
                        disabled: true,
                        target: 'id',
                        value: data._id
                    }
                ]}
                actions={[
                    {
                        name: 'Save',
                        callback: this.onSave
                    }
                ]}
            />
        )
    }
}

export default withSpir(withStyles(styles)(EditItem));
