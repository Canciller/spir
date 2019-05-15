import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withHistory } from '../context';

import View from './View';
import DataCard from './DataCard';

const styles = theme => {
    return {
        root: {},
        content: {
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            marginTop: theme.spacing.unit
        },
        actions: {},
        deleteCheckbox: {},
        deleteAction: {
            color: theme.palette.grey[600]
        },
        addAction: {
            marginLeft: theme.spacing.unit * 2
        },
        headerActions: {},
        dataCard: {
            padding: theme.spacing.unit / 2
        }
    }
}

class DataGridView extends Component {
    state = {}

    createDataGrid = () => {
        let {
            data,
            dataCardProps,
            classes
        } = this.props;

        if(!(data instanceof Array)) return undefined;

        dataCardProps = dataCardProps || {}

        let grid = [];

        let key = 0;
        for(const value of data) {
            grid.push(
                <DataCard
                    key={key}
                    data={value}
                    {...dataCardProps}
                    classes={{
                        root: classes.dataCard
                    }}
                />
            )
            key += 1;
        }

        return grid;
    }

    load = props => {
        if(!(props instanceof Object)) return;

        const loading = props.data === undefined,
              empty = loading ? true : Object.keys(props.data).length === 0;

        this.setState({
            loading,
            empty
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props)
            this.load(nextProps);
    }

    componentDidMount() {
        this.load(this.props);
    }

    render() {
        const {
            data,
            format,
            classes,
            ...other
        } = this.props;

        const {
            loading,
            empty
        } = this.state;

        return (
            <View
                {...other}

                loading={loading}
                empty={empty}

                classes={{
                    root: classes.root,
                    content: classes.content,
                    headerActions: classes.headerActions,
                    actions: classes.actions
                }}
            >
                {this.createDataGrid()}
            </View>
        )
    }
}

export default withStyles(styles)(withHistory(DataGridView));
