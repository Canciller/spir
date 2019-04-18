import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import View from '../../components/View';
import Form from '../../components/Form';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
    margin: {
        marginTop: theme.spacing.unit * 2
    }
})

class AddItem extends Component {
    state = {
        name: '',
        description: '',
        price: 0,
        priceNaN: false
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    }

    handleDescriptionChange = e => {
        this.setState({ description: e.target.value });
    }

    handlePriceChange = e => { 
        let value = e.target.value, price = 0;
        if(value !== '') price = parseFloat(value);

        if(isNaN(price)) return this.setState({ priceNaN: true });

        this.setState({ price: e.target.value, priceNaN: false });
    }

    handleAdd = () => {
        console.log(this.state);
    }

    componentDidMount() {
        this.forceUpdate();
    }

    render() {
        const {
            classes,
            history
        } = this.props;

        const {
            priceNaN
        } = this.state;

        return (
            <View
                title='Add Item'
                history={history}
                back
            >
                <Form>
                    <TextField
                        label='Name'
                        onChange={this.handleNameChange}
                    />
                    <TextField
                        margin
                        label='Description'
                        onChange={this.handleDescriptionChange}
                    />
                    <FormControl
                        error={priceNaN}
                        variant="outlined"
                        className={classes.margin}
                    >
                        <InputLabel
                            ref={ref => {
                                this.labelRef = ReactDOM.findDOMNode(ref);
                            }}
                            htmlFor="component-outlined"
                        >
                            Price
                        </InputLabel>
                        <OutlinedInput
                            onChange={this.handlePriceChange}
                            id="component-outlined"
                            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            placeholder='00.00'
                        />
                    </FormControl>
                    <Button
                        onClick={this.handleAdd}
                        margin
                    >
                        Add
                    </Button>
                </Form>
            </View>
        )
    }
}

export default withStyles(styles)(AddItem);
