import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function NewTripsHeader(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Find New Trips</Text>
            <Image 
                source={require("../../../assets/images/profile.png")}
                style={styles.profileImage}
            />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        title:{
            color: 'black',
            fontSize: 40,
            fontFamily: 'Helvetica-Bold',
            marginLeft: windowWidth * 0.04,
        },
        container:{
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
})