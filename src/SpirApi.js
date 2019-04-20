import React, { Component } from 'react';
import { SpirApiContext } from './context';
import { SnackbarProvider, withSnackbar } from 'notistack';

const url = 'https://spir-development.herokuapp.com/api'; // Move this to a config file

function defaultApi(route, onAction) {
    return {
        add: (data, callback) => {
            data = JSON.stringify(data);
            fetch(`${url}/${route}`, {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(res => {
                    if(callback) callback(res);
                    onAction(`debug: called ${route}.add`);
                })
                .catch(err => console.log(err));
        },
        get: callback => {
            fetch(`${url}/${route}`)
                .then(res => res.json())
                .then(res => {
                    if(callback) callback(res);
                    onAction(`debug: called ${route}.get`);
                })
                .catch(err => console.log(err))
        },
        delete: (id, callback) => {
            fetch(`${url}/${route}/${id}`, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(res => {
                    if(callback) callback(res);
                    onAction(`debug: called ${route}.delete`);
                })
                .catch(err => console.log(err))
        },
        update: (id, data, callback) => {
            fetch(`${url}/${route}/${id}`, {
                method: 'put',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(res => {
                    if(callback) callback(res);
                    onAction(`debug: called ${route}.update`);
                })
                .catch(err => console.log(err))
        }
    }
}

class SpirApi extends Component {
    onAction = message => {
        this.props.enqueueSnackbar(message);
    }

    inventory = defaultApi('products', this.onAction);
    categories = defaultApi('categories', this.onAction);

    render() {
        const { children } = this.props;

        return (
            <SpirApiContext.Provider value={{
                inventory: this.inventory,
                categories: this.categories
            }}>
                {children}
            </SpirApiContext.Provider>
        )
    }
}

export default withSnackbar(SpirApi);
