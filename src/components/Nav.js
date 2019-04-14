import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import HomeIcon from '@material-ui/icons/ShoppingCart';
import StoreIcon from '@material-ui/icons/Store';
import FaceIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';
import StaffIcon from '@material-ui/icons/AssignmentInd';
import CardIcon from '@material-ui/icons/CreditCard';
import NfcIcon from '@material-ui/icons/Nfc';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import routes from '../constants/routes.json';

let NavItem = ({ children, primary, to, icon, onClick }) => {
    let Icon = icon;

    let content = (
        <ListItem button onClick={onClick}>
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText inset primary={primary} />
            {children}
        </ListItem>
    )

    if(to) content = (
        <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={to}>
            {content}
        </NavLink>
    )

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    )
}

let NavItemExpand = ({ expand, primary, icon, onClick }) => (
    <NavItem
        primary={primary}
        icon={icon}
        onClick={onClick}
    >
        {expand ? <ExpandLess /> : <ExpandMore />}
    </NavItem>
)

export default class Nav extends Component {
    state = {
        openSettings: false,
        openPartners: false
    }

    handleClickPartners = () => {
        this.setState(state => ({ openPartners: !state.openPartners }));
    }

    handleClickSettings = () => {
        this.setState(state => ({ openSettings: !state.openSettings }));
    }

    render() {

        return (
            <List
                component='nav'
                disablePadding
            >
                <NavItem
                    primary='Payout'
                    to={routes.HOME} 
                    icon={HomeIcon} />
                <NavItem
                    primary='Inventory'
                    to={routes.INVENTORY}
                    icon={StoreIcon} />
                <NavItem
                    primary='Staff'
                    to={routes.STAFF}
                    icon={StaffIcon} />
                <NavItemExpand
                    expand={this.state.openPartners}
                    primary='Partners'
                    icon={FaceIcon}
                    onClick={this.handleClickPartners} />
                <Collapse in={this.state.openPartners} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        <NavItem
                            primary='Cards'
                            to={routes.CARDS}
                            icon={CardIcon} />
                    </List>
                </Collapse>
                <NavItemExpand
                    expand={this.state.openSettings}
                    primary='Settings'
                    icon={SettingsIcon}
                    onClick={this.handleClickSettings} />
                <Collapse in={this.state.openSettings} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        <NavItem primary='Reader' to={routes.READERS} icon={NfcIcon} />
                    </List>
                </Collapse>
            </List>
        )
    }
}
