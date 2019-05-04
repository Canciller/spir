import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

import Gutters from './Gutters';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({})

class SelectWrapper extends Component {
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
        const { onChange, target } = this.props;
        if(onChange) onChange(e, e.target.value, { target, error: false });

        this.fixLabelWidth();
    }

    validItems = () => {
        const { items } = this.props;

        return items !== undefined && items.length > 0;
    }

    createSelectItems = () => {
        const { items } = this.props;

        if(!this.validItems()) return;

        return items.map((item, i) => (
            <MenuItem
                key={i}
                value={i}
            >
                {item}
            </MenuItem>
        ))
    }

    componentDidMount() {
        this.fixLabelWidth();
    }

    render() {
        const {
            id, label,
            error, required, disabled,
            fullWidth,
            items, value,
            onChange,
            classes,
            gutters,
            ...other
        } = this.props;

        return (
            <Gutters
                fullWidth={fullWidth}
                {...gutters}
            >
                <FormControl
                    fullWidth={fullWidth}
                    variant='outlined'
                    error={error}
                    required={required}
                    classes={{ root: classes.root }}
                >
                    <InputLabel
                        ref={ref => { this.labelRef = ReactDOM.findDOMNode(ref); }}
                        htmlFor={id}
                    >
                        {label}
                    </InputLabel>
                    <Select
                        value={value || 0}
                        onChange={this.onChange}
                        disabled={!this.validItems() || disabled}
                        input={
                            <OutlinedInput
                                id={id}
                                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                            />
                        }
                        {...other}
                    >
                        {this.createSelectItems()}
                    </Select>
                </FormControl>
            </Gutters>
        )
    }
}

export default withStyles(styles)(SelectWrapper);
