import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withStorage } from '../../context';

import routes from '../../config/routes';

import DatabaseView from '../../components/DatabaseView';

const styles = theme => ({})

class Inventory extends Component {
    render() {
        return (
            <DatabaseView
                title='Inventory'
                collection='inventory'

                editPath={routes.editItem.path}
                addPath={routes.addItem.path}

                deleteDialog={{
                    message: 'Are you sure you want to delete this item?'
                }}

                dataFormat={{
                    name: {
                        variant: 'title',
                        index: 0
                    },
                    price: {
                        variant: 'subheading',
                        gutterBottom: true,
                        label: 'Price',
                        format: '${}.00',
                        index: 1
                    },
                    description: {
                        variant: 'subtitle2',
                        defaultValue: 'No description',
                        align: 'justify',
                        gutterBottom: true,
                        index: 2
                    },
                    category_code: {
                        variant: 'caption',
                        label: 'Category',
                        format: value => {
                            if(value === 1) return 'Service';
                            return 'Product';
                        },
                        index: 3
                    },
                    quantity: {
                        variant: 'caption',
                        label: 'Quantity',
                        index: 4
                    },
                    _id: { visible: false },
                    __v: { visible: false }
                }}
            />
        )
    }
}

export default withStorage(withStyles(styles)(Inventory));
