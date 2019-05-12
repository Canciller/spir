import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withStorage } from '../../context';

import routes from '../../config/routes';

import Typography from '@material-ui/core/Typography';
import DataTransformView from '../../components/DataTransformView';

const styles = theme => ({})

class Inventory extends Component {
    componentDidMount() {
        this.props.storage.refresh();
    }

    render() {
        const {
            classes,
            storage 
        } = this.props;

        return (
            <DataTransformView
                title='Inventory'

                editPath={routes.editItem.path}
                addPath={routes.addItem.path}

                deleteDialog={{
                    message: 'Are you sure you want to delete this item?'
                }}

                emptyViewProps={{
                    message: 'Nothing here.'
                }}

                onRefresh={storage.refresh}

                data={storage.items()}
                dataCardProps={{
                    absolute: value => {
                        return (
                            <Typography
                                variant='subtitle1'
                                color='primary'
                            >
                                {value.quantity}
                            </Typography>
                        )
                    },
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
                            align: 'justify',
                            transform: value => {
                                if(value.length === 0) return 'No description';
                                return value;
                            }
                        },
                        category_code: {
                            variant: 'subtitle2',
                            label: 'Category',
                            transform: value => storage.category(value)
                        },
                        quantity: { visible: false },
                        _id: { visible: false },
                        __v: { visible: false }
                    }
                }}
            />
        )
    }
}

export default withStorage(withStyles(styles)(Inventory));
