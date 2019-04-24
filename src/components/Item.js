import React, { Component, Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AlertDialog from './AlertDialog';

const styles = theme => ({
    container: {
        paddingRight: theme.spacing.unit,
        paddingTop: theme.spacing.unit
    },
    item: {
        boxShadow: 'none',
        border: '1px solid',
        borderColor: theme.palette.divider,
        width: 300
    },
    itemMedia: {
        objectFit: 'cover'
    },
    itemContent: {
        position: 'relative'
    },
    itemActions: {
        borderTop: '1px solid',
        borderColor: theme.palette.divider
    }
});

class Item extends Component {
    state = {
        deleteDialogOpen: false
    }

    onOpenDeleteDialog = () => {
        this.setState({ deleteDialogOpen: true });
    }

    onCloseDeleteDialog = () => {
        this.setState({ deleteDialogOpen: false });
    }

    handleDelete = () => {
        const { onDelete, index } = this.props;
        if(onDelete) onDelete(index);
    }

    handleEdit = () => {
        const { onEdit, index } = this.props;
        if(onEdit) onEdit(index);
    }

    handleClickItem = () => {
        const { onClick, index } = this.props;
        if(onClick) onClick(index);
    }

    render() {
        const {
            children,
            title,
            image,
            classes
        } = this.props;

        const {
            deleteDialogOpen
        } = this.state;

        return (
            <div className={classes.container}>
                <Card className={classes.item}>
                    <CardActionArea onClick={this.handleClickItem}>
                        {image &&
                            <CardMedia
                                component="img"
                                alt={title}
                                className={classes.itemMedia}
                                height='140'
                                image={image}
                                title={title}
                            />
                        }
                        <CardContent className={classes.itemContent}>
                            <Typography gutterBottom variant='title'>{title}</Typography>
                            {children}
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.itemActions}>
                        <Button
                            size='small' 
                            color='primary'
                            onClick={this.onOpenDeleteDialog}
                        >
                            <Translate id='delete' />
                        </Button>
                        <Button
                            size='small'
                            color='primary'
                            onClick={this.handleEdit}
                        >
                            <Translate id='edit' />
                        </Button>
                    </CardActions>
                </Card>
                <AlertDialog
                    title={<Translate id='delete' />}
                    open={deleteDialogOpen}
                    onClose={this.onCloseDeleteDialog}
                    onAgree={this.handleDelete}
                >
                    <Translate id='message.inventory.delete_dialog_content' />
                </AlertDialog>
            </div>
        )
    }
}

export default withStyles(styles)(Item);
