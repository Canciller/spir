import React, { Component, Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Translate } from 'react-localize-redux';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import Grow from '@material-ui/core/Grow';
import Tooltip from '@material-ui/core/Tooltip';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import View from '../../components/View';
import Item from '../../components/Item';
import ItemGrid from '../../components/ItemGrid';

import routes from '../../constants/routes.json';

import { withSpirApi } from '../../util';

const styles = theme => ({
    absolute: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    addItem: {
        marginLeft: theme.spacing.unit * 2
    },
    deleteItems: {
        color: theme.palette.grey[600]
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

class Inventory extends Component {
    state = {
        items: [],
        categories: [],
    }

    onDeleteItem = index => {
        const { spirApi, enqueueSnackbar } = this.props;
        const { items } = this.state;

        let item = items[index];
        if(!item) return;

        spirApi.inventory.delete(item._id, updated => {
            let itemsFiltered = items.filter(it => it._id !== item._id);
            this.setState({ items: itemsFiltered });

            this.props.enqueueSnackbar(`${item.name} was deleted`, {
                variant: 'success'
            });
        });
    }

    getCategoryName = item => {
        const { categories } = this.state;

        let unknown = <Translate id='unknown' />
        if(!categories) return unknown;

        let category = categories[item.category_code];
        if(!category) return unknown;

        return <Translate id={category.name} />
    }

    setItems = items => this.setState({ items });

    setCategories = categories => this.setState({ categories });

    componentDidMount() {
        const { spirApi } = this.props;

        spirApi.inventory.get(items => this.setItems(items));

        spirApi.categories.get(categories => this.setCategories(categories));
    }

    render() {
        const { classes } = this.props;
        const { categories, items } = this.state;

        return (
            <View back title={<Translate id='section.inventory' />}>
                <ItemGrid>
                    {items.map((item, i) => {
                        const { quantity } = item;

                        let price = item.price.toFixed(2);
                        let description = item.description === '' ? <Translate id='message.inventory.no_description' /> : item.description;

                        return (
                            <Item 
                                key={i}
                                index={i}
                                title={item.name}
                                onDelete={this.onDeleteItem}
                            >
                                <Typography gutterBottom variant='subtitle1'>${price}</Typography>
                                <Typography gutterBottom variant='caption'>{description}</Typography>
                                <Typography variant='caption'><Translate id='category' />{': '}{this.getCategoryName(item)}</Typography>
                                <div className={classes.badge}>
                                    <Tooltip title={<Translate id='quantity'/>} placement='bottom'>
                                        <Typography color='inherit'>{quantity}</Typography>
                                    </Tooltip>
                                </div>
                            </Item>
                        );
                    })}
                </ItemGrid>
                <div className={classes.absolute}>
                    <Fab size='small' color='inherit' className={classes.deleteItems}>
                        <DeleteIcon />
                    </Fab>
                    <Link component={RouterLink} to={routes.ADDITEM}>
                        <Fab color='primary' className={classes.addItem}>
                            <AddIcon />
                        </Fab>
                    </Link>
                </div>
            </View>
        )
    }
}

export default withStyles(styles)(withSpirApi(withSnackbar(Inventory)));
