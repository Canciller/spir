import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir } from '../context';

import DataView from './DataView';

const styles = theme => ({})

class DatabaseView extends Component {
    state = {}

    fetchData = () => {
        const {
            spir,
            collection
        } = this.props;

        this.setState({
            data: undefined
        }, () => {
            if(collection === undefined) return;
            spir[collection].get()
                .then(data => this._isMounted && this.setState({ data }))
                .catch(err => console.log(err));
        });
    }

    onDelete = value => {
        const {
            spir,
            collection
        } = this.props;

        if(collection === undefined) return;

        const { data } = this.state;

        spir[collection].delete(value._id)
            .then(value => {
                this.setState({ data: data.filter(it => it._id !== value._id) })
                //Item deleted message
            })
            .catch(err => console.log(err));
    }

    onClick = data => {
        const { onClick } = this.props;

        if(onClick instanceof Function) onClick(data);
    }

    componentDidMount() {
        this._isMounted = true;

        this.fetchData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {
            data,
            error
        } = this.state;

        return (
            <DataView
                {...this.props}

                error={error}

                onDelete={this.onDelete}
                onRefresh={this.fetchData}
                onClick={this.onClick}

                data={data}
            />
        )
    }
}

export default withSpir(withStyles(styles)(DatabaseView));
