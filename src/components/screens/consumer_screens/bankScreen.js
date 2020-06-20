import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import PackerHeader from '../../header';
import { CreditCardInput } from "react-native-credit-card-input";
import ImgResources from '../../../config/imgResources'
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../../config/colors';

class BankScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }
    constructor(props) {
        super(props);
        this.totalToPay = this.props.navigation.state.params.totalPay
        this._onChange = this._onChange.bind(this);
        this.state={ canContinue: false };
        this.bankDetails = null;
    }

    continueWithOrder(cardData, totalPay){
        console.log(cardData, totalPay)
    }

    areDetailsValid(form) {
        for (let key in form) {
            if (form[key] != 'valid') return false
        }
        return true
    }

    _onChange(form) {
        if (this.areDetailsValid(form.status)){
            this.bankDetails = form.values;
            this.setState({ canContinue: true });
        } else{
            this.setState({ canContinue: false });
        }
    }

    render() {
        return (
            <View>
                <PackerHeader go_back={true} {...this.props}></PackerHeader>
                <View style={{ flexDirection:"column"}}>
                    <View style={{ marginTop: "2%" }}>
                        <CreditCardInput onChange={this._onChange}
                            requiresName={true}
                            cardImageFront={ImgResources.bank_card_front}
                            cardImageBack={ImgResources.bank_card_back}
                        />
                    </View>

                    <View style={{ flexDirection:"column", alignItems:"center", marginTop:"5%"}} >
                        <TouchableOpacity style={[{
                            paddingTop:"2.5%",
                            paddingBottom:"2.5%",
                            paddingLeft:"25%",
                            paddingRight:"25%",
                            borderRadius:25,
                        }, this.state.canContinue? {backgroundColor: colors.primaryColor}:{backgroundColor: colors.primaryLight}]}
                        disabled={!this.state.canContinue}
                        onPress={()=>{this.continueWithOrder(this.bankDetails, this.totalToPay)}}
                        >
                            <Text style={{ fontSize: 20, color:colors.white }}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal visible={false} transparent={false}>
                    <Text>Modal</Text>
                </Modal>
            </View>
        );
    }
}

export default BankScreen;
