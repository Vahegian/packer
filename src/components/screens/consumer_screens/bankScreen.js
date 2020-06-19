import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PackerHeader from '../../header';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

class BankScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    _onChange(form){ console.log(form);}

    render() {
        return (
            <View>
                <PackerHeader go_back={true} {...this.props}></PackerHeader>
                <CreditCardInput onChange={this._onChange} 
                                requiresName={true}
                                imageFront={require('../../../assets/logo.jpg')} 
                >

                </CreditCardInput>
            </View>
        );
    }
}

export default BankScreen;
