import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import configRoutes from './config/routes';

import ErrorView from './components/ErrorView';

export default class Routes extends Component {
    createRoutes = () => {
        const values = Object.values(configRoutes).reverse();
        let routes = [];

        for(let i = 0; i < values.length; ++i) {
            const {
                path,
                component
            } = values[i];

            if(!path || !component) continue;

            routes.push(
                <Route
                    key={i}
                    path={path}
                    component={component}
                />
            )
        }

        return routes;
    }

    render() {
        const routes = this.createRoutes();

        if(!routes || routes.length === 0)
            return (
                <ErrorView
                    message='Routes are not configured.'
                />
            )
        else
            return (
                <Switch>
                    {routes}
                </Switch>
            )
    }
}
