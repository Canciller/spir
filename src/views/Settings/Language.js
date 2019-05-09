import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormView from '../../components/FormView';

const styles = theme => ({})

class Language extends Component {
    state = {}

    onChange = (e, { language }) => {
        console.log(language);
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
                            { value: 0, name: 'English' },
                            { value: 1, name: 'Español' }
                        ],
                        */
                        onChange: this.onChange,
                        label: 'Language'
                    }
                }}
            />
        )
    }
}

export default withStyles(styles)(Language);
