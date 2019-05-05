import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withHistory } from '../context';

import ErrorView from './ErrorView';
import LoadingView from './LoadingView';
import View from './View';
import Data from './Data';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => {
    return {
        content: {
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start'
        },
        deleteCheckbox: {

        },
        deleteAction: {
            color: theme.palette.grey[600]
        },
        addAction: {
            marginLeft: theme.spacing.unit * 2
        }
    }
}

class DataView extends Component {
    state = {}

    isDataEmpty = () => {
        const { data } = this.props;

        return data === undefined || data.length === 0;
    }

    toggleDeleteMode = () => {
        this.setState(state => ({ deleteMode: !Boolean(state.deleteMode) }));
    }

    onEdit = data => {
        const {
            history,
            editPath
        } = this.props;

        if(editPath) history.push(editPath, { data });
    }

    onAdd = () => {
        const {
            history,
            addPath
        } = this.props;

        if(addPath) history.push(addPath);
    }

    onDelete = data => {
        const { onDelete } = this.props;

        if(onDelete instanceof Function) onDelete(data);
    }

    onClick = data => {
        const { onClick } = this.props;

        if(onClick instanceof Function) onClick(data);
    }

    createDataGrid = () => {
        const {
            data, dataFormat,
            deleteDialog
        } = this.props;

        if(!data) return undefined;

        return data.map((el, i) =>
            <Data
                key={i}
                data={el}
                format={dataFormat}
                onClick={this.onClick}
                onDelete={this.onDelete}
                onEdit={this.onEdit}
                deleteDialog={deleteDialog}
            />
        )
    }

    render() {
        const {
            title,
            data,
            dataFormat,
            onClick,
            onDelete,
            onEdit,
            onAdd,
            loadingMessage,
            emptyMessage,
            classes,
            ...other
        } = this.props;

        const dataGrid = this.createDataGrid();

        let actions = [
            {
                name: 'Delete',
                icon: DeleteIcon,
                callback: this.toggleDeleteMode
            },
            {
                name: 'Add',
                icon: AddIcon,
                callback: this.onAdd,
                main: true
            }
        ]

        let V = ErrorView,
            message = emptyMessage || 'Nothing here.'

        if(!dataGrid) {
            V = LoadingView;
            message = loadingMessage;
        }
        else if(!this.isDataEmpty()) V = View;

        return (
            <V
                title={title}
                actions={actions}
                message={message}
                {...other}
                classes={{ content: classes.content }}
            >
                {dataGrid}
            </V>
        )
    }
}

export default withStyles(styles)(withHistory(DataView));
