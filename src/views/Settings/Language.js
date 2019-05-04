import React, { Component, Fragment } from 'react';
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
                fields={[
                    {
                        type: 'select',
                        label: 'Language',
                        target: 'language',
                        items: [
                            'English',
                            'Español'
                        ],
                        onChange: this.onChange
                    }
                ]}
            />
        )
    }
}

export default withStyles(styles)(Language);
