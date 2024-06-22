import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


export default function NewEntry() {
    return (
        <View style={styles.container}>
            <Icon style={styles.icon} name='plussquareo'/>
            <Text style={styles.text}>New Entry</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 175,
    },
    text: {
        color: 'black',
        fontSize: 25,
        fontFamily: 'Helvetica-Bold',
    
    },
    icon: {
        color: 'black',
        fontSize: 125,
        paddingHorizontal: 20,

    }

});