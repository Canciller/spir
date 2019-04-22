import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Translate } from 'react-localize-redux';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import { gutters } from '../util';

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    ...gutters.createGutterStyles(theme.spacing.unit * 2),
})

class SelectWrapper extends Component {
    state = {
        labelWidth: 0
    }

    createItems = () => {
        const { items, translateItems } = this.props;

        if(!items) return <MenuItem value={-1}>No Selection</MenuItem>
        return items.map((item, i) =>
            <MenuItem
                key={i}
                value={item.value}
            >
                {translateItems && <Translate id={item.name} /> || item.name}
            </MenuItem>
        )
    }

    fixLabelWidth = () => {
        setTimeout(() => {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.labelRef).offsetWidth,
            });
        }, 10);
    }

    onChange = e => {
        const { onChange } = this.props;
        if(onChange) onChange(e);
        this.fixLabelWidth();
    }

    componentDidMount() {
        this.fixLabelWidth();
    }

    render() {
        const {
            id, label,
            error, required,
            items, translateItems,
            onChange,
            gutterVertical,
            gutterHorizontal,
            gutterTop,
            gutterBottom,
            gutterLeft,
            gutterRight,
            classes,
            ...other
        } = this.props;

        return (
            <FormControl
                variant='outlined'
                error={error}
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
                <Select
                    onChange={this.onChange}
                    input={
                        <OutlinedInput
                            id={id}
                            labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                        />
                    }
                    {...other}
                >
                    { this.createItems() }
                </Select>
            </FormControl>
        )
    }
}

export default withStyles(styles)(SelectWrapper);