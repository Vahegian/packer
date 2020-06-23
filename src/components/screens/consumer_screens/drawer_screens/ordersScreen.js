import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar, PermissionsAndroid } from 'react-native';
import { Header, Left, Right, Body } from 'native-base'
import PackerHeader from '../../../../components/header'

import Icon from 'react-native-vector-icons/Ionicons'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import colors from '../../../../config/colors';

export default class OrdersScreen extends Component {
    static navigationOptions = {
        drawerLabel: "Open Orders",
        drawerIcon: ({ tintColor }) => (
            <Icon name="md-book" style={{ color: tintColor, fontSize: 24 }} />
        ),
    };

    constructor(props) {
        super(props);
        this.state = { pos: {latitude: 37.78825, longitude: -122.4324}, 
                       testStorePose: {latitude: 48.2082, longitude: 16.3712}, permission: false };
        this.requestLocationPermission().then(() => { console.log("Finish Loc") })

        Geolocation.getCurrentPosition(
            (pos) => {
                console.log(pos.coords)
                this.setState({ pos: pos.coords })
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
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
                console.log("Thank you");
                this.setState({ permission: true })
            } else {
                console.log("Delivery cant be made");
                this.setState({ permission: false })
            }
        } catch (err) {
            console.warn(err);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <PackerHeader {...this.props}></PackerHeader>
                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: this.state.pos.latitude,
                            longitude: this.state.pos.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={this.state.pos}
                            title="Your location"
                            pinColor={colors.primaryColor}
                        ></Marker>
                        <Marker
                            coordinate={this.state.testStorePose}
                            title="Store location"
                            pinColor={colors.star}
                        ></Marker>
                    </MapView>
                    <Text>{this.state.permission ? "granted" : "Not granted"}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
        // flexDirection: "column"
        // width: "100%",
        // height: "100%"

    },
    map: {
        // ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "75%"

    },
    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        // borderRadius: 50,
        // borderWidth: 5,
        // borderColor: colors.primaryColor
    }
});
