import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import Nav from './components/Nav';
import Header from './components/Header';

var remote = window.require('electron').remote; 

const drawerWidth = 240,
      controlIconSize = 20,
      controlSize = 24;

const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        boxShadow: 'none',
        userSelect: 'none',
        appRegion: 'drag',
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    menuButton: {
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit, appRegion: 'no-drag'
    },
    windowControls: {
        appRegion: 'no-drag',
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit
    },
    control: {
        height: controlSize,
        width: controlSize,
        padding: 0,
        marginLeft: 2
    },
    controlIcon: {
        height: controlIconSize,
        width: controlIconSize
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        display: 'flex',
        flexDirection: 'column'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0
    }
})

class Layout extends Component {
    state = {
        open: true
    }

    handleDrawerClose = () => {
        this.setState(state => ({ open: false }));
    }

    handleDrawerOpen = () => {
        this.setState(state => ({ open: true }));
    }

    render() {
        let { children, classes, theme } = this.props;
        let { open } = this.state;

        return (
            <div className={classes.root}>
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon size={10}/>
                        </IconButton>
                        <Header />
                    </Toolbar>
                    <div
                        className={classes.windowControls}
                    >
                    <IconButton
                        color='inherit'
                        className={classes.control}
                    >
                        <RemoveIcon
                            className={classes.controlIcon}
                        />
                    </IconButton>
                    <IconButton
                        color='inherit'
                        className={classes.control}
                    >
                        <AddIcon
                            className={classes.controlIcon}
                        />
                    </IconButton>
                    <IconButton
                        color='inherit'
                        className={classes.control}
                    >
                        <CloseIcon
                            className={classes.controlIcon}
                        />
                    </IconButton>
                    </div>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <Nav />
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {children}
                </main>
            </div>
        )
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout)
