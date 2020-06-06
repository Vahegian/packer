import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar } from 'react-native';
import { Header, Left, Right, Body, Icon } from 'native-base'
import colors from '../../config/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PackerHeader from '../header'

export default class HomeScreen extends Component {
  static navigationOptions = {
    drawerIcon: ({tintColor})=>(
      <Icon name="home" style={{color:tintColor}}/>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <PackerHeader {...this.props}></PackerHeader>
        <Text style={{ fontSize: 25, marginBottom: 20 }}>HOME SCREEN</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});