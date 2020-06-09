import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar, TouchableOpacity } from 'react-native';
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
            <Icon name="md-menu" style={{ fontSize: 28 }} onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
            <TouchableOpacity>
              <Image
                style={{ width: 50, height: 50 }}
                source={require('../assets/logo.jpg')} />
            </TouchableOpacity>
          </Body>
          <Right>
            <TouchableOpacity>

            <Icon name="md-cart" style={{ fontSize: 28 }} />
            </TouchableOpacity>
          </Right>
        </Header>
      </>
    );
  }
}
