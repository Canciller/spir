import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    select: {
        margin: '15px 0 0 0',
    }
})

class SelectWrapper extends Component {
    state = {
        labelWidth: 0
    }

    componentDidMount() {
        this.fixedLabelWidth();
    }

    fixedLabelWidth = () => {
        setTimeout(() => {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
            });
        }, 10);
    }

    onChange = e => {
        this.props.onChange(e);
        this.fixedLabelWidth();
    }

    render() {
        const {
            id,
            label,
            value,
            items,
            classes } = this.props;

        const { labelWidth } = this.state;

        return (
            <FormControl 
                variant="outlined"
                className={classes.select}
            >
                <InputLabel
                    ref={ref => { this.InputLabelRef = ref; }}
                    htmlFor={id}
                >
                    {label}
                </InputLabel>
                <Select
                    value={value}
                    onChange={this.onChange}
                    input={
                        <OutlinedInput
                            labelWidth={labelWidth}
                            id={id}
                        />
                    }
                >
                    { items && items.map((item, i) => {
                        return (
                            <MenuItem
                                key={i}
                                value={item.value}
                            >
                                {item.name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        )
    }
}

export default withStyles(styles)(SelectWrapper);
