import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PackerHeader from '../header';
import colors from '../../config/colors';

const ITEM_TEXT_LIMIT = 17;

class StoreScreen extends Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props);
    this.state = this.props.navigation.state.params;
    this.item_text_limit = 15;
  }

  Item({ title }) {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => this.updateStore(title)}>
          {/* <IconCE name="store" style={styles.storeIcon} /> */}
          <Text style={styles.ctitle}>{(title.length>ITEM_TEXT_LIMIT)? (title.substring(0, ITEM_TEXT_LIMIT-3))+'...': title }</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View>
        <PackerHeader go_back={true} {...this.props}></PackerHeader>
        <View style={styles.store_title_container}>
          <Text style={styles.title}> Welcome to {this.state.store} </Text>
        </View>
        <View style={styles.storeListView}>
          <FlatList
            numColumns={2}
            data={this.state.categories}
            renderItem={({ item }) => <this.Item title={item.title} />}
            keyExtractor={item => item.id} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  store_title_container: {
    backgroundColor: colors.primaryColor,
    width: "100%",
    // height: "15%"
  },

  storeListView: {
    // // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // height: "100%"
  },

  item: {
    backgroundColor: colors.primaryColor,
    width: "45%",
    // height: "20%",
    padding: "5%",
    marginVertical: "2%",
    marginHorizontal: "2.5%",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 25,
  },
  title: {
    fontSize: 18,
    color: colors.white,
  },

  ctitle: {
    fontSize: 16,
    // width: "45%",
    // height: "5%",
    color: colors.white,
  },
  storeIcon: {
    fontSize: 48,
    marginBottom: "10%"
  },
});

export default StoreScreen;

