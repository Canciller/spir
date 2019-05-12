import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

import Gutters from './Gutters';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({})

class TextFieldWrapper extends Component {
    state = {
        hasError: false
    }

    fixLabelWidth = () => {
        /*
        setTimeout(() => {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.labelRef).offsetWidth,
            });
        }, 10);
        */
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.labelRef).offsetWidth,
        });
    }

    onChange = e => {
        const {
            target,
            onChange,
            required,
            validate,
            valueType
        } = this.props;

        let value = e.target.value,
            hasError = false;

        if(value === '')
            hasError = required !== undefined;

        if(!hasError && validate instanceof Function) {
            let parsedValue = valueType ? valueType(value) : value;
            hasError = !validate(parsedValue);
            if(hasError === undefined) hasError = false;
        }

        this.setState({ value, hasError }, () => {
            if(onChange) onChange(e, value, {
                target, error: hasError, empty: value === ''
            });
        });

        this.fixLabelWidth();
    }

    componentDidMount() {
        this.fixLabelWidth();
    }

    render() {
        const {
            id, label, adorment,
            required, error, target,
            fullWidth,
            onChange,
            number,
            classes,
            gutters,
            validate,
            valueType,
            ...other
        } = this.props;

        const {
            hasError
        } = this.state;

        return (
            <Gutters
                fullWidth={fullWidth}
                {...gutters}
            >
                <FormControl
                    fullWidth={fullWidth}
                    variant='outlined'
                    error={hasError || error}
                    required={required}
                    classes={{ root: classes.root }}
                >
                    <InputLabel
                        ref={ref => { this.labelRef = ReactDOM.findDOMNode(ref); }}
                        htmlFor={id}
                    >
                        {label}
                    </InputLabel>
                    <OutlinedInput
                        id={id}
                        labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                        startAdornment={adorment ? <InputAdornment position='start'>{adorment}</InputAdornment> : ' '}
                        onChange={this.onChange}
                        {...other}
                    />
                </FormControl>
            </Gutters>
        )
    }
}

export default withStyles(styles)(TextFieldWrapper);
