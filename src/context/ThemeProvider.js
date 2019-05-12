import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export default class ThemeProvider extends Component {
    state = {}

    themes = {
        defaultLight: {
            palette: {
                type: 'light'
            }
        },
        defaultDark: {
            palette: {
                type: 'dark',
                background: {
                    paper: '#21222c',
                    default: '#1a1b23'
                },
                divider: '#282a36',
                primary: {
                    main: '#0080ff'
                }
            }
        }
    }

    constructor(props) {
        super(props);

        this.state.theme = createMuiTheme({
            ...this.themes.defaultDark
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={this.state.theme}>
                {this.props.children}
            </MuiThemeProvider>
        )
    }
}