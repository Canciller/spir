import React from 'react';
import { SpirApiContext } from '../context';

export default function withHistory(Component) {
    return props => (
        <SpirApiContext.Consumer>
            { spirApi => (
                <Component {...props} spirApi={spirApi} />
            ) }
        </SpirApiContext.Consumer>
    )
}
