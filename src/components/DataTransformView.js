import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withHistory } from '../context';

import DataGridView from './DataGridView';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

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

    render() {
        let {
            classes,
            actions,
            dataCardProps,
            deleteIcon,
            addIcon,
            ...other
        } = this.props;

        actions = actions || [];

        dataCardProps = dataCardProps || {};
        const dataCardActions = dataCardProps.actions || [];

        const {
            onDelete,
            ...otherDataCardProps
        } = dataCardProps;

        return (
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
                            callback: onDelete,
                        },
                        {
                            name: 'Edit',
                            callback: this.onEdit
                        }
                    ])
                }}

                actions={actions.concat([
                    {
                        name: 'Delete',
                        icon: deleteIcon || DeleteIcon,
                    },
                    {
                        name: 'Add',
                        icon: addIcon || AddIcon,
                        main: true,
                        callback: this.onAdd
                    }
                ])}
            />
        )
    }
}

export default withHistory(withStyles(styles)(DataTransformView));
