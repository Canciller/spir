import React, { Component, Fragment } from 'react';

export default class Dynamic extends Component {
    constructor(props) {
        super(props);
        this.state = { module: null };
    }

    componentDidMount() {
        const { path } = this.props;
        import(`${path}`)
            .then(module => this.setState({ module: module.default }))
    }

    render() {
        const { module: Component } = this.state; // Assigning to new variable names @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        return(
            <Fragment>
                {Component && <Component />}
            </Fragment>
        )
    }
}
