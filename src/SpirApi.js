import React, { Component } from 'react';
import { withSnackbar } from 'notistack';
import { SpirApiContext } from './context';

const url = 'https://spir-development.herokuapp.com/api'; // Move this to a config file

async function fetchWrapper(url, method, extra = {}) {
    let { body, headers, ...other } = extra;

    if(body) body = JSON.stringify(body);
    if(!headers) headers = {};

    let res = await fetch(url, {
        method,
        body,
        headers: body ? {
            ...headers,
            'Content-Type': 'application/json',
        } : undefined,
        ...other
    });

    let data = await res.json();

    return data;
}

class SpirApi extends Component {
    onError = err => this.props.enqueueSnackbar(err.message, { variant: 'error' });

    onSuccess = (data, callback) => {
        if(callback) callback(data);
    }

    defaultApi = route => {
        const { enqueueSnackbar } = this.props;
        const snackbarError = { variant: 'error' };

        const u = `${url}/${route}`;

        return {
            get: callback => fetchWrapper(u, 'get')
            .then(data => this.onSuccess(data, callback))
            .catch(this.onError),

            getOne: (id, callback) => fetchWrapper(`${u}/${id}`, 'get')
            .then(data => this.onSuccess(data, callback))
            .catch(this.onError),

            add: (body, callback) => fetchWrapper(u, 'post', { body })
            .then(data => this.onSuccess(data, callback))
            .catch(this.onError),

            delete: (id, callback) => fetchWrapper(`${u}/${id}`, 'delete')
            .then(data => this.onSuccess(data, callback))
            .catch(this.onError),

            update: (id, body, callback) => fetchWrapper(`${u}/${id}`, 'put', { body })
            .then(data => this.onSuccess(data, callback))
            .catch(this.onError)
        }
    }

    render() {
        const { children } = this.props;

        return (
            <SpirApiContext.Provider value={{
                inventory: this.defaultApi('products'),
                categories: this.defaultApi('categories'),
                cards: this.defaultApi('cards'),
                partners: this.defaultApi('partners')
            }}>
                {children}
            </SpirApiContext.Provider>
        )
    }
}

export default withSnackbar(SpirApi);
