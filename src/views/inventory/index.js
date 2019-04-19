import React, { Component, Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Translate } from 'react-localize-redux';
import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import Grow from '@material-ui/core/Grow';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import View from '../../components/View';
import Card from '../../components/Card';

import routes from '../../constants/routes.json';

import AddItem from './AddItem';

import { withSpirApi } from '../../util';

const styles = theme => ({
    absolute: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    add: {
        marginLeft: theme.spacing.unit * 2
    }
})

class Inventory extends Component {
    state = {
        items: []
    }

    componentDidMount() {
        const { spirApi } = this.props;
        spirApi.inventory.get(items => {
            this.setState({ items });
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <View title={<Translate id='section.inventory' />}>
                { this.state.items.map((item, i) => {
                    let { name, description, price } = item;
                    if(!description || description === '') description = 'No Description';
                    return (
                        <Card key={item.id} title={name} description={description} />
                    )
                }) }
                <Grow in={true}>
                    <div className={classes.absolute}>
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                        <Link component={RouterLink} to={routes.ADDITEM}>
                            <Fab color='primary' className={classes.add}>
                                <AddIcon />
                            </Fab>
                        </Link>
                    </div>
                </Grow>
            </View>
        )
    }
}

export {
    AddItem
}

export default withStyles(styles)(withSpirApi(Inventory));
