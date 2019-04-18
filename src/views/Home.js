import React, { Component, Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import Typography from '@material-ui/core/Typography';
import View from '../components/View';

export default class Home extends Component {
    render() {
        return (
            <View title={<Translate id='section.checkout' />}>
            </View>
        )
    }
}
