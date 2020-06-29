import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Helpers {
    constructor() {
    }

    findItemArray(array, key, value) {
        return array.find(x => x[key] === value)
    }

    async wait (milliseconds) {
        // Splash screen will remain visible for 2 seconds
        const wait = time => new Promise(resolve => setTimeout(resolve, time));
        return wait(milliseconds).then(() => {});
      };

}
