import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './constants/routes.json';

import Home from './views/Home';
import Inventory from './views/Inventory';
import Staff from './views/Staff';
import { Cards } from './views/partners';
import { Reader, Language } from './views/settings';

export default () => (
    <Switch>
        <Route path={routes.READERS} component={Reader} />
        <Route path={routes.LANGUAGE} component={Language} />
        <Route path={routes.CARDS} component={Cards} />
        <Route path={routes.STAFF} component={Staff} />
        <Route path={routes.INVENTORY} component={Inventory} />
        <Route path={routes.HOME} component={Home} />
    </Switch>
)
