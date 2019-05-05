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
            collection,
            data
        } = this.props;

        if(data) return;

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
            collection,
            onDelete
        } = this.props;

        if(collection === undefined) return;

        const { data } = this.state;

        spir[collection].delete(value._id)
            .then(value => {
                if(this.props.data && onDelete instanceof Function)
                    onDelete(value)
                else
                    this.setState({ data: data.filter(it => it._id !== value._id) })
            })
            .catch(err => console.log(err));
    }

    onClick = data => {
        const { onClick } = this.props;

        if(onClick instanceof Function) onClick(data);
    }

    componentDidMount() {
        this._isMounted = true;

        if(!this.props.data) this.fetchData();
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
                data={data}
                onRefresh={this.fetchData}
                {...this.props}

                error={error}

                onDelete={this.onDelete}
                onClick={this.onClick}
            />
        )
    }
}

export default withSpir(withStyles(styles)(DatabaseView));
