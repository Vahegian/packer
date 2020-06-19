import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, StatusBar } from 'react-native';
import { Header, Left, Right, Body } from 'native-base'
import PackerHeader from '../../../../components/header'

import Icon from 'react-native-vector-icons/Ionicons'

export default class OrdersScreen extends Component {
    static navigationOptions = {
        drawerLabel: "Open Orders",
        drawerIcon: ({ tintColor }) => (
            <Icon name="md-book" style={{ color: tintColor, fontSize: 24 }} />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <PackerHeader {...this.props}></PackerHeader>
                <Text style={{ fontSize: 25, marginBottom: 20 }}>Open Orders SCREEN</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
