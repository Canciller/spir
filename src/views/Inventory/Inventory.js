import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withStorage } from '../../context';

import routes from '../../config/routes';

import DataTransformView from '../../components/DataTransformView';

const styles = theme => ({})

class Inventory extends Component {
    componentDidMount() {
        this.props.storage.refresh();
    }

    render() {
        const { storage } = this.props;

        return (
            <DataTransformView
                title='Inventory'

                editPath={routes.editItem.path}
                addPath={routes.addItem.path}

                deleteDialog={{
                    message: 'Are you sure you want to delete this item?'
                }}

                onRefresh={storage.refresh}

                data={storage.items()}
                dataCardProps={{
                    onClick: (e, value) => storage.cart.add(value),
                    onDelete: (e, value) => storage.delete(value),
                    format: {
                        name: {
                            variant: 'title'
                        },
                        price: {
                            variant: 'subheading',
                            gutterBottom: true,
                            label: 'Price',
                            transform: value => `$${value.toFixed(2)}`
                        },
                        description: {
                            variant: 'subtitle2',
                            defaultValue: 'No description',
                            align: 'justify'
                        },
                        category_code: {
                            variant: 'subtitle2',
                            label: 'Category',
                        },
                        quantity: {
                            variant: 'subtitle2',
                            label: 'Quantity'
                        },
                        _id: { visible: false },
                        __v: { visible: false }
                    }
                }}
            />
        )
    }
}

export default withStorage(withStyles(styles)(Inventory));
