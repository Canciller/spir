import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../../context';

import DatabaseView from '../../components/DatabaseView';

//const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({})

class Cards extends Component {
    render() {
        const { classes } = this.props;

        return (
            <DatabaseView
                title='Cards'
                collection='cards'

                deleteDialog={{
                    message: 'Are you sure you want to delete this card?'
                }}

                dataFormat={{
                    tag: {
                        variant: 'title',
                        index: 0
                    },
                    balance: {
                        label: 'Balance',
                        variant: 'subheading',
                        gutterBottom: true,
                        format: '${}',
                        index: 1
                    },
                    partner: {
                        label: 'Partner',
                        variant: 'subheading',
                        gutterBottom: true,
                        index: 2
                    },
                    createdAt: {
                        label: 'Creation date',
                        variant: 'caption'
                    },
                    updatedAt: {
                        label: 'Latest update',
                        variant: 'caption'
                    },
                    _id: { visible: false },
                    __v: { visible: false }
                }}
            />
        )
    }
}

export default withSpir(withStyles(styles)(Cards));
