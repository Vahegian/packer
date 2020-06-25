import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class SqlStorage {
    constructor() {

    }

    storeData = async (key, value) => {
        try {
            // console.log("store", value);
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            // saving error
        }
    }

    addData = async (key, value) => {
        try {
            let data = await this.getData(key);
            if (data != null){
                data.push(value);
                await this.storeData(key, data);
            }else{
            // console.log("add", data);
                await this.storeData(key, [value]);
            }
            // let nd = await this.getData("d1")

            // const jsonValue = JSON.stringify(value)
            // await await AsyncStorage.mergeItem(key, jsonValue)
        } catch (e) {
            // saving error
        }
    }

    getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }

    removeValue = async (key) => {
        try {
          await AsyncStorage.removeItem(key)
          return true;
        } catch(e) {
          // remove error
          return false;
        }
      
      }

}

export default SqlStorage;
