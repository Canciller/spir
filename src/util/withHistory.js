import React from 'react';
import { HistoryContext } from '../context';

export default function withHistory(Component) {
    return props => (
        <HistoryContext.Consumer>
            { history => (
                <Component {...props} history={history} />
            ) }
        </HistoryContext.Consumer>
    )
}
