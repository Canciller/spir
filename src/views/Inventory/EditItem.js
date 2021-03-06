import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withSpir } from '../../context';

import FormView from '../../components/FormView';
import ErrorView from '../../components/ErrorView';

const styles = theme => ({})

class EditItem extends Component {
    state = {}

    notify = (obj, variant) => {
        if(obj === undefined) return;
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(obj.message || obj, {
            variant
        });
    }

    onSave = (e, item) => {
        this.props.spir.inventory.update(item.id, item)
            .then(saved => this.notify(`${saved.name} successfully saved to inventory`, 'success'))
            .catch(err => this.notify(err, 'error'));
    }

    componentDidMount() {
        const {
            history,
            spir
        } = this.props;

        spir.categories.get()
            .then(categories => {
                categories = categories.map(category => {
                    let name = category.name;
                    name = name.charAt(0).toUpperCase() + name.slice(1);
                    return name;
                });
                this.setState({ categories });
            })
            .catch(err => this.notify(err, 'error'));

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
                    fields={{
                        name: {
                            control: 'textfield',
                            required: true,
                            label: 'Name',
                            target: 'name',
                            value: data.name,
                            autoFocus: true
                        },
                        description: {
                            control: 'textfield',
                            label: 'Description',
                            target: 'description',
                            value: data.description,
                            placeholder: 'No description'
                        },
                        price: {
                            control: 'textfield',
                            label: 'Price',
                            required: true,
                            placeholder: '0.00',
                            adorment: '$',
                            value: data.price,
                            valueOptions: {
                                type: Number,
                                validate: value => {
                                    if(Number.isNaN(value)) return false;
                                    return value > 0;
                                }
                            }
                        },
                        category_code: {
                            control: 'select',
                            items: categories,
                            value: data.category_code,
                            label: 'Category',
                        },
                        quantity: {
                            control: 'textfield',
                            label: 'Quantity',
                            placeholder: '1',
                            value: data.quantity,
                            valueOptions: {
                                type: Number,
                                default: 1,
                                validate: value => {
                                    if(Number.isNaN(value)) return false;
                                    return value >= 0;
                                }
                            }
                        },
                        id: {
                            control: 'textfield',
                            label: 'Identifier',
                            disabled: true,
                            value: data._id
                        }
                    }}
                actions={{
                    save: {
                        callback: this.onSave
                    }
                }}
            />
        )
    }
}

export default withSnackbar(withSpir(withStyles(styles)(EditItem)));
