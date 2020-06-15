import React,{ Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Image } from 'react-native'
import { navigationConstants } from '../utils/constants/navigationConstants';
import { colors } from './../utils/constants/colors';
import { globalStyles } from './../utils/globalStyles';
import { fonts } from '../utils/constants/fonts';
import { stringConstants } from '../utils/constants/stringConstants';
import moment from 'moment'
import { connect } from 'react-redux';
import {cartActionCreators} from '../redux/actions/cartAction'
import {favActionCreators} from '../redux/actions/favAction'
import { withNavigation } from 'react-navigation';
import ToastMsg from './../lib/toast';
import { appConstants } from './../utils/constants/appConstants';

export class SongsListUI extends Component {

    state={
        playpause:false
    }

    playPauseHandler=()=>{
        this.props.playPause()
    }

    playAudio = () => {
        this.props.playAudio(`${this.props.item.preview}`)
    }

    addToCartHandler = () => {
        let check = this.props.cartData.findIndex( item => {
            return item.id === this.props.item.id
        })
        if (check==-1){
            ToastMsg(stringConstants.addedToCart,appConstants.success)
            this.props.addToCart(this.props.item)
        }else{
            ToastMsg(stringConstants.notAdded,appConstants.danger)
        }
    }
    addToFavHandler = () => {
        let check = this.props.favData.findIndex( item => {
            return item.id === this.props.item.id
        })
        if (check==-1){
            ToastMsg(stringConstants.addedToFav,appConstants.success)
            this.props.addToFav(this.props.item)
        }else{
            ToastMsg(stringConstants.notAdded,appConstants.danger)
        }
    }
    removeFromCartHandler = () => {
        let check = this.props.cartData.findIndex( item => {
            return item.id === this.props.item.id
        })
        if (check!==-1){
            ToastMsg(stringConstants.removedFromCart,appConstants.danger)
            this.props.removeFromCart(this.props.item)
        }else{
            ToastMsg(stringConstants.notRemoved,appConstants.danger)
        }
    }
    removeFromFavouriteHandler = () => {
        let check = this.props.favData.findIndex( item => {
            return item.id === this.props.item.id
        })
        if (check!==-1){
            ToastMsg(stringConstants.removedFromFav,appConstants.danger)
            this.props.removeFromFavourite(this.props.item)
        }else{
            ToastMsg(stringConstants.notAdded,appConstants.danger)
        }
    }

    render() {
        const {item} = this.props
        return (
            <View style = {styles.body}>
                <View flex={1.3}>
                    <View style={styles.upDetailStyle}>
                        <Text numberOfLines={1} style={[globalStyles.medium16Purple,styles.nameSt]}>{item.title_short}</Text>
                        <Text numberOfLines={1} style={[globalStyles.medium12Purple]}>{stringConstants.duration} : {moment.utc(item.duration*1000).format("mm : ss")}</Text>
                    </View>
                        <View style={styles.detailStyle}>
                            <View style={globalStyles.imageViewStyle}>
                                <Image style={globalStyles.imageStyle} resizeMode='contain' source={{uri : item.album.cover_small}}/>
                            </View>
                            <TouchableOpacity 
                             onPress={()=> this.props.navigation.navigate(navigationConstants.albumDetails,{item:item.album.id})}
                             >
                                <Text style={[globalStyles.medium14Purple,{width:150}]} numberOfLines={1} >  {stringConstants.album} : {item.album.title}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.detailStyle,{marginBottom:10}]}>
                            <View style={globalStyles.imageViewStyle}>
                                <Image style={globalStyles.imageStyle} resizeMode='contain' source={{uri : item.artist.picture_small}}/>
                            </View>
                            <TouchableOpacity
                                onPress={()=> this.props.navigation.navigate(navigationConstants.artistDetails,{item:item.artist.id})}
                            >
                                <Text style={[globalStyles.medium14Purple,{width:150}]} style={globalStyles.medium14Purple} numberOfLines={1}>  {stringConstants.artist} : {item.artist.name}</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            (this.props.removeCart || this.props.removeFav) 
                            ? null
                            :<View style={styles.playPause}>
                                <TouchableOpacity style={styles.playpausebut} onPress={()=>this.playAudio()}>
                                    <Text style={globalStyles.medium14Purple}>
                                    {stringConstants.play}
                                </Text></TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.playPauseHandler()}>
                                    <Text style={globalStyles.medium14Purple}>
                                    {stringConstants.stop}
                                </Text></TouchableOpacity>
                             </View>
                        }
                </View>
                <View flex={0.7} style={styles.buttonsView}>
                    {
                        (this.props.removeCart || this.props.removeFav) 
                        ?<TouchableOpacity 
                            onPress = {()=>{this.props.removeCart 
                                            ?this.removeFromCartHandler()
                                            :this.removeFromFavouriteHandler()}} 
                            style={styles.buttonsStyle}>
                            <Text>{stringConstants.remove}</Text>
                         </TouchableOpacity >
                        :<>
                            <TouchableOpacity onPress = {()=>this.addToFavHandler()} style={styles.buttonsStyle}>
                               <Text>{stringConstants.addToFav}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.addToCartHandler()} style={styles.buttonsStyle}>
                                <Text>{stringConstants.buy}</Text>
                            </TouchableOpacity> 
                         </>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    detailStyle:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        paddingBottom:5
    },
    body:{
        flexDirection:'row',
        alignItems:'center'
    },
    buttonsView:{
        alignItems:'flex-end',
        marginEnd:20
    },
    buttonsStyle:{
        backgroundColor:colors.theme_col_yellow,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
        paddingVertical:5,
        marginBottom:5,
        borderRadius:20
    },
    upDetailStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        paddingVertical:10,
    },
    nameSt:{
        width:100,
        marginEnd:20,
    },
    playPause:{
        flexDirection:"row",
        marginBottom:20
    },
    playpausebut:{
        marginEnd:20,
        marginStart:20
    }
})

const mapStateToProps = (state) => {
        return {
            cartData : state.cart.cart,
            favData : state.favourite.favourite
        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart : (item) => dispatch(cartActionCreators.addToCart(item)),
        addToFav : (item) => dispatch(favActionCreators.addToFav(item)),
        removeFromCart : (item) => dispatch(cartActionCreators.removeFromCart(item)),
        removeFromFavourite : (item) => dispatch(favActionCreators.removeFromFav(item))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withNavigation(SongsListUI))
