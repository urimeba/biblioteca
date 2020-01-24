import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    View,
} from 'react-native';

export default class AuthLoadingScreen extends Component{
    constructor()
    {
        super();
        this._Async();
    }

    _Async = async () => {
        const userToken = await AsyncStorage.getItem("userToken");
        this.props.navigation.navigate(
            userToken ? "App":"Login"
        );
    }

    render(){
        return (
            <View>
                    <ActivityIndicator/>
            </View>
        )
    }
}