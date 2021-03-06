import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Header, Left, Right, Body } from 'native-base'
import colors from '../config/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import ImgResources from '../config/imgResources'

export default class PackerHeader extends Component {

  constructor(props) {
    super(props);
    this.allow_go_back = this.props.go_back;
  }

  render() {
    return (
      <>
        <Header style={{ backgroundColor: colors.primaryColor }} androidStatusBarColor={colors.primaryColor}>
          <Left>
            {this.allow_go_back
              ? <Icon name="md-arrow-back" style={{ fontSize: 28, color:colors.white }} onPress={() => this.props.navigation.goBack()} />
              : <Icon name="md-menu" style={{ fontSize: 28, color:colors.white }} onPress={() => this.props.navigation.openDrawer()} />
            }
          </Left>
          <Body>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }} >
              <Image
                style={{ width: 50, height: 50 }}
                source={ImgResources.mainLogo} />
            </TouchableOpacity>
          </Body>
          <Right>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('cartScreen')}} >
              <Icon name="md-cart" style={{ fontSize: 28, color:colors.white }} />
            </TouchableOpacity>
          </Right>
        </Header>
      </>
    );
  }
}
