import React, { Component, Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Translate } from 'react-localize-redux';
import { withStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import View from '../../components/View';
import Card from '../../components/Card';

import routes from '../../constants/routes.json';

import AddItem from './AddItem';

const styles = theme => ({
    absolute: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    add: {
        marginLeft: theme.spacing.unit * 2
    }
})

class Inventory extends Component {
    render() {
        const { classes } = this.props;

        return (
            <View title={<Translate id='section.inventory' />}>
                <Card title='Title' description='Description' />
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
            </View>
        )
    }
}

export {
    AddItem
}

export default withStyles(styles)(Inventory);
