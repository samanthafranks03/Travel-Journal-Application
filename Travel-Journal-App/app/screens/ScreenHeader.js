import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ScreenHeader = ({ headerTitle, navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{headerTitle}</Text>
            <TouchableOpacity onPress = {() => {navigation.navigate('Profile')}}>
                <Image 
                    source={require("../../assets/images/profile.png")}
                    style={styles.profileImage}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 40,
        fontFamily: 'Roboto',
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

export default ScreenHeader;