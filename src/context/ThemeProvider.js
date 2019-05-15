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
                    /*paper: '#21222c',
                    default: '#1a1b23'*/
                    paper: '#2f3136',
                    default: '#36393f'
                },
                /*divider: '#282a36',*/
                divider: '#40444b',
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
                        default: break;
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
