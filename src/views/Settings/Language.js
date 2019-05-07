import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormView from '../../components/FormView';

const styles = theme => ({})

class Language extends Component {
    state = {}

    onChange = (e, { language }) => {
        console.log(language);
    }

    changeState = () => {
        this.setState({ value: 'VALUE' })
    }

    changeState2 = () => {
        this.setState({ value: undefined })
    }

    test = (e, value) => {
        console.log(value);
    }

    render() {
        return (
            <FormView
                title='Language'

                fields={{
                    language: {
                        control: 'select',
                        /*
                        items: [
                            { value: 4, name: 'English' },
                            { value: 3, name: 'Español' }
                        ],
                        */
                        onChange: this.onChange,
                        label: 'Language'
                    },
                    partner: {
                        label: 'Partner',
                        fields: {
                            name: {
                                control: 'textfield',
                                value: 'Not String',
                                valueOptions: {
                                    type: String,
                                    validate: value => value !== 'String',
                                    default: 'Not String'
                                },
                                placeholder: 'Not String',
                                label: 'Name',
                                disabled: false
                            },
                            lang: {
                                label: 'Lang',
                                control: 'select',
                                items: [
                                    'Level 1',
                                    'Level 2'
                                ]
                            },
                            email: {
                                control: 'textfield',
                                type: 'email',
                                label: 'Email'
                            },
                            password: {
                                control: 'textfield',
                                type: 'password',
                                value: 'Starting value',
                                label: 'Password'
                            },
                            required: {
                                control: 'textfield',
                                type: 'text',
                                value: 100,
                                required: true,
                                label: 'Required',
                                valueOptions: {
                                    type: Number,
                                    validate: value => {
                                        if(!Number.isNaN(value)) false;
                                        return value >= 0;
                                    }
                                }
                            }
                        }
                    }
                }}
                actions={{
                    add: {
                        callback: this.test
                    }
                }}
            />
        )
    }
}

export default withStyles(styles)(Language);
