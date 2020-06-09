import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'
import colors from '../../config/colors';
import PackerHeader from '../header';
import IconCE from 'react-native-vector-icons/FontAwesome5'

export default class HomeScreen extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" style={{ color: tintColor }} />
    )
  };

  constructor(props) {
    super(props);

    this.states = {
      stores: [{ id: 1, title: "Store 1" },
      { id: 2, title: "Store 2" },
      { id: 3, title: "Store 3" },
      { id: 4, title: "Store 4" }],
      categories: ["fruits", "vegetables"]
    };

    this.state = { store: null, category: null };
    // this.updateStore = this.updateStore.bind(this);
    this.Item = this.Item.bind(this);
  }
  
  updateStore(title) {
    this.setState({ store: title })
  }

  Item({ title }) {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={()=>this.updateStore(title)}>
          <IconCE name="store" style={styles.storeIcon} />
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    if (this.state.store === null) {
      return (
        <View style={styles.container}>
          <PackerHeader {...this.props}></PackerHeader>
          <View style={styles.storeListView}>
            <FlatList
              numColumns={2}
              data={this.states.stores}
              renderItem={({ item }) => <this.Item title={item.title} />}
              keyExtractor={item => item.id} />
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Text> {this.state.store} </Text>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  storeListView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: colors.primaryColor,
    // width: "45%",
    padding: "15%",
    marginVertical: "10%",
    marginHorizontal: "2.5%",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 25,
  },
  title: {
    fontSize: 18,
    color: colors.white,
  },
  storeIcon: {
    fontSize: 48,
    marginBottom: "10%"
  },
});

