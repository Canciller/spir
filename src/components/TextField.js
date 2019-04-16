import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textfield: {
        margin: '15px 0 0 0',
    }
})

class TextFieldWrapper extends Component {
    render() {
        const {
            children,
            label,
            placeholder,
            value,
            onChange,
            defaultValue,
            classes
        } = this.props;

        return (
            <TextField
                onChange={onChange}
                className={classes.textfield}
                fullWidth
                label={label}
                defaultValue={defaultValue}
                value={value}
                placeholder={placeholder}
                margin='none'
                variant='outlined'
                InputLabelProps={{
                    shrink: true,
                }}
            />
        )
    }
}

export default withStyles(styles)(TextFieldWrapper);
