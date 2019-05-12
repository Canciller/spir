import Home from '../views/Home';
import Inventory, { AddItem, EditItem } from '../views/Inventory';
import Staff, { AddStaff, EditStaff } from '../views/Staff';
import { EditCard, AddCard, Cards, Deposit } from '../views/Partners';
import { Reader, Language } from '../views/Settings';

import Test from '../views/Test';

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
        component: Cards
    },
    addCard: {
        path: '/partners/cards/add',
        component: AddCard
    },
    editCard: {
        path: '/partners/cards/edit',
        component: EditCard
    },
    deposit: {
        path: '/partners/deposit',
        component: Deposit
    },
    staff: {
        path: '/staff',
        component: Staff
    },
    editStaff: {
        path: '/staff/edit',
        component: EditStaff
    },
    addStaff: {
        path: '/staff/add',
        component: AddStaff
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
    },
    test: {
        path: '/testing',
        component: Test
    }
}

export default routes;
