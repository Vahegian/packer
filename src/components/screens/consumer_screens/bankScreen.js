import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import PackerHeader from '../../header';
import { CreditCardInput } from "react-native-credit-card-input";
import ImgResources from '../../../config/imgResources'
import colors from '../../../config/colors';
import Symbols from '../../../config/symbols';

class BankScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }
    constructor(props) {
        super(props);
        this.totalToPay = this.props.navigation.state.params.totalPay
        this._onChange = this._onChange.bind(this);
        this.state = { canContinue: false, showConfirmationDialog: false };
        this.bankDetails = null;
    }

    continueWithOrder(cardData, totalPay) {
        console.log(cardData, totalPay);
        this.props.navigation.navigate('ActiveOrders');
    }

    areDetailsValid(form) {
        for (let key in form) {
            if (form[key] != 'valid') return false
        }
        return true
    }

    _onChange(form) {
        if (this.areDetailsValid(form.status)) {
            this.bankDetails = form.values;
            this.setState({ canContinue: true });
        } else {
            this.setState({ canContinue: false });
        }
    }

    _getHidenCardNumber(cardNumber){
        return ("*".repeat(cardNumber.length-4))+cardNumber.slice(cardNumber.length-4)
    }

    render() {
        return (
            <View>
                <PackerHeader go_back={true} {...this.props}></PackerHeader>
                <View style={{ flexDirection: "column" }}>
                    <View style={{ marginTop: "2%" }}>
                        <CreditCardInput onChange={this._onChange}
                            requiresName={true}
                            cardImageFront={ImgResources.bank_card_front}
                            cardImageBack={ImgResources.bank_card_back}
                        />
                    </View>

                    <View style={{ flexDirection: "column", alignItems: "center", marginTop: "5%" }} >
                        <TouchableOpacity style={[{
                            paddingTop: "2.5%",
                            paddingBottom: "2.5%",
                            paddingLeft: "25%",
                            paddingRight: "25%",
                            borderRadius: 25,
                        }, this.state.canContinue ? { backgroundColor: colors.primaryColor } : { backgroundColor: colors.primaryLight }]}
                            disabled={!this.state.canContinue}
                            onPress={() => { this.setState({ showConfirmationDialog: true }) }}
                        >
                            <Text style={{ fontSize: 20, color: colors.white }}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal visible={this.state.showConfirmationDialog} transparent={true} animationType="slide"

                >
                    {this.state.showConfirmationDialog ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <View style={{
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "95%",
                                height: "82%",
                                backgroundColor: colors.white,
                                borderRadius: 25,
                                borderColor: colors.black,
                                borderWidth: 3
                            }}>

                                <View style={styles.modalDetails}>
                                    <Text style={styles.modalText}>Card Type: {this.bankDetails.type.toUpperCase()}</Text>
                                    <Text style={styles.modalText}>Number: {this._getHidenCardNumber(this.bankDetails.number)}</Text>
                                    <Text style={styles.modalText}>Your Name: {this.bankDetails.name}</Text>
                                    <Text style={styles.modalText}>Payment Amount: {Symbols.euro + parseFloat(this.totalToPay).toFixed(2)}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <TouchableOpacity onPress={() => { this.continueWithOrder(this.bankDetails, this.totalToPay) }}
                                        style={styles.modalButton}>
                                        <Text style={{ color: colors.white }}>Pay</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setState({ showConfirmationDialog: false }) }}
                                        style={styles.modalButton}>
                                        <Text style={{ color: colors.white }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        :
                        <Text>An Error Has Occurred</Text>
                    }
                </Modal>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    modalButton: {
        backgroundColor: colors.primaryColor,
        margin: 20,
        borderRadius: 25,
        width: "30%",
        padding: "5%",
        alignItems: "center",
        justifyContent: "center"
    },
    modalText: {
        fontSize: 18,
        width: "85%",
        marginBottom:"2%",
        // color: colors.white
        // backgroundColor: colors.primaryLight,
        // borderRadius: 25,
        // borderWidth: 2,
        // borderColor: colors.primaryColor
    },
    modalDetails: { 
        flexDirection: "column", 
        justifyContent: "flex-start", 
        borderColor:colors.primaryColor,
        backgroundColor:colors.primaryLight, 
        borderWidth:2, 
        borderRadius:25,
        padding:"1%",
        width: "95%"
    },
});
export default BankScreen;
