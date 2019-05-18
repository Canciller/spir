import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withSpir } from '../../context';

import FormView from '../../components/FormView';

const styles = theme => ({})

class AddItem extends Component {
    state = {}

    notify = (obj, variant) => {
        if(obj === undefined) return;
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(obj.message || obj, {
            variant
        });
    }

    onCreate = (e, item) => {
        this.props.spir.inventory.add(item)
            .then(added => this.notify(`${added.name} successfully added to inventory`, 'success'))
            .catch(err => this.notify(err, 'error'));
    }

    componentDidMount() {
        this.props.spir.categories.get()
            .then(categories => {
                categories = categories.map(category => {
                    let name = category.name;
                    name = name.charAt(0).toUpperCase() + name.slice(1);
                    return name;
                });
                this.setState({ categories });
            })
            .catch(err => this.notify(err, 'error'));
    }

    render() {
        const {
            categories
        } = this.state;

        return (
            <FormView
                title='Create Item'
                fields={{
                        name: {
                            control: 'textfield',
                            required: true,
                            label: 'Name',
                            target: 'name',
                            autoFocus: true
                        },
                        description: {
                            control: 'textfield',
                            label: 'Description',
                            target: 'description',
                            placeholder: 'No description'
                        },
                        price: {
                            control: 'textfield',
                            label: 'Price',
                            required: true,
                            placeholder: '0.00',
                            adorment: '$',
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
                            label: 'Category',
                        },
                        quantity: {
                            control: 'textfield',
                            label: 'Quantity',
                            placeholder: '1',
                            valueOptions: {
                                type: Number,
                                default: 1,
                                validate: value => {
                                    if(Number.isNaN(value)) return false;
                                    return value >= 0;
                                }
                            }
                        }
                    }}
                actions={{
                    create: {
                        callback: this.onCreate
                    }
                }}
            />
        )
    }
}

export default withSnackbar(withSpir(withStyles(styles)(AddItem)));
