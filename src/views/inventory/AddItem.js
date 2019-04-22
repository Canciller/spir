import React, { Component, Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withLocalize } from "react-localize-redux";

import View from '../../components/View';
import Form from '../../components/Form';
import Select from '../../components/Select';
import TextField from '../../components/TextField';
import Button from '../../components/Button';

import { withSpirApi } from '../../util';

const styles = theme => ({})

class AddItem extends Component {
    state = {
        name: '',
        description: '',
        price: 0,
        quantity: 1,
        category: 0,
        categories: []
    }

    componentDidMount() {
        this.props.spirApi.categories.get((error, categories) => {
            categories = categories.map(category => ({ value: category.code, name: category.name }));
            this.setState({ categories });
        });
    }

    hasError = () => {
        let {
            name,
            price,
            quantity
        } = this.state;

        let nameError = name === '',
            priceError = Number.isNaN(price) || price <= 0,
            quantityError = false;

        if(quantity === '') quantity = 1;
        else quantityError = Number.isNaN(quantity) || quantity <= 0;

        this.setState({
            nameError,
            priceError,
            quantityError
        });

        return nameError || priceError || quantityError;
    }

    onChange = (value, target, error) => {
        this.setState({
            [target]: value,
            [`${target}Error`]: error
        });
    }

    onChangeCategory = e => {
        let value = e.target.value;
        this.setState({ category: value });
    }

    onClickAddButton = () => {
        const {
            name,
            description,
            price,
            quantity,
            category
        } = this.state;

        // TODO: Change category_code to category in Product Model
        const category_code = category;

        const {
            spirApi,
            translate,
            enqueueSnackbar
        } = this.props;

        if(!this.hasError()) {
            const item = {
                name, 
                description,
                price,
                quantity,
                category_code
            }

            spirApi.inventory.add(item, (error, added) => {
                enqueueSnackbar(`${added.name} was successfully added to inventory`, {
                    variant: 'success'
                });
            });
        } else this.props.enqueueSnackbar('Check for errors in the form', {
            variant: 'error',
            preventDuplicate: true
        });
    }

    render() {
        const {
            nameError,
            priceError,
            quantityError,
            category,
            categories,
        } = this.state;

        const {
            translate
        } = this.props;

        return (
            <View
                title={<Translate id='section.additem' />}
                back
            >
                <Form>
                    <TextField
                        autoFocus
                        gutterTop
                        required
                        error={nameError}
                        target='name'
                        label={translate('name')}
                        onChange={this.onChange}
                    />
                    <TextField
                        gutterTop
                        target='description'
                        onChange={this.onChange}
                        label={translate('description')}
                        placeholder={translate('message.inventory.no_description')}
                    />
                    <TextField
                        gutterTop
                        required
                        number='+'
                        error={priceError}
                        target='price'
                        adorment='$'
                        placeholder='0.00'
                        onChange={this.onChange}
                        label={translate('price')}
                    />
                    <Select
                        gutterTop
                        translateItems
                        value={category}
                        items={categories}
                        onChange={this.onChangeCategory}
                        label={translate('category')}
                    />
                    <TextField
                        gutterTop
                        number='+'
                        error={quantityError}
                        target='quantity'
                        defaultValue={1}
                        placeholder='1'
                        onChange={this.onChange}
                        label={translate('quantity')}
                    />
                    <Button
                        gutterTop
                        onClick={this.onClickAddButton}
                    >
                        {translate('add')}
                    </Button>
                </Form>
            </View>
        )
    }
}

export default withStyles(styles)(withSpirApi(withSnackbar(withLocalize(AddItem))));
