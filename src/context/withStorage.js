import React from 'react';
import { StorageContext } from '../context';

export default function withStorage(Component) {
    return props => (
        <StorageContext.Consumer>
            { storage => (
                <Component {...props} storage={storage} />
            ) }
        </StorageContext.Consumer>
    )
}
