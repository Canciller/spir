import React, { Component } from 'react';
import SpirContext from './SpirContext';

import { spir } from '../constants';

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

export default class SpirProvider extends Component {
    onError = err => console.log(err);

    onSuccess = (data, callback) => {
        if(data.errors) this.onError(new Error('There was an error with the server'));
        else if(callback) callback(data);
    }

    defaultApi = route => {
        const url = `${spir.url}/${route}`;

        return {
            get: () => fetchWrapper(url, 'get')
            .then(data => {
                if(data.errors) throw new Error('There was an error with the SPIR server');
                else return data;
            }),

            getOne: id => fetchWrapper(`${url}/${id}`, 'get')
            .then(data => {
                if(data.errors) throw new Error('There was an error with the SPIR server');
                else return data;
            }),

            add: body => fetchWrapper(url, 'post', { body })
            .then(data => {
                if(data.errors) throw new Error('There was an error with the SPIR server');
                else return data;
            }),

            delete: id => fetchWrapper(`${url}/${id}`, 'delete')
            .then(data => {
                if(data.errors) throw new Error('There was an error with the SPIR server');
                else return data;
            }),

            update: (id, body) => fetchWrapper(`${url}/${id}`, 'put', { body })
            .then(data => {
                if(data.errors) throw new Error('There was an error with the SPIR server');
                else return data;
            }),
        }
    }

    render() {
        const { children } = this.props;

        return (
            <SpirContext.Provider value={{
                inventory: this.defaultApi('products'),
                categories: this.defaultApi('categories'),
                cards: this.defaultApi('cards'),
                partners: this.defaultApi('partners'),
                staff: this.defaultApi('staff')
            }}>
                {children}
            </SpirContext.Provider>
        )
    }
}
