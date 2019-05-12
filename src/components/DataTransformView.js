import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withHistory } from '../context';

import DataGridView from './DataGridView';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({})

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

    render() {
        let {
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
            onEdit,
            ...otherDataCardProps
        } = dataCardProps;

        return (
            <DataGridView
                {...other}

                dataCardProps={{
                    ...otherDataCardProps,
                    actions: dataCardActions.concat([
                        {
                            name: 'Delete',
                            callback: onDelete,
                        },
                        {
                            name: 'Edit',
                            callback: onEdit
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
