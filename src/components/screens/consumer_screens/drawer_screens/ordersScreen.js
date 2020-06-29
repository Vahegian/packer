import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, PermissionsAndroid, Modal } from 'react-native';
import { Header, Left, Right, Body } from 'native-base'
import PackerHeader from '../../../../components/header'

import Icon from 'react-native-vector-icons/Ionicons'
import MapView, { PROVIDER_GOOGLE, Marker, Overlay } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import colors from '../../../../config/colors';
import ImgResources from '../../../../config/imgResources'
import Helpers from '../../../logic/helpers'
import SqlStorage from '../../../logic/sqlStorage';
// import MapViewDirections from 'react-native-maps-directions'

// to be used in development only
import storeData from '../../../../config/storesMock.json'
import Symbols from '../../../../config/symbols';

export default class OrdersScreen extends Component {
    static navigationOptions = {
        drawerLabel: "Open Orders",
        drawerIcon: ({ tintColor }) => (
            <Icon name="md-book" style={{ color: tintColor, fontSize: 24 }} />
        ),
    };

    constructor(props) {
        super(props);
        this.helpers = new Helpers()
        this.sql = new SqlStorage()
        // this.sql.removeValue("openOrders").then(()=>{console.log("cleared")})
        this.orderInfo = this.props.navigation.state.params;
        // console.log("OO", this.orderInfo);
        this.state = {
            pos: { latitude: 37.78825, longitude: -122.4324 },
            storePose: { latitude: 48.2082, longitude: 16.3712 }, permission: false
        };

        this.Item = this.Item.bind(this);
        this.requestLocationPermission().then(() => { this.getCurrentLocation() })
        // this.componentDidMount()

    }

    // UI

    getItemImages(sid, items) {
        let imgs = [];
        let id = 0;
        for (let i of items) {
            // if (id == 2){ imgs.push(<Text>...</Text>); break}
            let img = this.helpers.findItemArray(storeData.products[sid][i.category], "id", i.product).image
            // imgs.push(<Image key={sid + id} resizeMethod="resize" source={{ uri: img }} styles={{ height: 50, width: 50, borderRadius: 10 }}></Image>)
            imgs.push({ img: img, id: sid + id })
            id++
        }
        // console.log(imgs)
        return imgs
    }

    Item({ data }) {
        // console.log("ITEM", data, data.store.items[0])
        let imgs = this.getItemImages(data.store.storeID,
            data.store.items)
        return (
            <TouchableOpacity style={styles.item} onPress={() => { this.setState({ storePose: data.storeLocation }) }}>
                <Text style={{ fontSize: 16 }}>Delivering from {data.store.title} - {Symbols.euro + data.totalPrice.toFixed(2)}</Text>
                {/* <View style={{ flexDirection: "row" }}> */}
                <FlatList
                    data={imgs}
                    horizontal={true}
                    renderItem={({ item }) => <Image style={{ width: 50, height: 50, borderRadius: 25, marginRight: 5 }}
                        source={{ uri: item.img }} />}
                    keyExtractor={item => item.id}
                    // contentContainerStyle={styles.storeListView}
                    extraData={this.props}
                />
                <Text style={{ fontSize: 14 }}>Estimated time 1-2 hrs</Text>
                {/* </View>  */}
            </TouchableOpacity>
        )
    }

    renderOrders() {
        return (
            <>
                {/* <Text>{this.state.permission ? "granted" : "Not granted"}</Text> */}
                <View style={styles.orderModal}>
                    <TouchableOpacity onPress={() => { this.sql.removeValue("openOrders").then(() => { this.setState({ userOrders: null }) }) }}
                        style={{
                            padding: "2%", borderColor: colors.red,
                            borderWidth: 1, borderRadius: 25, marginBottom: 10
                        }}
                    >
                        <Text style={{ color: colors.red, fontSize: 14 }}>Cancel all orders</Text>
                    </TouchableOpacity>

                    <FlatList
                        // numColumns={1}
                        data={this.state.userOrders}
                        renderItem={({ item }) => <this.Item data={item} />}
                        keyExtractor={item => item.store.storeID + item.totalPrice}
                        contentContainerStyle={styles.storeListView}
                        extraData={this.props}
                    />
                </View>
            </>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <PackerHeader {...this.props}></PackerHeader>
                {this.state.userOrders != null ?
                    <View>
                        {/* <View style={styles.mapContainer}> */}
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            initialRegion={{
                                latitude: this.state.storePose.latitude,
                                longitude: this.state.storePose.longitude,
                                latitudeDelta: 0.3,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker
                                coordinate={this.state.pos}
                                title="Your location"
                                pinColor={colors.primaryColor}
                            ></Marker>
                            <Marker
                                coordinate={this.state.storePose}
                                title="Store location"
                                pinColor={colors.star}
                                image={ImgResources.mapPinImg}
                            ></Marker>
                            {/* <MapViewDirections
                                    origin={this.state.storePose}
                                    destination={this.state.pos}
                                    apikey={"AIzaSyCnKVOKwgFHOFPx_5Y-Ya-qfU2sPX6Usa4"}
                                /> */}
                        </MapView>
                        {/* </View> */}

                        {this.renderOrders()}

                    </View>
                    :
                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Text>No Open Orders.</Text>
                    </View>
                }
            </View>
        );
    }

    // Logic

    async getOpenOrders() {
        let data = await this.sql.getData("openOrders");
        // console.log("LDDA", data);
        this.setState({ userOrders: data });
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.orderInfo = this.props.navigation.state.params;
            // console.log("POI", this.orderInfo);
            if (this.orderInfo != undefined) {
                let storeLoc = this.helpers.findItemArray(storeData.stores, "id", this.orderInfo.store.storeID).location
                // console.log("MMKMKMK", storeLoc)
                this.sql.addData("openOrders", { storeLocation: storeLoc, store: this.orderInfo.store, totalPrice: this.orderInfo.totalPay }).then(
                    async () => {
                        // console.log("data Added")
                        // remove cart info from props avoid multiple copies
                        delete this.props.navigation.state.params;
                        // as order is confirmed remove the store from cart
                        let cartData = await this.sql.getData("cart");
                        delete cartData[this.orderInfo.store.storeID];
                        await this.sql.storeData("cart", cartData);
                        // update running orders
                        await this.getOpenOrders();
                        // this.getCurrentLocation()
                        // this.refresh()
                    }
                )
            } else {
                // this.refresh()
                this.getOpenOrders().then(() => { console.log("No New Orders") })
            }

        });
    }

    componentWillUnmount() {
        // Remove the event listener before removing the screen from the stack
        this.focusListener.remove();
    }

    getCurrentLocation() {
        Geolocation.getCurrentPosition(
            (pos) => {
                console.log("AA", pos.coords)
                this.setState({ pos: pos.coords })
            },
            (error) => {
                // See error code charts below.
                alert("can't get your geolocation consider enabling location services ")
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 20000 }
        );
    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Allow Packer to use your current location",
                    message:
                        "Packer needs access to your location " +
                        "to deliver your order.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log("Thank you");
                this.setState({ permission: true })
            } else {
                console.log("Delivery can't be made");
                this.setState({ permission: false })
            }
        } catch (err) {
            console.warn(err);
        }
    };

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
    container: {
        flex: 1

    },
    map: {
        // ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%"
        // flex: 1

    },
    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        // height: "10%",
        // marginBottom: "2%"
    },
    storeListView: {
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
        paddingBottom: 10,
        width: "100%"
    },

    item: {
        borderRadius: 25,
        borderWidth: 2,
        borderColor: colors.primaryColor,
        padding: "2%",
        marginBottom: "2%"
    },

    orderModal: {
        position: "absolute",
        alignSelf: "center",
        height: "35%",
        width: "90%",
        borderRadius: 15,
        bottom: "10%",
        backgroundColor: colors.veryTransparentWhite,
    }
});
