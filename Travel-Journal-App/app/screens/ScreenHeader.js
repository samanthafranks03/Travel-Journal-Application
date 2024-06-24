import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;


export default function ScreenHeader({headerTitle}) {
    return (
        <GestureHandlerRootView style={styles.container}>
            <Text style={styles.title}>{headerTitle}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                <Image 
                    source={require("../../assets/images/profile.png")}
                    style={styles.profileImage}
                />
            </TouchableOpacity>

        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 40,
        fontFamily: 'Inter-bold',
        marginLeft: windowWidth * 0.04,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48,
        width: '100%', 
    },
    profileImage: {
        width: 48,  
        height: 48, 
        resizeMode: 'contain',
        marginRight: windowWidth * 0.04,
    }
});