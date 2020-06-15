import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList,ActivityIndicator,Image } from 'react-native'
import { navigationConstants } from '../utils/constants/navigationConstants';
import { colors } from './../utils/constants/colors';
import { globalStyles } from './../utils/globalStyles';
import { fonts } from '../utils/constants/fonts';
import { stringConstants } from './../utils/constants/stringConstants';
import { fetchAllSongs, allSongsFlatlist } from './../network/requests';
import SongsListUI from '../components/songsListUI';
import { connect } from 'react-redux';
import { debounce } from 'lodash'
import  AsyncStorage  from '@react-native-community/async-storage';
import { cartActionCreators } from '../redux/actions/cartAction';
import { favActionCreators } from './../redux/actions/favAction';
import { images } from '../utils/constants/assets';
import { appConstants } from './../utils/constants/appConstants';
// import SoundPlayer from 'react-native-sound-player'
import Sound from 'react-native-sound';


var music = null
export class SongsListing extends Component {

    constructor(props){
        super(props)
        this.searchHandler = debounce(this.handleParam,500)

    }
    state={
        params : {
            q:'A'
        },
        nextUrl : null,
        data :  null,
        loader : true,
        isLoading : true,
        playpause:true,
        first:true
    }

    componentDidMount(){

        this.setState({
            loader:true
        })
        this.fetchSongs()
       
        this.storageSetup()
    }

    storageSetup = async() =>{
        const cart = await AsyncStorage.getItem(appConstants.cartItems)
        const fav =  await AsyncStorage.getItem(appConstants.favItems)
        this.props.setCart(JSON.parse(cart))
        this.props.setFav(JSON.parse(fav))
    }

    fetchSongs = () => {
        fetchAllSongs(this.state.params,response=>{
            var x = response.data.next.split("?")
            this.setState({
                data : response.data.data,
                nextUrl : `?${x[1]}`,
                loader:false,
                isLoading:false
            })
            
        })
    }

    testMore = () => {
        allSongsFlatlist(this.state.nextUrl,response=>{
            
            var x = response.data.next?.split("?")
            this.setState({
                nextUrl : `?${x[1]}`,
                data : [...this.state.data,...response.data.data]
            })
        })  
    }

    handleParam = (val) => {
        let params = this.state.params
        params.q = val
        this.setState({
            param : params
        },()=>this.fetchSongs())
    }

    renderFooter = () =>{
        return(
            <View>
                <ActivityIndicator animating size='large'/>
            </View>
        )
    }

    playAudioHandler=(val)=>{
        console.log("Gonna Play")
        console.log(val)
            !this.state.first 
            ? music.stop()
            : null
            music = new Sound(val,null,(e)=>{
            if(e){
                console.log(e)
            }else{
                music.play()
                this.setState({playpause:!this.state.playpause,first:false})
            }
        })
        
    }
    playpauseHandler=()=>{
        !this.state.first 
            ? music.stop()
            : null
    }

    render() {
        return (
                <View style={styles.bodyStyle}>
                    <View style={styles.logoStyle}>
                        <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
                            <Image style={styles.hambur} resizeMode="cover" source={images.hamburger}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.topStyle}> 
                        <View style={styles.searchView}>
                            <TextInput 
                                style={styles.searchSt}
                                placeholder={stringConstants.search}
                                placeholderTextColor={colors.theme_col_yellow}
                                onChangeText={this.searchHandler}
                                />
                        </View>
                        <View style={styles.cartView}>
                            <TouchableOpacity style={styles.values} onPress={()=> this.props.navigation.navigate(navigationConstants.cart)}>
                                <Image  resizeMode="contain" style={styles.hambur} source={images.cart}/>
                                <Text> : {this.props.cart.length}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.values} onPress={()=> this.props.navigation.navigate(navigationConstants.favourite)}>
                                <Image resizeMode="contain" style={styles.hambur} source={images.fav}/>
                                <Text> : {this.props.fav.length}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text style={[globalStyles.mainhead]}>  {stringConstants.songs_list}</Text>
                    </TouchableOpacity>
                    
                    {this.state.loader
                    ?<ActivityIndicator size="large" animating style={styles.indicatorSt}/>
                    :<FlatList
                        data={this.state.data}
                        renderItem={({item})=> (
                            <SongsListUI 
                             playAudio={this.playAudioHandler}
                             playPause = { this.playpauseHandler}
                             key = {item.id} 
                             item = {item}/>
                        )}
                        onEndReached={()=>this.testMore()}
                        onEndReachedThreshold={0.5}
                        ListEmptyComponent={this.state.params.q == "" ? <Text>{stringConstants.searchYourMusicHere}</Text> :<Text>{stringConstants.noMusicFound}</Text>}
                        extraData={this.state.data}
                        ItemSeparatorComponent={()=>(<View style={globalStyles.separator}></View>)}
                        ListFooterComponent= {this.renderFooter}
                        keyExtractor={(item)=>item.id}
                        onRefresh={()=>this.fetchSongs()}
                        refreshing={this.state.isLoading}
                        />
                }
                </View>
        )
    }
}

const styles = StyleSheet.create({
    searchSt:{
        borderColor:colors.theme_col_purpleShade,
        borderWidth:2,
        borderRadius:30,
        color: colors.theme_col_yellow,
        paddingHorizontal:20,
        height:40,
        marginTop:20
    },
    bodyStyle:{
        backgroundColor:colors.theme_col_grayShade,
        flex:1,
        paddingHorizontal:20,
        paddingVertical:20
    },
    topStyle:{
        flexDirection:'row',
        alignItems:'center',
    },
    searchView:{
        flex:1.5,
        marginBottom:20
    },
    cartView:{
        flex:0.5,
        alignItems:'flex-end'
    },
    hambur:{
        height:30,
        width:30
    },
    logoStyle:{
        height:60
    },
    values:{
        flexDirection:'row'
    },
    indicatorSt:{
        top:50
    }
})

const mapStateToProps = (state) => {
    return {
        cart : state.cart.cart,
        fav : state.favourite.favourite
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCart : (item) => dispatch(cartActionCreators.saveToCart(item)),
        setFav : (item) => dispatch(favActionCreators.saveToFav(item))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SongsListing)
