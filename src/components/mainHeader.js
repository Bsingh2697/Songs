import React, { Component } from 'react'
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'
import { images } from '../utils/constants/assets';
import { withNavigation } from 'react-navigation';

class MainHeader extends Component {
    constructor(props){
        super(props)
    }
    render() {
        // alert(images.backArrow)
        return (
            <View flex={1}  style={styles.headerBody}>
                <View>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <Image style= {styles.imageStyle} source={images.backArrow}/>
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
        backgroundColor:'transparent',
    },
    childView:{
        flex:1,
        paddingTop:20
    },
    imageStyle:{
        marginVertical:20,
        marginStart:20
    }
})
export default withNavigation(MainHeader)
