import React from 'react';
import { SpirContext } from '../context';

export default function withSpir(Component) {
    return props => (
        <SpirContext.Consumer>
            { spir => (
                <Component {...props} spir={spir} />
            ) }
        </SpirContext.Consumer>
    )
}
