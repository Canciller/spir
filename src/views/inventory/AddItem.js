import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Translate } from 'react-localize-redux';
import { withStyles } from '@material-ui/core/styles';

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
        nameEmpty: false,

        description: '',

        price: 0,
        priceNaN: false,

        category_code: 0,
        categories: [
            { value: 0, name: 'Product' },
            { value: 1, name: 'Service' }
        ],
    }

    formHasError = () => {
        const { nameEmpty, priceNaN } = this.state;
        return nameEmpty || priceNaN;
    }

    handleNameChange = e => {
        let value = e.target.value;
        this.setState({ name: value, nameEmpty: value === '' });
    }

    handleDescriptionChange = e => {
        this.setState({ description: e.target.value });
    }

    handlePriceChange = e => { 
        let value = e.target.value, price = 0;
        if(value !== '') price = parseFloat(value);

        if(isNaN(price)) return this.setState({ priceNaN: true });

        this.setState({ price, priceNaN: price <= 0 });
    }

    onChangeCategory = e => {
        let value = e.target.value;
        this.setState({ category_code: value });
    }

    handleAdd = () => {
        let { name, description, price, category_code } = this.state;
        let { spirApi } = this.props;

        this.setState({
            nameEmpty: name === '',
            priceNaN: price <= 0
        }, () => {
            if(!this.formHasError()) {
                let item = { name, description, price, category_code }
                spirApi.inventory.add(item);
            }
        });

    }

    render() {
        const { classes } = this.props;

        const {
            nameEmpty,
            priceNaN,
            category_code,
            categories
        } = this.state;

        return (
            <View
                title={<Translate id='section.additem' />}
                back
            >
                <Form>
                    <TextField
                        required
                        error={nameEmpty}
                        label={<Translate id='name'/>}
                        onChange={this.handleNameChange}
                    />
                    <TextField
                        label={<Translate id='description'/>}
                        placeholder='No description'
                        onChange={this.handleDescriptionChange}
                    />
                    <TextField
                        required
                        error={priceNaN}
                        label={<Translate id='price'/>}
                        adorment='$'
                        placeholder='0.00'
                        onChange={this.handlePriceChange}
                    />
                    <Select
                        onChange={this.onChangeCategory}
                        label={<Translate id='category'/>}
                        value={category_code}
                        items={categories}
                    />
                    <Button
                        margin
                        onClick={this.handleAdd}
                    >
                        <Translate id='add' />
                    </Button>
                </Form>
            </View>
        )
    }
}

export default withStyles(styles)(withSpirApi(AddItem));
