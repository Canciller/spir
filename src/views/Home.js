import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import View from '../components/View';

const styles = theme => ({

})

class Home extends Component {
    render() {
        return (
            <View
                title='Checkout'
            >
            </View>
        )
    }
}

export default withStyles(styles)(Home);
