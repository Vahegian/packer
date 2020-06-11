import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import PackerHeader from '../header';
import colors from '../../config/colors';

const ITEM_TEXT_LIMIT = 13;

class StoreScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props);
        this.state = this.props.navigation.state.params;
        this.Item = this.Item.bind(this);

    }

    updateCategory(title, image, cId) {
        this.props.navigation.navigate('categoryScreen',{
            store: this.state.store,
            category: title,
            storeId: this.state.storeId,
            categoryId: cId,
            categoryImage: image
        });
    }

    Item({ title, image, id }) {
        return (
            <TouchableOpacity style={styles.item} onPress={() => this.updateCategory(title, image, id)}>
                <Image source={image ? { uri: image } : require('../../assets/logo.jpg')} style={styles.itemImage} />
                <Text style={styles.ctitle}>{(title.length > ITEM_TEXT_LIMIT) ? (title.substring(0, ITEM_TEXT_LIMIT - 3)) + '...' : title}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View>
                <PackerHeader go_back={true} {...this.props}></PackerHeader>
                <View style={styles.store_title_container}>
                    <Text style={styles.title}> Welcome to {this.state.store} </Text>
                </View>
                {/* <ScrollView> */}
                <View style={styles.storeListView}>
                    <FlatList
                        numColumns={2}
                        data={this.state.categories}
                        renderItem={({ item }) => <this.Item title={item.title} image={item.image} id={item.id} />}
                        keyExtractor={item => item.id} />
                </View>
                {/* </ScrollView> */}
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
        flexDirection: "row",
        backgroundColor: colors.primaryColor,
        width: "45%",
        // height: "20%",
        padding: "5%",
        marginVertical: "2%",
        marginHorizontal: "2.5%",
        // justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },

    itemImage: {
        width: 50,
        height: 50,
        marginRight: "10%",
        borderRadius: 20
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

