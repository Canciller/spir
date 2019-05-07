import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../../context';
import routes from '../../config/routes';

import DatabaseView from '../../components/DatabaseView';
import Card from '../../components/Card';


//const ipcRenderer = window.require('electron').ipcRenderer;

const styles = theme => ({})

const cardStyles = theme => ({
    root: {
        margin: theme.spacing.unit / 2
    }

})

class CardWrapper extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Card
                classes={{
                    root: classes.root
                }}
                {...this.props}
            />
        )
    }
}

class Cards extends Component {
    render() {
        const { classes } = this.props;

        return (
            <DatabaseView
                title='Cards'
                collection='cards'
                dataComponent={withStyles(cardStyles)(CardWrapper)}

                addPath={routes.addCard.path}

                deleteDialog={{
                    message: 'Are you sure you want to delete this card?'
                }}
            />
        )
    }
}

export default withStyles(styles)(Cards);
