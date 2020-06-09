import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PackerHeader from '../header';


class StoreScreen extends Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props);
    this.state = this.props.navigation.state.params;
  }

  render() {
    return (
      <View>
        <PackerHeader go_back={true} {...this.props}></PackerHeader>
        <Text> {this.state.store} </Text>
        <Text> {this.state.categories[0]} </Text>
      </View>
    );
  }
}

export default StoreScreen;
