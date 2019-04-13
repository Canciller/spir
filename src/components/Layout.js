import React, { Component } from 'react';
import './Layout.css';

import Header from './Header';
import Sidebar from './Sidebar';

export default class Layout extends Component {
    render()  {
        let { children } = this.props;

        return (
            <div className='Layout-outer'>
                <Header />
                <div className='Layout-inner'>
                    <Sidebar />
                    { children }
                </div>
            </div>
        )
    }
}
