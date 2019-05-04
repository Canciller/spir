import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Loading from './Loading';
import Select from './Select';
import TextField from './TextField';
import Button from './Button';

const styles = theme => ({
    root: {}
})

const isFunction = func => func instanceof Function;

class Form extends Component {
    isFieldEmpty = target => {
        const empty = this.getState(`${target}_empty`);
        if(empty === undefined) return true;
        return empty;
    }

    getState = key => {
        if(!key || !this.state) return undefined;

        return this.state[key];
    }

    createSelectField = props => {
        const {
            key,
            target,
            value,
            ...other
        } = props;

        return (
            <Select
                key={key}
                gutters={{ top: true }}
                fullWidth
                {...other}
                error={this.getState(`${target}_error`)}
                value={this.getState(target)}
                target={target}
                onChange={this.onChange}
            />
        )
    }

    // Create TextField field
    createTextField = props => {
        const {
            key,
            target,
            value,
            ...other
        } = props;

        let currentValue = this.getState(target) || '';

        return (
            <TextField
                key={key}
                gutters={{ top: true }}
                fullWidth
                {...other}
                value={currentValue.toString()}
                error={this.getState(`${target}_error`)}
                target={target}
                onChange={this.onChange}
            />
        )
    }

    createTextField = props => {
        const {
            key,
            target,
            value,
            ...other
        } = props;

        let currentValue = this.getState(target) || '';

        return (
            <TextField
                key={key}
                gutters={{ top: true }}
                fullWidth
                {...other}
                value={currentValue.toString()}
                error={this.getState(`${target}_error`)}
                target={target}
                onChange={this.onChange}
            />
        )
    }

    createFields = () => {
        const { fields } = this.props;

        if(!fields) return undefined;

        return fields.map(
            (field, i) => {
                const { type } = field;
                field.key = i;

                switch(type) { // Create fields
                    case 'select': return this.createSelectField(field);
                    default: return this.createTextField(field);
                }
            }
        )
    }

    createActions = () => {
        const { actions } = this.props;

        if(!actions) return undefined;

        return actions.filter(
            action => action.name !== undefined
        ).map(
            (action, i) => {
                const {
                    name,
                    callback,
                    ...props
                } = action;

                return (
                    <Button
                        key={i}
                        gutters={{ top: true }}
                        fullWidth
                        {...props}
                        onClick={e => this.onAction(e, callback)}
                    >
                        {name}
                    </Button>
                )
            }
        )
    }

    formHasErrors = () => {
        const { fields } = this.props;

        let formError = false;

        for(const field of fields) {
            const {
                type,
                target,
                number,
                required,
                defaultValue
            } = field;

            let fieldError = false;

            const currentValue = this.getState(target);

            switch(type) {
                case 'select': break;
                default: { // textfield
                    if(currentValue === '') { // Is empty
                        this.setState({ [`${target}_error`]: required })
                        fieldError = required;
                    } else if(number) { // Is a number
                        const currentValueNumber = Number(currentValue);

                        if(Number.isNaN(currentValueNumber)) {
                            this.setState({ [`${target}_error`]: true })
                            fieldError = true;
                            break;
                        }

                        switch(number) { // Limit errors
                            case '+':
                                fieldError = currentValueNumber <= 0;
                                break;
                            case '-':
                                fieldError = currentValueNumber >= 0;
                                break;
                        }

                        this.setState({ [`${target}_error`]: fieldError })
                    }
                }
            }

            if(fieldError && !formError) formError = true;
        }

        return formError;
    }

    constructObjectFromFields = () => {
        const { fields } = this.props;

        if(fields.length === 0) return {}

        let data = {}
        for(const field of fields) {
            if(!field.target) continue;
            let value = this.getState(field.target);

            if(this.isFieldEmpty(field.target)) {
                value = value || field.defaultValue;

                switch(field.type) {
                    case 'select': {
                        if(value === undefined) value = 0;
                        break;
                    }
                    default: {
                        if(value === undefined) value = '';
                    }
                }
            }

            data[field.target] =
                field.number !== undefined ? Number(value) : value;
        }

        return data;
    }

    onAction = (e, callback) => {
        const errors = this.formHasErrors();
        if(errors || !isFunction(callback)) return;

        const data = this.constructObjectFromFields();

        callback(e, data);
    }

    onChange = (e, data, extra) => {
        const { onChange } = this.props;

        const {
            target,
            error,
            empty
        } = extra;

        this.setState({
            [target] : data,
            [`${target}_error`] : error,
            [`${target}_empty`] : empty
        }, () => {
            if(isFunction(onChange)) onChange(e, data, extra);
        });
    }

    setStateFromFields = () => {
        const { fields } = this.props;

        for(let field of fields) {
            let value = field.value;

            switch(field.type) {
                case 'select': {
                    if(value === undefined) value = 0;
                    break;
                }
                default: {
                    if(value === undefined) value = ''
                }
            }

            this.setState({
                [field.target]: value,
                [`${field.target}_error`] : false,
                [`${field.target}_empty`] : field.value !== undefined ? false : true
            })
        }
    }

    componentDidMount() {
        this.setStateFromFields();
    }

    render() {
        const {
            classes,
        } = this.props;

        const fields = this.createFields(),
              actions = this.createActions();

        if(!fields)
            return (
                <Loading
                    message='Loading form fields...'
                /> )
        else
            return (
                <div
                    className={classes.root}
                >
                    {fields}
                    {actions}
                </div>
            )
    }
}

Form.propTypes = {
    fields: PropTypes.array,
    actions: PropTypes.array
}

export default withStyles(styles)(Form);
