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
        root: {},
        content: {
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            marginTop: theme.spacing.unit
        },
        actions: {},
        deleteCheckbox: {

        },
        deleteAction: {
            color: theme.palette.grey[600]
        },
        addAction: {
            marginLeft: theme.spacing.unit * 2
        },
        headerActions: {}
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
            dataComponent,
            deleteDialog
        } = this.props;

        if(!data) return undefined;

        let DataComponent = Data;
        if(dataComponent) DataComponent = dataComponent;

        return data.map((el, i) =>
            <DataComponent
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
            dataComponent,
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
            message = emptyMessage || 'Nothing here.',
            children = undefined;

        if(!dataGrid) {
            V = LoadingView;
            message = loadingMessage;
        }
        else if(!this.isDataEmpty()) {
            children = this.props.children;
            V = View;
        }
        return (
            <V
                title={title}
                actions={actions}
                message={message}
                {...other}
                classes={{
                    root: classes.root,
                    content: classes.content,
                    actions: classes.actions,
                    headerActions: classes.headerActions
                }}
            >
                {children}
                {dataGrid}
            </V>
        )
    }
}

export default withStyles(styles)(withHistory(DataView));
