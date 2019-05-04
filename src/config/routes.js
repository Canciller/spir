import Home from '../views/Home';
import Inventory, { AddItem, EditItem } from '../views/Inventory';
import Staff from '../views/Staff';
/*
import { Cards, Deposit } from '../views/Partners';
*/

import { Reader, Language } from '../views/Settings';

const routes = {
    home: {
        path: '/',
        component: Home
    },
    inventory: {
        path: '/inventory',
        component: Inventory
    },
    addItem: {
        path: '/inventory/add',
        component: AddItem
    },
    editItem: {
        path: '/inventory/edit',
        component: EditItem
    },
    partners: {
        path: '/partners',
        component: undefined
    },
    cards: {
        path: '/partners/cards',
        component: undefined
    },
    deposit: {
        path: '/partners/deposit',
        component: undefined
    },
    staff: {
        path: '/staff',
        component: Staff
    },
    settings: {
        path: '/settings',
        component: undefined
    },
    reader: {
        path: '/settings/reader',
        component: Reader
    },
    language: {
        path: '/settings/language',
        component: Language
    }
}

export default routes;
