import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar } from 'react-native';
import { Header, Left, Right, Body } from 'native-base'
import colors from '../config/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Ionicons'

export default class PackerHeader extends Component {
  render() {
    return (
      <>
        <Header style={{ backgroundColor: colors.primaryColor }} androidStatusBarColor={colors.primaryColor}>
          <Left>
            <Icon name="md-menu" style={{fontSize: 28 }} onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <Image
              style={{ width: 50, height: 50 }}
              source={require('../assets/logo.jpg')}/>
          </Body>
          <Right>
            <Icon name="md-cart" style={{fontSize: 28 }} />
          </Right>
        </Header>
      </>
    );
  }
}
