import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, StatusBar} from 'react-native';
import colors from '../../config/colors';
import ImgResources from '../../config/imgResources'

export default class Splash extends Component {
  async componentDidMount() {
    // You can load api data or any other thing here if you want
    const data = await this.navigateToLogin();
    // if (data !== null) {
    //   this.props.navigation.navigate('Login');
    // }
  }

  navigateToLogin = async () => {
    // Splash screen will remain visible for 2 seconds
    const wait = time => new Promise(resolve => setTimeout(resolve, time));
    return wait(2000).then(() => this.props.navigation.navigate('Login'));
  };

  render() {
    return (
      <>
      <StatusBar backgroundColor={colors.primaryColor}></StatusBar>
      <View style={styles.container}>
        <Image style={styles.logo} source={ImgResources.mainLogo} />
      </View>
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

  logo: {
    width: 180,
    height: 180,
  },
});
