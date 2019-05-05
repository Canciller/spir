import React, { Component } from 'react';

import StorageContext from './StorageContext';

export default class StorageProvider extends Component {
    state = {}

        /*
    set = (state, callback) => {
        this.setState(state, () => {
            if(callback instanceof Function)
                callback(state);
        })
    }

    setOne = (key, value, callback) => this.set({ [key]: value }, callback)

    get = key => {
        if(this.state.hasOwnProperty(key))
            return this.state[key];
        return undefined;
    }

    clear = (key, callback) => {
        if(this.state.hasOwnProperty(key))
            this.setOne(key, undefined, callback);
    }

    create = (key, type, callback) => {
        if(!(callback instanceof Function)) return;

        const current = this.get(key);
        if(current !== undefined) callback(current);
        else this.setOne(key, new type(), state => callback(state[key]));
    }
    */

    render() {
        return (
            <StorageContext.Provider
                value={{
                }}
            >
                {this.props.children}
            </StorageContext.Provider>
        )
    }
}
