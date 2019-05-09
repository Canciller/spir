import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import View from '../components/View';
import DataCard from '../components/DataCard';

const styles = theme => ({})

class Test extends Component {
    state = {}

    render() {
        return (
            <View
                title='Testing'
            >
                <DataCard
                    data={{
                        card: {
                            tag: '0231231232',
                            id: '4534534534534534534'
                        },
                        partner: {
                            name: 'Gabriel',
                            email: 'email@gmail.com'
                        }
                    }}

                    format={{
                        partner: {
                            label: 'Partner',
                            variant: 'title',
                            format: {
                                name: {
                                    variant: 'subtitle1'
                                }
                            }
                        },
                        card: {
                            label: 'Card',
                            variant: 'title',
                            gutterTop: true
                        }
                    }}
                />
            </View>
        )
    }
}

export default withStyles(styles)(Test);
