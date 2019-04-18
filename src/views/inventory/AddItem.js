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
    componentDidMount() {
        this.forceUpdate();
    }

    render() {
        const {
            classes,
            history
        } = this.props;

        return (
            <View
                title='Add Item'
                history={history}
                back
            >
                <Form>
                    <TextField
                        label='Name'
                    />
                    <TextField
                        margin
                        label='Description'
                    />
                    <FormControl variant="outlined" className={classes.margin}>
                        <InputLabel
                            ref={ref => {
                                this.labelRef = ReactDOM.findDOMNode(ref);
                            }}
                            htmlFor="component-outlined"
                        >
                            Price
                        </InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                    <Button margin>Add</Button>
                </Form>
            </View>
        )
    }
}

export default withStyles(styles)(AddItem);