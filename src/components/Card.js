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
import './Card.css';

import Reptile from '../assets/images/contemplative-reptile.jpg';

const styles = theme => ({

})

class CardWrapper extends Component {
    render() {
        const {
            classes,
            description,
            title } = this.props;

        return (
            <div className='card-container'>
                <Card className='card'>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={title}
                            className='card-media'
                            height="140"
                            image={Reptile}
                            title={title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {title}
                            </Typography>
                            <Typography component="p">
                                {description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">Add to cart</Button>
                        <Button size="small" color="primary">Delete product</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(CardWrapper);