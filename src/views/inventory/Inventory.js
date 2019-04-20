import React, { Component, Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Translate } from 'react-localize-redux';
import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import Grow from '@material-ui/core/Grow';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import View from '../../components/View';
import Item from '../../components/inventory/Item';
import ItemGrid from '../../components/inventory/ItemGrid';

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
    }
})

class Inventory extends Component {
    state = {
        items: [],
        categories: []
    }

    onDeleteItem = item => {
        const { items } = this.state;
        let itemsFiltered = items.filter(it => it._id !== item._id);
        this.setState({ items: itemsFiltered });
    }

    componentDidMount() {
        const { spirApi } = this.props;
        spirApi.inventory.get(items => {
            this.setState({ items });
        });
        spirApi.categories.get(categories => {
            this.setState({ categories });
        });
    }

    render() {
        const { classes } = this.props;
        const { categories } = this.state;

        return (
            <View back title={<Translate id='section.inventory' />}>
                <ItemGrid>
                    {this.state.items.map((item, i) => <Item categories={categories} onDelete={this.onDeleteItem} key={item._id} data={item} />)}
                </ItemGrid>
                <Grow in>
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
                </Grow>
            </View>
        )
    }
}

export default withStyles(styles)(withSpirApi(Inventory));