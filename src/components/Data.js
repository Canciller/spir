import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import AlertDialog from './AlertDialog';

const styles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
        paddingTop: theme.spacing.unit,
        flex: 1,
        minWidth: 300
    },
    card: {
        boxShadow: 'none',
        border: '1px solid',
        borderColor: theme.palette.divider,
    },
    cardMedia: {
        objectFit: 'cover'
    },
    cardContent: {
        position: 'relative'
    },
    cardActions: {
        borderTop: '1px solid',
        borderColor: theme.palette.divider
    }
});

class Data extends Component {
    state = {
        isDialogVisible: false
    }

    toggleDialog = () => {
        this.setState(state => ({ isDialogVisible: !state.isDialogVisible }));
    }

    onClickDelete = () => {
        this.toggleDialog();
    }

    onClickEdit = () => {
        const { onEdit, data } = this.props;
        if(onEdit) onEdit(data);
    }

    onClick = () => {
        const { onClick, data } = this.props;
        if(onClick) onClick(data);
    }

    onAcceptDelete = () => {
        const { onDelete, data } = this.props;
        if(onDelete) onDelete(data);
    }

    createCardContent = () => {
        const { data, format } = this.props;

        const keys = Object.keys(data);
        let content = Array(keys.length);

        for(const key of keys) {
            if(format && format.hasOwnProperty(key)) {
                const {
                    visible,
                    label,
                    defaultValue,
                    index,
                    format: valueFormat,
                    ...otherFormat
                } = format[key];

                if(visible === false) continue;

                let value = data[key];

                if(valueFormat !== undefined) {
                    if(valueFormat instanceof Function) value = valueFormat(value);
                    else value = valueFormat.replace('{}', value);
                }

                if((value === undefined || value === '') && defaultValue) value = defaultValue;

                let field = (
                    <Typography
                        key={key}
                        {...otherFormat}
                    >
                        {`${label ? label + ': ' : ''} ${value}`}
                    </Typography>
                )

                if(index === undefined) content.push(field);
                else content[index] = field;
            } else {
                content.push(
                    <Typography
                        key={key}
                    >
                        {data[key]}
                    </Typography>
                )
            }
        }

        return content;
    }

    render() {
        const {
            title,
            image,
            deleteDialog,
            classes
        } = this.props;

        const {
            isDialogVisible
        } = this.state;

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardActionArea onClick={this.onClick}>
                        {image &&
                            <CardMedia
                                component="img"
                                alt={title}
                                className={classes.cardMedia}
                                height='140'
                                image={image}
                                title={title}
                            />
                        }
                        <CardContent className={classes.cardContent}>
                            {this.createCardContent()}
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardActions}>
                        <Button
                            size='small' 
                            color='primary'
                            onClick={this.onClickDelete}
                        >
                            Delete
                        </Button>
                        <Button
                            size='small'
                            color='primary'
                            onClick={this.onClickEdit}
                        >
                            Edit
                        </Button>
                    </CardActions>
                </Card>
                <AlertDialog
                    title={deleteDialog.title || 'Delete'}
                    open={isDialogVisible}
                    onClose={this.toggleDialog}
                    actions={[
                        { name: 'Yes', callback: this.onAcceptDelete },
                        { name: 'No', autoFocus: true }
                    ]}
                >
                    {deleteDialog.message || 'Are you sure you want to delete this?'}
                </AlertDialog>
            </div>
        )
    }
}

export default withStyles(styles)(Data);
