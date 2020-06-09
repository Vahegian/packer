import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto'
import colors from '../../config/colors';

export default class LoginScreen extends Component {

    render() {
        return (
            <ImageBackground source={require('../../assets/logo.jpg')} style={styles.container} blurRadius={4}>
                <View style={styles.form}>
                    <TextInput placeholder={"username"} selectionColor={colors.primaryColor} style={styles.textInput} />
                    <View style={{flex:0.01}}/>
                    <TextInput secureTextEntry={true} placeholder={"password"} selectionColor={colors.primaryColor} style={styles.textInput} />
                    <View style={{flex:0.05}}/>
                    <View style={{width: '85%', marginLeft: '7.5%'}}>
                    <Button title={"Login"} color={colors.loginGreen} onPress={()=>{
                        this.props.navigation.navigate('Home');
                    }} ></Button>
                    </View>
                    <View style={{flex:0.05}}/>
                    <View style={{width: '85%', marginLeft: '7.5%'}}>
                    <Button title={"Register"} color={colors.register} onPress={()=>{
                        // this.props.navigation.navigate('Home');
                    }} ></Button>
                    </View>
                </View>
            </ImageBackground>
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
        backgroundColor: colors.white,
        borderRadius: 20
    },
});
