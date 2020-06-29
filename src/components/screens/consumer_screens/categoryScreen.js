import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import colors from '../../../config/colors';
import PackerHeader from '../../header';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import SqlStorage from '../../logic/sqlStorage';
import Helpers from '../../logic/helpers';
import ImgResources from '../../../config/imgResources'
import Symbols from '../../../config/symbols';
import Swipeable from 'react-native-swipeable';
import Toast from 'react-native-simple-toast';

// to be used in development only
import storeData from '../../../config/storesMock.json'

class CategoryScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props);
        this.helpers = new Helpers();
        this.sql = new SqlStorage();
        this.state = {itemAdding:''}
        this.store = this.props.navigation.state.params;
        this.products = storeData.products[this.store.storeId][this.store.categoryId];
        this.Item = this.Item.bind(this);
    }

    // onStarRatingPress(id, rating) {
    //     for(let item in this.products){
    //         if (item.id === id){

    //         }
    //     }    
    // }

    async addItemsToCart(itemId, qty) {
        let data = await this.sql.getData("cart");
        let productObj = this.helpers.findItemArray(storeData.products[this.store.storeId][this.store.categoryId], "id", itemId);
        let totalQtyPrice = qty * productObj.price;

        if (data === null) data = {}

        try {
            if (data[this.store.storeId][this.store.categoryId][itemId] != null) {
                let prevQty = data[this.store.storeId][this.store.categoryId][itemId].qty
                qty = qty + prevQty
                totalQtyPrice = qty * productObj.price;
            }

            data[this.store.storeId][this.store.categoryId][itemId] = { qty: qty, price: totalQtyPrice };

        } catch{
            let t2 = {}; t2[itemId] = { qty: qty, price: totalQtyPrice };
            let t1 = {}; t1[this.store.categoryId] = t2;
            data[this.store.storeId] = t1;
        }

        await this.sql.storeData("cart", data);

    }

    Item({ product }) {
        const leftContent = <View style={{ backgroundColor: colors.green, }}></View>;
        
        return (
            <Swipeable leftContent={leftContent} 
                        onLeftActionActivate={async () => { await this.addItemsToCart(product.id, 1);
                                                        this.setState({itemAdding: product.id})}} 
                        onLeftActionDeactivate={async () => { await this.helpers.wait(100);
                                                        this.setState({itemAdding: ''}); 
                                                        Toast.show("Added "+product.title)}} >

                <View style={[styles.item, this.state.itemAdding===product.id ? { backgroundColor: colors.green } : styles.item]}>
                    <TouchableOpacity onPress={() => { alert("More about the product " + product.title) }}>
                        <Image source={product.image ? { uri: product.image } : ImgResources.mainLogo} style={styles.itemImage} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: "column", width: "42%" }} >
                        <Text style={styles.textPname}>{product.title}</Text>

                        <StarRating
                            disabled={false}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            maxStars={5}
                            rating={product.starCount}
                            // selectedStar={(rating) => this.onStarRatingPress(rating)}
                            fullStarColor={colors.star}
                            starSize={16}
                        />

                        <Text style={styles.textPprice}>{Symbols.euro + product.price.toFixed(2)}</Text>
                        <Text style={styles.textPtime}>Delivery in {product.deliveryTime} minutes</Text>
                    </View>

                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginLeft: "20%" }} >
                        <TouchableOpacity onPress={async () => { await this.addItemsToCart(product.id, 1); Toast.show("Added "+product.title)}}>
                            <Icon name="md-cart" style={{ fontSize: 28 }} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{ marginTop: "10%" }}>
                        <Text style={styles.textPname}>Details</Text>
                    </TouchableOpacity> */}
                    </View>
                </View>
            </Swipeable>
        );
    }

    render() {
        return (
            <View>
                <PackerHeader go_back={true} {...this.props}></PackerHeader>
                <View style={styles.store_title_container}>
                    <Text style={styles.title}> {this.store.store} </Text>
                    <Image source={{ uri: this.store.categoryImage }} style={{ width: 20, height: 20 }} />
                    <Text style={styles.title}> {this.store.category}</Text>
                </View>
                {this.products ?
                    // <View>
                    <FlatList
                        numColumns={1}
                        data={this.products}
                        renderItem={({ item }) => <this.Item product={item} />}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.storeListView}
                        extraData={this.props} />
                    // </View>

                    : <Text>Currently Nothing is available</Text>}
            </View>
        );
    }

    refresh() {
        try {
            console.log("rx", this.state.rx)
            this.setState({ rx: !this.state.rx })
        } catch{
            this.setState({ rx: true })
        }
    }
}

const styles = StyleSheet.create({
    store_title_container: {
        flexDirection: "row",
        backgroundColor: colors.primaryColor,
        width: "100%",
        alignItems: "center",
        // height: "15%"
    },

    title: {
        fontSize: 18,
        color: colors.white,
    },

    storeListView: {
        // flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
        // width: "100%"
        // height: "100%"
    },

    item: {
        flexDirection: "row",
        // backgroundColor: colors.primaryColor,
        width: "90%",
        marginLeft: "5%",
        // height: "20%",
        padding: "5%",
        marginVertical: "2%",
        // marginHorizontal: "2.5%",
        // justifyContent: "center",
        // alignContent: "center",
        borderRadius: 25,
        backgroundColor: colors.transparentWhite,
        borderColor: colors.primaryColor,
        borderWidth: 2
    },

    textPname: {
        fontSize: 18,
        // width: "90%"
        // color: colors.white,
    },

    textPprice: {
        fontSize: 14,
        // width: "90%"
        // color: colors.white,
    },

    textPtime: {
        marginTop: "3%",
        fontSize: 12,
        color: colors.time,
        // width: "100%"
    },

    itemImage: {
        width: 80,
        height: 80,
        marginRight: "5%",
        borderRadius: 20
    },
});

export default CategoryScreen;
