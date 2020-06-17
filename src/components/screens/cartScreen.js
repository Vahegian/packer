import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import PackerHeader from '../header';
import SqlStorage from '../logic/sqlStorage';
import colors from '../../config/colors';

// to be used in development only
import storeData from '../../config/storesMock.json'


class CartScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props);
        this.asyncStorage = new SqlStorage();

        // this.asyncStorage.storeData("d1", [1, 2, 3]);
        // this.getData("d1").then( async (data)=>{data.push(9); await this.storeData("d1", data); console.log(data)});
        // this.asyncStorage.addData("d1", 9).then(async ()=>{
        //     let data = await this.asyncStorage.getData("d1");
        //     console.log("MM", data);
        //     alert(data);
        // });
        this.items = null;
        this.itemComponents = [];

        this.asyncStorage.getData("cart").then((data) => {
            // console.log("cart", data);
            // alert(data);

            this.items = data;
            this.setState({ rx: 1 });
            console.log("ss", this.items);
            for (const skey in this.items) {
                // console.log("II", store)
                let items = [];
                for (const ckey in this.items[skey]) {
                    for (const pkey in this.items[skey][ckey]) {
                        items.push({ category: ckey, product: pkey, qty: this.items[skey][ckey][pkey] })
                    }
                }
                this.itemComponents.push({ store: skey, items: items })
            }
            this.refresh()
        });
        // console.log("ZZ", this.itemComponents);
        this.Item = this.Item.bind(this);
        this.CartItem = this.CartItem.bind(this);
    }

    async clearCart() {
        await this.asyncStorage.removeValue("cart");
        this.refresh()
    }

    refresh() { this.setState({ rx: !this.state.rx }) }

    printT(T) { console.log("T", T) }

    findItemArray(array, key, value){
        return array.find(x => x[key] === value)
    }

    CartItem({ sid, cid, pid, qty }){
        let storeObj = this.findItemArray(storeData.stores, "id", sid);
        let categoryObj = this.findItemArray(storeData.categories[sid], "id", cid);
        let productObj = this.findItemArray(storeData.products[sid][cid], "id", pid);
        return(
            <View style={{flexDirection: "row"}}>
                {/* <Image source={{uri:storeData.products.s1.c1}} /> */}
                <Text>{storeObj.title}</Text>
                <Text>{categoryObj.title}</Text> 
                <Text>{productObj.title}</Text>
                <Text>{"QTY: "+qty}</Text>
                <TouchableOpacity>
                    <Text>Remove</Text>
                </TouchableOpacity>    
            </View>
        )
    }

    Item({ data }) {
        return (
            //   <TouchableOpacity style={styles.item} onPress={() => this.updateCategory(title, image, id)}>
            //     <Text>{items.product}</Text>
            //   </TouchableOpacity>
            <View style={styles.item}>
                <Text style={styles.cartItemStoreText}>{data.store}</Text>
                <View style={styles.storeProducts}>
                    {
                        data.items.map((i) => {
                            return (<this.CartItem key={data.store+i.category+i.product+i.qty} 
                                                   sid={data.store} 
                                                   cid={i.category} 
                                                   pid={i.product} 
                                                   qty={i.qty} />);
                        })
                    }
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                <PackerHeader go_back={true} {...this.props}></PackerHeader>
                <TouchableOpacity onPress={async () => { await this.clearCart() }}><Text>Clear</Text></TouchableOpacity>
                {this.itemComponents.length > 0 ?
                    <FlatList
                        // numColumns={1}
                        data={this.itemComponents}
                        renderItem={({ item }) => <this.Item data={item} />}
                        keyExtractor={item => item.store}
                        contentContainerStyle={styles.storeListView}
                    />
                    : <Text>NO Items</Text>}
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
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingBottom: 100,
        // width: "95%"
        // height: "100%"
    },

    item: {
        flexDirection: "column",
        // backgroundColor: colors.primaryColor,
        width: "95%",
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
        justifyContent: "center", 
        alignItems: "center" },

    itemImage: {
        width: 50,
        height: 50,
        marginRight: "10%",
        borderRadius: 20
    },

    cartItemStoreText: {
        fontSize: 20,
        color: colors.primaryColor
    }

});

export default CartScreen;
