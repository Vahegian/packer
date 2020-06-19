import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar } from 'react-native';
import { Header, Left, Right, Body } from 'native-base'
// import colors from '../../../config/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PackerHeader from '../../../../components/header'
import Icon from 'react-native-vector-icons/Ionicons'

export default class SettingsScreen extends Component {
  static navigationOptions = {
    drawerIcon: ({tintColor})=>(
      <Icon name="md-settings" style={{color:tintColor, fontSize:24}}/>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <PackerHeader {...this.props}></PackerHeader>
        <Text style={{ fontSize: 25, marginBottom: 20 }}>Settings SCREEN</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
