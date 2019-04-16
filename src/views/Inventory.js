import React, { Component, Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Reptile from '../assets/images/contemplative-reptile.jpg';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        objectFit: 'cover',
    },
    content: {
        paddingTop: 15
    }
};

class Inventory extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Typography variant='title'>
                    <Translate id='section.inventory' />
                </Typography>
                <div className={classes.content}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                className={classes.media}
                                height="140"
                                image={Reptile}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Lizard
                                </Typography>
                                <Typography component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            </Fragment>
        )
    }
}

export default withStyles(styles)(Inventory);
