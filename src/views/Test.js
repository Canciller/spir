import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import FormView from '../components/FormView';

const styles = theme => ({})

class Test extends Component {
    state = {}

    onSave = (e, data) => {
    }

    render() {
        return (
            <FormView
                title='Constants'
                fields={{
                    spir: {
                        label: 'SPIR Server',
                        fields: {
                            url: {
                                control: 'textfield',
                                label: 'URL'
                            }
                        }
                    }
                }}
                actions={{
                    save: {
                        callback: this.onSave
                    }
                }}
            />
        )
    }
}

export default withStyles(styles)(Test);
