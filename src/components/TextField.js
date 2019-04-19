import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({})

class TextFieldWrapper extends Component {
    state = {
        labelWidth: 0
    }

    fixedLabelWidth = () => {
        setTimeout(() => {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.labelRef).offsetWidth,
            });
        }, 10);
    }

    componentDidMount() {
        this.fixedLabelWidth();
    }

    render() {
        const {
            children,
            label,
            placeholder,
            value,
            onChange,
            defaultValue,
            error,
            required,
            adorment,
            id,
            classes
        } = this.props;

        return (
            <FormControl
                fullWidth
                required={required}
                error={error}
                variant='outlined'
                margin='normal'
            >
                <InputLabel
                    ref={ref => {
                        this.labelRef = ReactDOM.findDOMNode(ref);
                    }}
                    htmlFor={id}
                >
                    {label}
                </InputLabel>
                <OutlinedInput
                    onChange={onChange}
                    id={id}
                    labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                    startAdornment={adorment && <InputAdornment position="start">{adorment}</InputAdornment> || ' '}
                    placeholder={placeholder}
                    value={value}
                    defaultValue={defaultValue}
                />
            </FormControl>
        )
    }
}

export default withStyles(styles)(TextFieldWrapper);
