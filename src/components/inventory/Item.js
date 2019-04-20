import React, { Component, Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withSpirApi } from '../../util';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AlertDialog from '../AlertDialog';

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
    },
    badge: {
        top: 10,
        right: 0,
        position: 'absolute',
        color: theme.palette.primary.main,
        padding: '0 10px',
        cursor: 'pointer',
        userSelect: 'none'
    }
})

class Item extends Component {
    state = {
        deleteDialogOpen: false
    }

    getCategoryName = () => {
        const { categories, data } = this.props;

        let unknown = <Translate id='unknown' />
        if(!categories) return unknown;

        let category = categories[data.category_code];
        if(!category) return unknown;

        return <Translate id={category.name} />
    }

    onOpenDeleteDialog = () => {
        this.setState({ deleteDialogOpen: true });
    }

    onCloseDeleteDialog = () => {
        this.setState({ deleteDialogOpen: false });
    }

    handleDelete = () => {
        const { onDelete, spirApi, data } = this.props;
        spirApi.inventory.delete(data._id, deleted => {
            if(onDelete) onDelete(deleted);
        });
    }

    handleEdit = () => {
        const { onEdit, data } = this.props;
        if(onEdit) onEdit(data);
    }

    handleClickItem = () => {
        const { onClick, data } = this.props;
        if(onClick) onClick(data);
    }

    render() {
        const {
            classes,
            data
        } = this.props;

        const {
            deleteDialogOpen
        } = this.state;

        const {
            name,
            quantity,
            image
        } = data;

        let price = data.price.toFixed(2);
        let description = data.description === '' ? <Translate id='message.inventory.no_description' /> : data.description;

        return (
            <div className={classes.container}>
                <Card className={classes.item}>
                    <CardActionArea onClick={this.handleClickItem}>
                        {image &&
                            <CardMedia
                                component="img"
                                alt={name}
                                className={classes.itemMedia}
                                height='140'
                                image={image}
                                title={name}
                            />
                        }
                        <CardContent className={classes.itemContent}>
                            <Typography gutterBottom variant='title'>{name}</Typography>
                            <Typography gutterBottom variant='subtitle1'>${price}</Typography>
                            <Typography gutterBottom variant='caption'>{description}</Typography>
                            <Typography variant='caption'><Translate id='category' />{': '}{this.getCategoryName()}</Typography>
                            <div className={classes.badge}>
                                <Tooltip title={<Translate id='quantity'/>} placement='bottom'>
                                    <Typography color='inherit'>{quantity}</Typography>
                                </Tooltip>
                            </div>
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

export default withStyles(styles)(withSpirApi(Item));