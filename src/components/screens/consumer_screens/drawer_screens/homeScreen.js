import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'
import colors from '../../../../config/colors';
import PackerHeader from '../../../../components/header'
import IconCE from 'react-native-vector-icons/FontAwesome5'

// to be used in development only
import storeData from '../../../../config/storesMock.json'

export default class HomeScreen extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" style={{ color: tintColor }} />
    ),
    header: null
  };

  constructor(props) {
    super(props);

    this.state = { store: null, categories: null };
    // this.updateStore = this.updateStore.bind(this);
    this.Item = this.Item.bind(this);
  }

  getJsonFromFile(file) {
    return fetch(file)
      .then((response) => response.json())
      .then((json) => {
        return json.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateStore(title, id) {
    // this.setState()
    this.props.navigation.navigate('storeScreen', {
      store: title,
      storeId: id,
      categories: storeData.categories[id]
    });
  }

  Item({ title, id }) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.updateStore(title, id)}>
        {/* <View style={styles.item}> */}
          <IconCE name="store" style={styles.storeIcon} />
          <Text style={styles.title}>{title}</Text>
        {/* </View> */}
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <PackerHeader {...this.props}></PackerHeader>
        {/* <View style={styles.storeListView}> */}
          <FlatList
            numColumns={2}
            data={storeData.stores}
            renderItem={({ item }) => <this.Item title={item.title} id={item.id} />}
            keyExtractor={item => item.id}
            contentContainerStyle={{justifyContent:"center", alignItems: "center"}} />
        {/* </View> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.transparentWhite,
  },
  storeListView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    // flex: 1,
    // borderBottomColor: colors.primaryColor,
    flexDirection: "column",
    width: "45%",
    padding: "10%",
    marginVertical: "3%",
    marginHorizontal: "2.5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: colors.transparentWhite,
    borderColor: colors.primaryColor,
    borderWidth: 2
  },
  title: {
    fontSize: 18,
    // color: colors.white,
  },
  storeIcon: {
    fontSize: 48,
    marginBottom: "10%",
  },
});

