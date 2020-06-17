import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import PackerHeader from '../header';
import SqlStorage from '../logic/sqlStorage';
import colors from '../../config/colors';
import Symbols from '../../config/symbols'

// to be used in development only
import storeData from '../../config/storesMock.json'


class CartScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props);
        this.asyncStorage = new SqlStorage();
        this.itemComponents = [];
        this.getCartContent();
        this.Item = this.Item.bind(this);
        this.CartItem = this.CartItem.bind(this);
        this.prices = {}
    }



    async clearCart() {
        await this.asyncStorage.removeValue("cart");
        this.getCartContent()
        // this.refresh()
    }

    // UI functions 

    CartItem({ sid, cid, pid, qty }) {
        let categoryObj = this.findItemArray(storeData.categories[sid], "id", cid);
        let productObj = this.findItemArray(storeData.products[sid][cid], "id", pid);
        let totalQtyPrice = qty * productObj.price;
        this.prices[sid] ? this.prices[sid] += totalQtyPrice : this.prices[sid] = totalQtyPrice;
        // console.log(this.prices)
        return (
            <View style={{ flexDirection: "row", marginTop: "3%", alignItems: "center" }}>
                {/* <Image source={{uri:storeData.products.s1.c1}} /> */}
                {/* <Text>{}</Text> */}
                {/* <Text>{categoryObj.title}</Text> */}
                <Image source={{ uri: productObj.image }} style={styles.itemImage} />
                <View style={{ flex: 0.5, flexDirection: "column" }}>
                    <Text style={{ fontSize: 18 }} >{productObj.title}</Text>
                    <Text style={{ fontSize: 14 }}>{"qty: " + qty}</Text>
                    <Text style={{ fontSize: 14 }}>{Symbols.euro + totalQtyPrice}</Text>
                </View>

                <TouchableOpacity style={{ flex: 0.2 }}>
                    <Text style={{ color: colors.red }} >Remove</Text>
                </TouchableOpacity>
            </View>
        )
    }

    Item({ data }) {
        let storeObj = this.findItemArray(storeData.stores, "id", data.store);
        this.prices = {};
        return (
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <View style={styles.item}>
                    <Text style={styles.cartItemStoreText}>{"Orders from " + storeObj.title}</Text>
                    <View style={styles.storeProducts}>
                        {
                            data.items.map((i) => {
                                return (<this.CartItem key={data.store + i.category + i.product + i.qty}
                                    sid={data.store}
                                    cid={i.category}
                                    pid={i.product}
                                    qty={i.qty} />);
                            })
                        }
                    </View>
                    <Text>{"Total: " + this.prices[data.store]}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%" }} >
                        <TouchableOpacity style={{ backgroundColor: colors.yellow, padding: "2%", borderRadius: 10 }} >
                            <Text style={{ fontSize: 18, color: colors.white }}>Request Delivery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                <PackerHeader go_back={true} {...this.props}></PackerHeader>
                <TouchableOpacity onPress={async () => { await this.clearCart() }}
                    style={{
                        backgroundColor: colors.red,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text style={{
                        color: colors.white,
                        fontSize: 16
                    }}>
                        Clear Cart
                    </Text>
                </TouchableOpacity>
                {this.itemComponents.length > 0 ?
                    <FlatList
                        // numColumns={1}
                        data={this.itemComponents}
                        renderItem={({ item }) => <this.Item data={item} />}
                        keyExtractor={item => item.store}
                        contentContainerStyle={styles.storeListView}
                        extraData={this.props}
                    />
                    :
                    <View style={{ flexDirection: "column", height: "90%",justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 24 }} >Cart is empty </Text>
                    </View>
                }
            </View>
        );
    }

    // Logic Functions

    getCartContent() {
        this.asyncStorage.getData("cart").then((data) => {
            // console.log(data)
            this.itemComponents = []
            for (const skey in data) {
                let items = [];
                for (const ckey in data[skey]) {
                    for (const pkey in data[skey][ckey]) {
                        items.push({ category: ckey, product: pkey, qty: data[skey][ckey][pkey] })
                    }
                }
                this.itemComponents.push({ store: skey, items: items })
            }
            this.refresh()
        });
    }

    refresh() {
        try {
            console.log(this.state.rx)
            this.setState({ rx: !this.state.rx })
        } catch{
            this.setState({ rx: true })
        }
    }

    printT(T) { console.log("T", T) }

    findItemArray(array, key, value) {
        return array.find(x => x[key] === value)
    }
}

const styles = StyleSheet.create({
    store_title_container: {
        backgroundColor: colors.primaryColor,
        width: "100%",
        // height: "15%"
    },

    storeListView: {
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
        paddingBottom: 100,
        // width: "100%",
        // backgroundColor: colors.cosmic,
        // alignSelf: 'stretch',
        // height: "100%"
    },

    item: {
        flexDirection: "column",
        // backgroundColor: colors.primaryColor,
        width: "98%",
        // alignSelf: 'stretch',
        // height: "20%",
        padding: "5%",
        marginVertical: "2%",
        // marginHorizontal: "2.5%",
        // justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 25,
        backgroundColor: colors.transparentWhite,
        borderColor: colors.primaryColor,
        borderWidth: 2
    },

    storeProducts: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        // backgroundColor: colors.login
    },

    cartItemStoreText: {
        // flex: 1,
        // flexDirection: "row",
        fontSize: 20,
        color: colors.primaryColor,
        // backgroundColor: colors.signup,
        // width: '100%'
    },

    itemImage: {
        flex: 0.3,
        width: 80,
        height: 80,
        marginRight: "5%",
        borderRadius: 20
    },

});

export default CartScreen;
