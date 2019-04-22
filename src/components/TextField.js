import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import { gutters } from '../util';

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
    ...gutters.createGutterStyles(theme.spacing.unit * 2),
})

class TextFieldWrapper extends Component {
    state = {
        labelWidth: 0,
        hasError: false,
        value: ''
    }

    fixLabelWidth = () => {
        setTimeout(() => {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.labelRef).offsetWidth,
            });
        }, 10);
    }

    onChange = e => {
        const {
            target,
            onChange,
            required,
            number,
            defaultValue
        } = this.props;

        let value = e.target.value,
            hasError = false;

        if(value === '') {
            hasError = required;
            if(number) value = NaN;
            if(defaultValue) value = defaultValue;
        } else if (number) {
            value = parseFloat(value);
            hasError = Number.isNaN(value);

            if(!hasError) {
                if(number === '+') hasError = value <= 0;
                else if(number === '-') hasError = value >= 0;
            }
        }

        this.setState({ value, hasError }, () => {
            if(onChange) onChange(value, target, hasError);
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
            onChange,
            number,
            defaultValue,
            gutterVertical,
            gutterHorizontal,
            gutterTop,
            gutterBottom,
            gutterLeft,
            gutterRight,
            classes,
            ...other
        } = this.props;

        const {
            hasError
        } = this.state;

        return (
            <FormControl
                variant='outlined'
                error={hasError || error}
                required={required}
                className={
                    classNames(
                        classes.root,
                        gutterVertical && classes.gutterVertical,
                        gutterHorizontal && classes.gutterHorizontal,
                        gutterTop && classes.gutterTop,
                        gutterRight && classes.gutterRight,
                        gutterBottom && classes.gutterBottom,
                        gutterLeft && classes.gutterLeft,
                    )
                }
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
                    startAdornment={adorment && <InputAdornment position='start'>{adorment}</InputAdornment> || ' '}
                    onChange={this.onChange}
                    {...other}
                />
            </FormControl>
        )
    }
}

export default withStyles(styles)(TextFieldWrapper);