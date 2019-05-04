import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../../context';

import FormView from '../../components/FormView';

const styles = theme => ({})

class AddItem extends Component {
    state = {}

    onAdd = (e, item) => {
        this.props.spir.inventory.add(item)
            .then(added => console.log(added))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.props.spir.categories.get()
            .then(categories => {
                categories = categories.map(category => category.name);
                this.setState({ categories });
            })
            .catch(err => console.log(err));
    }

    render() {
        const {
            categories
        } = this.state;

        return (
            <FormView
                title='Add Item'
                fields={[
                        {
                            type: 'textfield',
                            required: true,
                            label: 'Name',
                            target: 'name',
                            autoFocus: true
                        },
                        {
                            type: 'textfield',
                            label: 'Description',
                            target: 'description',
                            placeholder: 'No description'
                        },
                        {
                            type: 'textfield',
                            label: 'Price',
                            target: 'price',
                            required: true,
                            number: '+',
                            placeholder: '0.00',
                            adorment: '$'
                        },
                        {
                            type: 'select',
                            items: categories,
                            label: 'Category',
                            target: 'category_code'
                        },
                        {
                            type: 'textfield',
                            label: 'Quantity',
                            target: 'quantity',
                            number: '+',
                            placeholder: '1',
                            defaultValue: 1
                        },
                    ]}
                actions={[
                    {
                        name: 'Add',
                        callback: this.onAdd
                    }
                ]}
            />
        )
    }
}

export default withSpir(withStyles(styles)(AddItem));
