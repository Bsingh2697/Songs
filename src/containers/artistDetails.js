import React,{ Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Image, ActivityIndicator,ScrollView } from 'react-native'
import { navigationConstants } from '../utils/constants/navigationConstants';
import { colors } from '../utils/constants/colors';
import { globalStyles } from '../utils/globalStyles';
import { fonts } from '../utils/constants/fonts';
import { stringConstants } from '../utils/constants/stringConstants';
import moment from 'moment'
import { fetchArtistData } from './../network/requests';
import { connect } from 'react-redux';
import MainHeader from '../components/mainHeader';
import { images } from './../utils/constants/assets';


export class artistDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            artistdata : null,
            loading : true
        }
    }
    details = this.props.navigation.getParam('item')

    componentDidMount(){
        fetchArtistData(this.details,response=> {
            this.setState({
                artistdata: response.data,
                loading:false
            })
        })
    }

    render() {
        const {artistdata} = this.state
        
        return (
            <>
                {this.state.loading
                ? <ActivityIndicator style={globalStyles.indicator} animating size="large"/>
                :<MainHeader> 
                <ScrollView contentContainerStyle={styles.body}>
                        <View style={styles.cartView}>
                                <TouchableOpacity style={styles.values} onPress={()=> this.props.navigation.navigate(navigationConstants.cart)}>
                                    <Image  resizeMode="contain" style={styles.hambur} source={images.cart}/>
                                    <Text> : {this.props.cart.length}</Text>
                                </TouchableOpacity>
                        </View>
                        <View style={globalStyles.imageHolder}>
                            <Image style={globalStyles.imageStyleLarge} source={{uri:artistdata.picture_big}}/>
                            <Text style={[globalStyles.boldyellow20,{alignSelf:'center'}]}>
                                {artistdata.name}
                            </Text>
                        </View>
                        <View style={styles.details}>
                            <Text style={[globalStyles.medium16Purple]}>
                                {stringConstants.albums} : {artistdata.nb_album}
                            </Text>
                            <Text style={[globalStyles.medium16Purple]}>
                                {stringConstants.fans} : {artistdata.nb_fan}
                            </Text>
                        </View>
                  </ScrollView>
                  </MainHeader>
                }  
            </>
        )
    }
}

const styles = StyleSheet.create({
    body:{
            backgroundColor:colors.theme_col_brownShade,
            flexGrow:1,
            paddingTop:50,
            alignItems:'center',
            justifyContent:'center'
        },
    details:{
            marginTop:100
    },
    values:{
        flexDirection:'row',
        alignSelf:'flex-end',
        paddingEnd:30

    },
    cartView:{
        width:'100%',
        height:100,
        alignItems:'flex-end',
    },
    hambur:{
        height:30,
        width:30
    },
})

const mapStateToProps = (state) => {
    return {
        cart : state.cart.cart,
        fav : state.favourite.favourite
    }
}

export default connect(mapStateToProps,null)(artistDetails)
