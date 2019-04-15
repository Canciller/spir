import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import HomeIcon from '@material-ui/icons/ShoppingCart';
import InventoryIcon from '@material-ui/icons/Store';
import StaffIcon from '@material-ui/icons/AssignmentInd';

import PartnersIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';

import CardIcon from '@material-ui/icons/CreditCard';
import ReaderIcon from '@material-ui/icons/Nfc';
import LanguageIcon from '@material-ui/icons/Translate';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import routes from '../constants/routes.json';

let Item = ({ children, to, icon}) => {
    let Icon = icon;

    let content = (
        <ListItem button>
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText inset primary={children} />
        </ListItem>
    )

    if(to) content = (
        <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={to}>
            {content}
        </NavLink>
    )

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

class ItemCollapse extends Component {
    state = {
        open: false
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    }

    render() {
        const { children, icon, items } = this.props;
        const { open } = this.state;
        let Icon = icon;

        return (
            <Fragment>
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText inset primary={children} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        {items.map((item, i) => {
                            return (
                                <Item
                                    key={i}
                                    to={item.to}
                                    icon={item.icon}
                                >
                                    <Translate id={item.translation} />
                                </Item>
                            )
                        })}
                    </List>
                </Collapse>
            </Fragment>
        )
    }
}

export default class Nav extends Component {
    state = {
        items: [
            {
                to: routes.HOME,
                translation: 'section.checkout',
                icon: HomeIcon
            },
            {
                to: routes.INVENTORY,
                translation: 'section.inventory',
                icon: InventoryIcon
            },
            {
                to: routes.STAFF,
                translation: 'section.staff',
                icon: StaffIcon,
            },
            {
                translation: 'section.partners',
                icon: PartnersIcon,
                items: [
                    {
                        to: routes.CARDS,
                        translation: 'section.cards',
                        icon: CardIcon
                    }
                ]
            },
            {
                translation: 'section.settings',
                icon: SettingsIcon,
                items: [
                    {
                        to: routes.READERS,
                        translation: 'section.readers',
                        icon: ReaderIcon
                    },
                    {
                        to: routes.LANGUAGE,
                        translation: 'section.language',
                        icon: LanguageIcon
                    }
                ]
            }
        ]
    }

    render() {
        return (
            <List
                component='nav'
                disablePadding
            >
                {this.state.items.map((item, i) => {
                    let translation = <Translate id={item.translation} />;

                    if(item.items !== undefined)
                        return (
                            <ItemCollapse
                                key={i}
                                icon={item.icon}
                                items={item.items}
                            >
                                {translation}
                            </ItemCollapse>
                        )
                    else
                        return (
                            <Item
                                key={i}
                                to={item.to}
                                icon={item.icon}
                            >
                                {translation}
                            </Item>
                        )
                })}
            </List>
        )
    }
}
