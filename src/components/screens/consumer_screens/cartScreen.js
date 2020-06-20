import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import PackerHeader from '../../header';
import SqlStorage from '../../logic/sqlStorage';
import colors from '../../../config/colors';
import Symbols from '../../../config/symbols';
import Helpers from '../../logic/helpers'

// to be used in development only
import storeData from '../../../config/storesMock.json'

const FEE = 3.60;

class CartScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props);
        this.helpers = new Helpers();
        this.asyncStorage = new SqlStorage();
        this.itemComponents = [];
        // this.clearCart()
        this.getCartContent();
        this.Item = this.Item.bind(this);
        this.CartItem = this.CartItem.bind(this);
        // this.prices = {}
    }



    async clearCart() {
        await this.asyncStorage.removeValue("cart");
        this.getCartContent()
        // this.refresh()
    }

    // UI functions 

    createOrderButton(storeItems) {
        let sTotal = this.getTotalPrice(storeItems);
        let totalWithFee = FEE+sTotal;

        return (
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('bankScreen', {totalPay:totalWithFee})}}
                style={{
                    flexDirection: "column",
                    backgroundColor: colors.transparentWhite,
                    borderColor: colors.primaryColor,
                    borderWidth: 2,
                    padding: "2%",
                    borderRadius: 10,
                    alignItems: "center",
                    width: "90%"
                }}>
                <Text style={{ fontSize: 18, color: colors.green }}>{"Total: " + Symbols.euro + totalWithFee.toFixed(2)}</Text>
                <Text style={{ fontSize: 14, marginTop: "2%", color: colors.red }}>{"Store total: " + Symbols.euro + sTotal.toFixed(2)}</Text>
                <Text style={{ fontSize: 14, color: colors.red }}>{"Delivery fee: " + Symbols.euro + FEE.toFixed(2)}</Text>
                <Text style={{ fontSize: 24, color: colors.primaryColor }}>Request Delivery</Text>
            </TouchableOpacity>
        )
    }

    CartItem({ sid, cid, pid, qty, price }) {
        let categoryObj = this.helpers.findItemArray(storeData.categories[sid], "id", cid);
        let productObj = this.helpers.findItemArray(storeData.products[sid][cid], "id", pid);
        // let totalQtyPrice = qty * productObj.price;
        // this.prices[sid] ? this.prices[sid] += totalQtyPrice : this.prices[sid] = totalQtyPrice;
        // console.log(this.prices)
        return (
            <View style={{ flexDirection: "row", marginTop: "3%", alignItems: "center" }}>
                <Image source={{ uri: productObj.image }} style={styles.itemImage} />
                <View style={{ flex: 0.5, flexDirection: "column" }}>
                    <Text style={{ fontSize: 18 }} >{productObj.title}</Text>
                    <Text style={{ fontSize: 14 }}>{"qty: " + qty.toFixed(2)}</Text>
                    <Text style={{ fontSize: 14 }}>{Symbols.euro + price.toFixed(2)}</Text>
                </View>

                <TouchableOpacity style={{ flex: 0.2 }} onPress={() => { this.removeItem(sid, cid, pid) }}>
                    <Text style={{ color: colors.red }} >Remove</Text>
                </TouchableOpacity>
            </View>
        )
    }

    Item({ store }) {
        let storeObj = (store.store === "clearButton" ? false: this.helpers.findItemArray(storeData.stores, "id", store.store));
        // let showTotal = false;
        return (
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                { storeObj?
                    <View style={styles.item}>
                        <Text style={styles.cartItemStoreText}>{"Orders from " + storeObj.title}</Text>
                        <View style={styles.storeProducts}>
                            {
                                store.items.map((i) => {
                                    return (<this.CartItem key={store.store + i.category + i.product + i.qty}
                                        sid={store.store}
                                        cid={i.category}
                                        pid={i.product}
                                        qty={i.qty}
                                        price={i.price} />
                                    );
                                })

                            }
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "5%" }} >
                            {this.createOrderButton(store.items)}
                        </View>
                    </View>
                    :
                    <TouchableOpacity onPress={async () => { await this.clearCart() }}
                        style={{
                            backgroundColor: colors.red,
                            width: "95%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 25,
                            padding: "2%",
                            marginTop: 10
                        }}>
                        <Text style={{
                            color: colors.white,
                            fontSize: 16
                        }}>
                            Clear Cart
                    </Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }

    render() {
        // this.prices = {};
        this.itemComponents.push({store:"clearButton"})
        return (
            <View>
                <PackerHeader go_back={true} {...this.props}></PackerHeader>

                {this.itemComponents.length > 1 ?
                    <FlatList
                        // numColumns={1}
                        data={this.itemComponents}
                        renderItem={({ item }) => <this.Item store={item} />}
                        keyExtractor={item => item.store}
                        contentContainerStyle={styles.storeListView}
                        extraData={this.props}
                    />
                    :
                    <View style={{ flexDirection: "column", height: "90%", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 24 }} >Cart is empty </Text>
                    </View>
                }
            </View>
        );
    }

    // Logic Functions

    getTotalPrice(items) {
        let total = 0;
        for (let p of items) {
            total += p.price
        }
        return total
    }

    getCartContent() {
        this.asyncStorage.getData("cart").then((data) => {
            // console.log(data)
            this.itemComponents = []
            for (const skey in data) {
                let items = [];
                for (const ckey in data[skey]) {
                    for (const pkey in data[skey][ckey]) {
                        items.push({
                            category: ckey,
                            product: pkey,
                            qty: data[skey][ckey][pkey].qty,
                            price: data[skey][ckey][pkey].price
                        })
                    }
                }
                this.itemComponents.push({ store: skey, items: items })
            }
            this.refresh()
        });
    }

    removeItem(sid, cid, pid) {
        this.asyncStorage.getData("cart").then(async (data) => {
            delete data[sid][cid][pid];
            await this.asyncStorage.storeData("cart", data);
            this.getCartContent()
            this.refresh();
        })
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
