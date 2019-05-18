import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSpir, withHistory } from '../context';
import { withSnackbar } from 'notistack';

import DataGridView from './DataGridView';

const styles = theme => ({})

class DatabaseGridView extends Component {
    state = {}

    fetchRecursive = (collection, id, current, as) => {
        let {
            pipeline,
            spir
        } = this.props;

        pipeline = pipeline || {};

        return spir[collection].getOne(id)
            .then(found => {
                const next = pipeline[collection];

                if(as) current[as] = found;
                else current[collection] = found;

                if( next === undefined ||
                    next.collection === undefined ||
                    next.pass === undefined )
                        return current;

                if(found[next.pass] === undefined)
                    return current;

                return this.fetchRecursive(next.collection, found[next.pass], current, next.as);
            });
    }

    fetchData = () => {
        let {
            collection, as,
            pipeline,
            spir,
            reverse
        } = this.props;

        if(!(pipeline instanceof Object))
            pipeline = {};

        let fetchAll = [];

        this.setState({
            data: undefined,
            error: false
        }, () => {
            if(collection === undefined)
                return this.setState({ data: [] });

            spir[collection].get()
                .then(all => {
                    const next = pipeline[collection];

                    if( next === undefined ||
                        next.collection === undefined ||
                        next.pass === undefined )
                            return this.setData(all);

                    for(let e of all) {
                        if(e[next.pass] === undefined) {
                            fetchAll.push(as !== undefined ? { [as]:e } : e)
                            continue;
                        }

                        let current = e;
                        if(as !== undefined) current = { [as]: e };

                        fetchAll.push(new Promise((resolve, reject) => {
                            return this.fetchRecursive(next.collection, e[next.pass], current, next.as)
                                .then(resolve)
                                .catch(reject)
                        }));
                    }

                    Promise.all(fetchAll)
                        .then(data => {
                            if(this._isMounted) this.setData(reverse ? data.reverse() : data);
                        })
                        .catch(this.onError);
                })
                .catch(this.onError);
        });
    }

    createMessage = (key, data) => {
        let { messages } = this.props;
        messages = messages || {};

        const message = messages[key];

        if(message === undefined) return null;

        if(message instanceof Function)
            return message(data || {});

        if(typeof message === 'string')
            return message;

        return null;
    }

    setData = data => {
        this.setState({ data }, () => {
            let message = this.createMessage('fetch', data);
            if(message) this.onSuccess(message);
        });
    }

    onSuccess = message => {
        const { enqueueSnackbar } = this.props;

        enqueueSnackbar(message, { 
            variant: 'success'
        });
    }

    onError = err => {
        const { enqueueSnackbar } = this.props;

        this.setState({
            error: true,
            errorMessage: err.message
        }, () => {
            enqueueSnackbar(err.message, {
                variant: 'error'
            });
        })
    }

    onDelete = (e, value) => {
        let {
            spir,
            collection, as,
            pipeline,
            enqueueSnackbar
        } = this.props;

        if(collection === undefined) return;
        let currentValue = value;
        if(as) currentValue = value[as];
        pipeline = pipeline || {};

        const { data } = this.state;

        spir[collection].delete(currentValue._id)
            .then(deleted => {
                let deleteCalls = [];

                let next = pipeline[collection],
                    nextValue = currentValue;
                while(next) {
                    let coll = next.collection;
                    if(!coll || !next.pass) break;

                    const as = next.as || coll;
                    if(nextValue[next.pass]) deleteCalls.push(spir[coll].delete(nextValue[next.pass]))
                    nextValue = value[as];
                    next = pipeline[coll];
                }

                Promise.all(deleteCalls)
                    .then(() => {
                        if(this._isMounted) this.setState({ data: data.filter(it => {
                            if(as) it = it[as];
                            return it._id !== deleted._id;
                        }) }, () => {
                            let message = this.createMessage('delete', currentValue);
                            if(message) this.onSuccess(message);
                        });
                    })
                    .catch(err => enqueueSnackbar(err.message, { variant: 'error' }));

            })
            .catch(err => enqueueSnackbar(err.message, { variant: 'error' }));
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
            error,
            errorMessage
        } = this.state;

        let {
            dataCardProps,
            ...other
        } = this.props;

        dataCardProps = dataCardProps || {}

        return (
            <DataGridView
                data={data}
                error={error}
                onRefresh={this.fetchData}

                errorViewProps={{
                    message: errorMessage
                }}

                {...other}

                dataCardProps={{
                    ...dataCardProps
                }}
            />
        )
    }
}

export default withSnackbar(withSpir(withHistory(withStyles(styles)(DatabaseGridView))));

