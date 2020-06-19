import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PackerHeader from '../../header';
import { CreditCardInput } from "react-native-credit-card-input";

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
                <View style={{marginTop:"2%"}}>
                <CreditCardInput onChange={this._onChange} 
                                requiresName={true} 
                                cardImageFront={require('../../../assets/logo_color_card.png')}
                                cardImageBack={require('../../../assets/logo_color_card_back.png')}
                />
                </View>
            </View>
        );
    }
}

export default BankScreen;
