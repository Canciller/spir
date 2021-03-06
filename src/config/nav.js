import routes from './routes';

import HomeIcon from '@material-ui/icons/ShoppingCart';
import InventoryIcon from '@material-ui/icons/Store';
import StaffIcon from '@material-ui/icons/AssignmentInd';

import PartnersIcon from '@material-ui/icons/Face';
import CardIcon from '@material-ui/icons/CreditCard';
import DepositIcon from '@material-ui/icons/LocalAtm';

import SettingsIcon from '@material-ui/icons/Settings';
import ReaderIcon from '@material-ui/icons/Nfc';
//import LanguageIcon from '@material-ui/icons/Translate';
import ConstantsIcon from '@material-ui/icons/BorderColor';
import ThemeIcon from '@material-ui/icons/InvertColors';


function getPath(key) {
    if(routes.hasOwnProperty(key)) return routes[key].path;
    return undefined
}

const nav = [
    {
        name: 'Checkout',
        icon: HomeIcon,
        path: getPath('home')
    },
    {
        name: 'Inventory',
        icon: InventoryIcon,
        path: getPath('inventory')
    },
    {
        name: 'Staff',
        icon: StaffIcon,
        path: getPath('staff')
    },
    {
        name: 'Payments',
        icon: DepositIcon,
        path: getPath('payments')
    },
    {
        name: 'Partners',
        icon: PartnersIcon,
        nav: [
            {
                name: 'Cards',
                icon: CardIcon,
                path: getPath('cards')
            },
            {
                name: 'Deposit',
                icon: DepositIcon,
                path: getPath('deposit')
            }
        ]
    },
    {
        name: 'Settings',
        icon: SettingsIcon,
        nav: [
            /*
            {
                name: 'Constants',
                icon: ConstantsIcon,
                path: getPath('test')
            },
            */
            {
                name: 'Reader',
                icon: ReaderIcon,
                path: getPath('reader')
            },
            /*
            {
                name: 'Language',
                icon: LanguageIcon,
                path: getPath('language')
            },
            */
            {
                name: 'Theme',
                icon: ThemeIcon,
                path: getPath('theme')
            }
        ]
    },
]

export default nav;
