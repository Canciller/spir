import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ThemeContext from './ThemeContext';
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
            ...this.themes.defaultLight
        });
    }

    render() {
        return (
            <ThemeContext.Provider value={{
                setThemeType: type => {
                    type = type.toLowerCase();
                    switch(type) {
                        case 'light':
                            this.setState({ theme: createMuiTheme({ ...this.themes.defaultLight }) })
                        break;
                        case 'dark':
                            this.setState({ theme: createMuiTheme({ ...this.themes.defaultDark }) })
                        break;
                    }
                }
            }}>
                <MuiThemeProvider theme={this.state.theme}>
                    {this.props.children}
                </MuiThemeProvider>
            </ThemeContext.Provider>
        )
    }
}