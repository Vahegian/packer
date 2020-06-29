import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, StatusBar} from 'react-native';
import colors from '../../config/colors';
import ImgResources from '../../config/imgResources'
import Helpers from '../logic/helpers';

export default class Splash extends Component {
  async componentDidMount() {

    let helpers = new Helpers();
    await helpers.wait(2000);
    this.props.navigation.navigate('Login');

  }

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
