import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto'
import colors from '../../config/colors';
import ImgResources from '../../config/imgResources'

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.CustButton = this.CustButton.bind(this);
    }

    CustButton({ name, bgColor }) {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserMode')}
                style={{
                    flexDirection: "row",
                    width: '85%', marginLeft: '7.5%',
                    backgroundColor: bgColor, borderRadius: 20, 
                    justifyContent: "center", padding: "2%"
                }}>
            
                <Text style={{ fontSize: 20, color: colors.white }}>{name}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <>
            <StatusBar backgroundColor={colors.primaryColor}></StatusBar>
            <ImageBackground source={ImgResources.mainLogo} style={styles.container} blurRadius={8}>
                <View style={styles.form}>
                    <TextInput placeholder={"username"} selectionColor={colors.primaryColor} style={styles.textInput} />
                    <View style={{ flex: 0.01 }} />
                    <TextInput secureTextEntry={true} placeholder={"password"} selectionColor={colors.primaryColor} style={styles.textInput} />
                    <View style={{ flex: 0.05 }} />
                    <this.CustButton name="Log In" bgColor={colors.login} />
                    <View style={{ flex: 0.05 }} />
                    <this.CustButton name="Sign up" bgColor={colors.signup} />
                </View>
            </ImageBackground>
            </>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primaryColor,
    },
    form: {
        flex: 0.9,
        width: '85%',
        backgroundColor: 'rgba(255,255,255,.0)',
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 20,
    },

    textInput: {
        height: 60,
        // marginTop: 50,
        marginLeft: '7.5%',
        width: '85%',
        backgroundColor: colors.transparentWhite,
        borderRadius: 20
    },
});
