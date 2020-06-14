import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import PackerHeader from '../header';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons'

// to be used in development only
import storeData from '../../config/storesMock.json'

class CategoryScreen extends Component {
    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props);
        this.state = this.props.navigation.state.params;
        this.products = storeData.products[this.state.storeId][this.state.categoryId];
        this.Item = this.Item.bind(this);
    }

    // onStarRatingPress(id, rating) {
    //     for(let item in this.products){
    //         if (item.id === id){

    //         }
    //     }    
    // }

    Item({ product }) {
        return (
            <View style={styles.item}>
                <Image source={product.image ? { uri: product.image } : require('../../assets/logo.jpg')} style={styles.itemImage} />
                <View style={{ flexDirection: "column" }} >
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

                    <Text style={styles.textPprice}>{product.price}</Text>
                    <Text style={styles.textPtime}>Delivery in {product.deliveryTime} minutes</Text>
                </View>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems:"center", marginLeft: "20%"}} >
                    <TouchableOpacity>
                        <Icon name="md-cart" style={{ fontSize: 28 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: "10%"}}>
                        <Text style={styles.textPname}>Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View>
                <PackerHeader go_back={true} {...this.props}></PackerHeader>
                <View style={styles.store_title_container}>
                    <Text style={styles.title}> {this.state.store} >  </Text>
                    <Image source={{ uri: this.state.categoryImage }} style={{ width: 20, height: 20 }} />
                    <Text style={styles.title}> {this.state.category}</Text>
                </View>
                {this.products ?
                    // <View>
                    <FlatList
                        numColumns={1}
                        data={this.products}
                        renderItem={({ item }) => <this.Item product={item} />}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.storeListView} />
                    // </View>

                    : <Text>Currently Nothing is available</Text>}
            </View>
        );
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
        backgroundColor: colors.primaryColor,
        width: "90%",
        marginLeft: "5%",
        // height: "20%",
        padding: "5%",
        marginVertical: "2%",
        // marginHorizontal: "2.5%",
        // justifyContent: "center",
        // alignContent: "center",
        borderRadius: 25,
    },

    textPname: {
        fontSize: 18,
        color: colors.white,
    },

    textPprice: {
        fontSize: 14,
        color: colors.white,
    },

    textPtime: {
        marginTop: "3%",
        fontSize: 12,
        color: colors.time,
    },

    itemImage: {
        width: 80,
        height: 80,
        marginRight: "5%",
        borderRadius: 20
    },
});

export default CategoryScreen;