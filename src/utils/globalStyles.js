import { StyleSheet } from "react-native";
import { colors } from './constants/colors';
import { fonts } from './constants/fonts';

export const globalStyles = StyleSheet.create({
    mainhead : {
        color:colors.theme_col_yellow,
        fontFamily:fonts.font_regular,
        fontSize: 24
    },
    boldyellow20 : {
        color : colors.theme_col_yellow,
        fontFamily:fonts.font_bold,
        fontSize:20
    },
    indicator:{
        top:'50%'
    },
    imageStyle:{
        height:30,
        width:30,
        borderRadius:12,
        // borderWidth:1,
        // borderColor:colors.theme_col_yellow
    },
    imageViewStyle: {
        borderRadius:12,
        height:30,
        width:30,
        borderWidth:1,
        borderColor:colors.theme_col_yellow,
        overflow:'hidden'
    },
    imageHolder: {
        // backgroundColor:colors.theme_col_gray,
        // flex:0.7,
        height:200,
        justifyContent:'center',
        alignSelf:'center',
    },
    imageStyleLarge:{
        height:300,
        width:180,
        borderRadius:10,
        borderColor:colors.theme_col_yellow,
        borderWidth:2
    },
    separator :{
        width:"100%",
        height:1,
        backgroundColor:colors.theme_col_purpleShade
    },
    medium16Purple:{
        color : colors.theme_col_purpleShade,
        fontFamily:fonts.font_medium,
        fontSize:16
    },
    medium12Purple:{
        color : colors.theme_col_purpleShade,
        fontFamily:fonts.font_medium,
        fontSize:12
    },
    medium14Purple:{
        color : colors.theme_col_purpleShade,
        fontFamily:fonts.font_medium,
        fontSize:14
    },
    
    
})