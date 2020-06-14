import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome5'


class UserModeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={colors.primaryColor}></StatusBar>
        <ImageBackground source={require('../../assets/logo.jpg')} style={styles.container} blurRadius={8}>
            <View style={styles.touchWrapper}>
            <TouchableOpacity style={styles.touchStyle} onPress={() => this.props.navigation.navigate('')}>
              <Icon name="truck" style={{ fontSize: 76 }}/>
              <Text style={styles.textStyle}>I want to Deliver</Text>
            </TouchableOpacity>
            <View style={{flex: 0.3}}></View>
            <TouchableOpacity style={styles.touchStyle} onPress={() => this.props.navigation.navigate('Drawer')}>
            <Icon name="shopping-basket" style={{ fontSize: 76 }}/>
              <Text style={styles.textStyle}>I want to Order</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </>
    );
  }
}

export default UserModeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
  },

  touchWrapper:{
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },

  touchStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "48%",
    width: "80%",
    padding: "1%",
    backgroundColor: colors.transparentWhite,
    borderRadius: 20,
  },

  textStyle: {
    fontSize: 24,

  },
});