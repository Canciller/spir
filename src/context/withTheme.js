import React from 'react';
import { ThemeContext } from '../context';

export default function withTheme(Component) {
    return props => (
        <ThemeContext.Consumer>
            { themeHelpers => (
                <Component {...props} themeHelpers={themeHelpers} />
            ) }
        </ThemeContext.Consumer>
    )
}
