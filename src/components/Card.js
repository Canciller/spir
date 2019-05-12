import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import classNames from 'classnames';
import { withSpir } from '../context';

import Typography from '@material-ui/core/Typography';
import CardIcon from '@material-ui/icons/Nfc';

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
            boxShadow: theme.shadows[4],
            color: theme.palette.common.white,
            display: 'flex',
            userSelect: 'none'
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

const CardStyled = styled.div`
    background: linear-gradient(135deg, rgba(171,171,171,1) 0%, rgba(107,107,107,1) 100%);
`

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
                <CardStyled className={classes.root}>
                    <div className={classes.center}>
                    </div>
                    <div className={classes.topLeft}>
                        <Typography
                            variant='title'
                            color='inherit'
                            className={classes.textSeparation}
                        >
                            SPIR
                        </Typography>
                        <Typography
                            variant='subtitle1'
                            color='inherit'
                            className={classes.textSeparation}
                        >
                            {`${partner.first_name} ${partner.last_name}`}
                        </Typography>
                        <Typography
                            variant='subtitle1'
                            color='inherit'
                            className={classes.textSeparation}
                        >
                            {`$${card.balance.toFixed(2)}`}
                        </Typography>
                    </div>
                    <div className={classes.bottomLeft}>
                    </div>
                    <div className={classes.bottomRight}>
                        <Typography
                            variant='title'
                            color='inherit'
                            className={classes.textSeparation}
                        >
                            {card.tag}
                        </Typography>
                    </div>
                </CardStyled>
            )
    }
}

export default withSpir(withStyles(styles)(Card));
