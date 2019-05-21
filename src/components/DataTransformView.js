import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withHistory } from '../context';

import DataGridView from './DataGridView';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from './AlertDialog';

const styles = theme => ({
    root: {},
    content: {},
    actions: {}
})

class DataTransformView extends Component {
    state = {}

    onAdd = e => {
        const {
            history,
            addPath,
            onAdd
        } = this.props;

        if(addPath !== undefined) history.push(addPath);
        else if(onAdd instanceof Function) onAdd(e);
    }

    onEdit = (e, value) => {
        const {
            editPath,
            onEdit,
            history
        } = this.props;

        if(editPath !== undefined)
            history.push({
                pathname: editPath,
                state: { data: value }
            });
        else if(onEdit instanceof Function)
            onEdit(e, value);
    }

    onDelete = (e, value, callback) => {
        if(callback instanceof Function)
            callback(e, value);
    }

    onDialogClose = () => this.setState({ dialogOpen: false })

    render() {
        let {
            classes,
            actions,
            dataCardProps,
            deleteDialog,
            deleteIcon,
            addIcon,
            ...other
        } = this.props;

        actions = actions || [];
        deleteDialog = deleteDialog || {};

        dataCardProps = dataCardProps || {};
        const dataCardActions = dataCardProps.actions || [];

        const {
            onDelete,
            ...otherDataCardProps
        } = dataCardProps;

        return (
            <Fragment>
                <DataGridView
                    {...other}

                    classes={{
                        root: classes.root,
                        content: classes.content,
                        actions: classes.actions
                    }}

                    dataCardProps={{
                        ...otherDataCardProps,
                        actions: dataCardActions.concat([
                            {
                                name: 'Delete',
                                callback: (e, value) => this.setState({ currentValue: value, dialogOpen: true })
                            },
                            {
                                name: 'Edit',
                                callback: this.onEdit
                            }
                        ])
                    }}

                    actions={actions.concat([
                        /*
                        {
                            name: 'Delete',
                            icon: deleteIcon || DeleteIcon,
                        },
                        */
                        {
                            name: 'Add',
                            icon: addIcon || AddIcon,
                            main: true,
                            callback: this.onAdd
                        }
                    ])}
                >
                </DataGridView>
                <AlertDialog
                    open={this.state.dialogOpen}
                    onClose={this.onDialogClose}
                    title={deleteDialog.title || 'Delete'}
                    actions={[
                        {
                            name: 'Yes',
                            callback: e => this.onDelete(e, this.state.currentValue, onDelete)
                        },
                        {
                            name: 'No',
                            autoFocus: true
                        }
                    ]}
                >
                    {deleteDialog.message || 'Are you sure you want to delete this?'}
                </AlertDialog>
            </Fragment>
        )
    }
}

export default withHistory(withStyles(styles)(DataTransformView));
