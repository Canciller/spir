import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import View from './View';
import LoadingView from './LoadingView';
import TextField from './TextField';
import Select from './Select';
import Button from './Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {},
    content: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: theme.spacing.unit / 2,
        paddingRight: theme.spacing.unit / 2,
        paddingBottom: theme.spacing.unit / 2
    },
    divider: {
        marginTop: theme.spacing.unit,
    }
})

class FormView extends Component {
    state = {}

    getFieldCurrentValue = target => {
        const state = this.state;
        if(state[target] !== undefined) {
            const value = state[target];
            if(value === '' && state[target + '_default'] !== undefined)
                return state[target + '_default'];
            return value;
        }
        else if(state[target + '_starting'] !== undefined)
            return state[target + '_starting'];
        else
            return '';
    }

    getFieldErrorFlag = target => {
        let error = this.state[target + '_error'];
        if(error === undefined) return false;
        return error;
    }

    createField = (target, props) => {
        let {
            value,
            valueOptions,
            visible,
            ...other
        } = props;

        visible = visible === undefined ? true : visible;

        if(!visible) return undefined;

        let currentValue = this.getFieldCurrentValue(target);
        let validate = undefined,
            valueType = undefined;

        if(valueOptions) {
            validate = valueOptions.validate;
            valueType =  valueOptions.type || String;
        }

        let control = undefined;

        switch(props.control) {
            case 'select':
                control = (
                    <Select
                        gutters={{
                            top: true
                        }}
                        {...other}
                        key={props.key || target}
                        onChange={this.onChange}
                        target={target}
                        value={currentValue}
                        fullWidth
                    />
                )
                break;
            case 'textfield':
                control = (
                    <TextField
                        gutters={{
                            top: true
                        }}
                        {...other}
                        key={props.key || target}
                        defaultValue={currentValue}
                        onChange={this.onChange}
                        target={target}
                        validate={validate}
                        valueType={valueType}
                        error={this.getFieldErrorFlag(target)}
                        fullWidth
                    />
                )
                break;
            default: control = undefined;
        }

        return control;
    }

    clearFormState = (fields, state = {}) => {
        fields = fields || this.props.fields;

        if(!fields) return state;

        for(const target in fields) {
            const props = fields[target];
            if(props.fields)
                state = this.clearFormState(props.fields, state);
            else {
                state[target] = undefined;
                state[target + '_error'] = false;
            }
        }

        return state;
    }

    onRefresh = () => {
        const state = this.clearFormState();
        this.setState(state, () => {
            this.loadForm(this.props);
            if(this.props.onRefresh instanceof Function)
                this.props.onRefresh();
        });
    }

    onChange = (e, data, extra) => {
        const { fields } = this.props;

        const {
            target,
            error,
            empty
        } = extra;

        this.setState({
            [target] : data,
            [target + '_error'] : error,
            [target + '_empty'] : empty
        }, () => {
            if(fields && fields[target])
            if(fields[target].onChange instanceof Function)
                fields[target].onChange(e, data, extra);
        });
    }

    constructObjectFromFields = (fields, data = {}) => {
        fields = fields || this.props.fields;

        if(!fields) return data;

        for(const target in fields) {
            const props = fields[target];
            if(props.fields) {
                data[target] = {}
                this.constructObjectFromFields(props.fields, data[target]);
            }
            else {
                const valueOptions = props.valueOptions || {};
                let currentValue = this.getFieldCurrentValue(target);
                if(currentValue === '' && valueOptions.default !== undefined)
                    currentValue = valueOptions.default;
                if(valueOptions.type !== undefined)
                    currentValue = valueOptions.type(currentValue);
                data[target] = currentValue;
            }
        }

        return data;
    }

    generateFormErrorState = (fields, state = {}) => {
        fields = fields || this.props.fields;

        if(!fields) return state;

        for(const target in fields) {
            const props = fields[target];
            if(props.fields) state = this.generateFormErrorState(props.fields, state);
            else {
                const valueOptions = props.valueOptions;
                let currentValue = this.getFieldCurrentValue(target),
                    error = false;

                if(props.required !== undefined && props.required === true)
                    error = currentValue === '';

                if(!error && valueOptions && valueOptions.validate instanceof Function) {
                    currentValue = valueOptions.type ? valueOptions.type(currentValue) : currentValue;
                    error = !valueOptions.validate(currentValue);
                    if(error === undefined) error = false;
                }

                state[target + '_error'] = error;
            }
        }

        return state;
    }

    formHasErrors = callback => {
        const errorsState = this.generateFormErrorState();
        this.setState(errorsState, () => {
            const errors = Object.values(errorsState);
            for(const e of errors) if(e === true) return callback(true);
            if(callback instanceof Function) callback(false);
        });
    }

    onAction = (e, callback) => {
        this.formHasErrors((err) => {
            if(!err && callback instanceof Function)
                callback(e, this.constructObjectFromFields());
        });
    }

    generateDefaultState = (target, props, valueOptions, state = {}) => {
        let startingValue = props.value;
        if(props.control === 'select') startingValue = startingValue || 0;

        if(state instanceof Object) {
            state[target + '_default'] = valueOptions.default;
            state[target + '_starting'] = startingValue;

            /*
            console.log(target + '_default = ', valueOptions.default);
            console.log(target + '_starting = ', startingValue);
            */
        }

        return state;
    }

    generateStartingState = (fields, state = {}) => {
        if(!fields) return;

        for(const target in fields) {
            let props = fields[target];
            if(props.fields)
                this.generateStartingState(props.fields, state);
            else {
                state = this.generateDefaultState(target, props, props.valueOptions || {}, state);
            }
        }

        return state;
    }

    createForm = (fields, form = []) => {
        fields = fields || this.props.fields;
        if(!fields) return form;

        for(const target in fields) {
            let props = fields[target];
            if(props.fields) {
                if(props.label)
                    form.push(
                        <Fragment
                            key={props.key || target}
                        >
                            <Typography
                                variant='subtitle1'
                                className={this.props.classes.divider}
                            >
                                {props.label}
                            </Typography>
                            <Divider />
                        </Fragment>
                    )
                this.createForm(props.fields, form);
            }
            else if(form instanceof Array) {
                let field = this.createField(target, props);
                if(field) form.push(field);
            }
        }

        return form;
    }

    createActions = () => {
        const { actions } = this.props;

        if(!actions) return undefined;

        const list = [];

        for(const name in actions) {
            const props = actions[name];

            list.push(
                <Button
                    {...props}
                    callback={undefined}
                    key={name || props.key}
                    gutters={{ top: true }}
                    fullWidth
                    onClick={e => this.onAction(e, props.callback)}
                >
                    {name}
                </Button>
            )
        }

        return list;
    }

    loadForm = props => {
        this.setState({ loaded: false }, () => {
            let state = this.generateStartingState(props.fields);
            this.setState({ ...state, loaded: true });
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props)
            this.loadForm(nextProps);
    }

    componentDidMount() {
        this.loadForm(this.props);
    }

    render() {
        const {
            children,
            actions,
            viewClasses,
            classes,
            ...other
        } = this.props;

        const { loaded } = this.state;

        if(!loaded)
            return (
                <LoadingView
                    loading={{
                        message: 'Creating form fields...'
                    }}
                />
            )
        else
            return (
                <View
                    {...other}
                    classes={{
                        content: classes.content,
                        ...viewClasses
                    }}
                    onRefresh={this.onRefresh}
                >
                    {this.createForm()}
                    {children}
                    {this.createActions()}
                </View>
            )
    }
}

export default withStyles(styles)(FormView);
