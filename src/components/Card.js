import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../context';

import Typography from '@material-ui/core/Typography';

const cardWidth = 350,
      cardHeight =  230;

const iconSize = 60;

const absolute = {
    position: 'absolute'
}

const styles = theme => {
    const spacing = theme.spacing.unit * 3;

    return {
        root: {
            position: 'relative',
            width: cardWidth,
            height: cardHeight,
            borderRadius: theme.shape.borderRadius,
            //boxShadow: theme.shadows[4],
            //color: theme.palette.common.white,
            display: 'flex',
            userSelect: 'none',
            border: '1px solid',
            borderColor: theme.palette.divider,
            background: theme.palette.background.paper
        },
        textSeparation: {
            letterSpacing: 2
        },
        center: {
            margin: 'auto'
        },
        topLeft: {
            ...absolute,
            top: spacing,
            left: spacing
        },
        bottomRight: {
            ...absolute,
            bottom: spacing,
            right: spacing
        },
        bottomLeft: {
            ...absolute,
            bottom: spacing,
            left: spacing
        },
        icon: {
            width: iconSize,
            height: iconSize
        }
    }
}

class Card extends Component {
    state = {}

    render() {
        let {
            data,
            classes,
        } = this.props;

        data = data || {};

        const {
            card,
            partner
        } = data;

        if(!card || !partner)
            return ( <Fragment /> )
        else
            return (
                <div className={classes.root}>
                    <div className={classes.center}>
                    </div>
                    <div className={classes.topLeft}>
                        <Typography
                            variant='title'
                            className={classes.textSeparation}
                        >
                            SPIR
                        </Typography>
                        <Typography
                            variant='subtitle1'
                            className={classes.textSeparation}
                        >
                            {`${partner.first_name} ${partner.last_name}`}
                        </Typography>
                        <Typography
                            variant='subtitle1'
                            className={classes.textSeparation}
                        >
                            {`$${card.balance.toFixed(2)}`}
                        </Typography>
                    </div>
                    <div className={classes.bottomLeft}>
                        <Typography
                            variant='title'
                            className={classes.textSeparation}
                        >
                            {['Platinum', 'Gold'][card.level]}
                        </Typography>
                    </div>
                    <div className={classes.bottomRight}>
                        <Typography
                            variant='title'
                            className={classes.textSeparation}
                        >
                            {card.tag}
                        </Typography>
                    </div>
                </div>
            )
    }
}

export default withSpir(withStyles(styles)(Card));
