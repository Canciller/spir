import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir, withStorage } from '../context';

import routes from '../config/routes';

import DataView from '../components/DataView';

const styles = theme => ({})

class Checkout extends Component {
    state = {}

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <DataView
                title='Checkout'

                data={[]}
                dataFormat={{
                    name: {
                        variant: 'title',
                    },
                    price: {
                        variant: 'subtitle1',
                        gutterBottom: true,
                        label: 'Price',
                        format: '${}.00',
                    },
                    description: {
                        variant: 'caption',
                        defaultValue: 'No description',
                    },
                    category_code: {
                        variant: 'caption',
                        label: 'Category',
                        format: value => {
                            if(value == 1) return 'Service';
                            return 'Product';
                        }
                    },
                    quantity: {
                        variant: 'caption',
                        label: 'Quantity',
                    },
                    _id: { visible: false },
                    __v: { visible: false }
                }}
            />
        )
    }
}

export default withSpir(withStorage(withStyles(styles)(Checkout)));
