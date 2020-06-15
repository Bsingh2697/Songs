import React, { Component } from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'
import { images } from '../utils/constants/assets';
import { withNavigation } from 'react-navigation';
import { colors } from './../utils/constants/colors';
import { globalStyles } from './../utils/globalStyles';

class MainHeader extends Component {
    constructor(props){
        super(props)
    }
    render() {
        // alert(images.backArrow)
        return (
            <View flex={1}  style={styles.headerBody}>
                <View>
                    <TouchableOpacity style={styles.headerSt} onPress={()=>this.props.navigation.goBack()}>
                        <Image source={images.backArrow}/>
                        <Text style={[globalStyles.boldyellow20,{marginStart:20}]}>{this.props.header}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.childView}>
                    {this.props.children}
                </View>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    headerBody:{
        backgroundColor:colors.theme_col_brownShade,
    },
    childView:{
        flex:1,
        paddingTop:20
    },
    imageStyle:{
        marginTop:30,
        marginStart:20
    },
    headerSt:{
        flexDirection:"row",
        alignItems:'center',
        marginStart:20,
        marginTop:30
    }
})
export default withNavigation(MainHeader)
