import React, { Component } from 'react';
import { SpirApiContext } from './context';

const url = 'https://spir-development.herokuapp.com/api'; // Move this to a config file

function defaultApi(route) {
    return {
        add: (data, callback) => {
            if(!callback) return;

            data = JSON.stringify(data);
            return fetch(`${url}/${route}`, {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(res => callback(null, res))
                .catch(err => callback(err, null));
        },
        get: callback => {
            if(!callback) return;

            return fetch(`${url}/${route}`)
                .then(res => res.json())
                .then(res => callback(null, res))
                .catch(err => callback(err, null));
        },
        getOne: (id, callback) => {
            if(!callback) return;
            
            return fetch(`${url}/${route}/${id}`)
                .then(res => res.json())
                .then(res => callback(null, res))
                .catch(err => callback(err, null));
        },
        delete: (id, callback) => {
            if(!callback) return;

            return fetch(`${url}/${route}/${id}`, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(res => callback(null, res))
                .catch(err => callback(err, null));
        },
        update: (id, data, callback) => {
            data = JSON.stringify(data);

            return fetch(`${url}/${route}/${id}`, {
                method: 'put',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(res => callback(null, res))
                .catch(err => callback(err, null));
        }
    }
}

class SpirApi extends Component {
    inventory = defaultApi('products');
    categories = defaultApi('categories');
    cards = defaultApi('cards');
    partners = defaultApi('partners');

    render() {
        const { children } = this.props;

        return (
            <SpirApiContext.Provider value={{
                inventory: this.inventory,
                categories: this.categories,
                cards: this.cards,
                partners: this.partners
            }}>
                {children}
            </SpirApiContext.Provider>
        )
    }
}

export default SpirApi;
