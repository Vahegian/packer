import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Helpers {
    constructor() {
    }

    findItemArray(array, key, value) {
        return array.find(x => x[key] === value)
    }

}
