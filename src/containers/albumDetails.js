import React,{ Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Image, ActivityIndicator,ScrollView } from 'react-native'
import { navigationConstants } from '../utils/constants/navigationConstants';
import { colors } from '../utils/constants/colors';
import { globalStyles } from '../utils/globalStyles';
import { fonts } from '../utils/constants/fonts';
import { stringConstants } from '../utils/constants/stringConstants';
import moment from 'moment'
import { fetchAlbumData } from './../network/requests';
import { connect } from 'react-redux';
import MainHeader from '../components/mainHeader';
import { images } from './../utils/constants/assets';

export class albumDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            albumData : null,
            loader : true
        }
    }
    details = this.props.navigation.getParam('item')

    componentDidMount(){
        this.albumData()
    }

    albumData = () => {
        fetchAlbumData(this.details, response => {
             
                this.setState({
                    albumData:response.data,
                    loader:false
            })
        })
    }

    render() {
        const {albumData} = this.state
     

        return (
            <>
                {this.state.loader
                ? <ActivityIndicator animating size="large" style={globalStyles.indicator}/>
                :<MainHeader>
                <ScrollView contentContainerStyle={styles.body}>
                    <View style={styles.cartView}>
                        <TouchableOpacity style={styles.values} onPress={()=> this.props.navigation.navigate(navigationConstants.cart)}>
                            <Image  resizeMode="contain" style={styles.hambur} source={images.cart}/>
                            <Text> : {this.props.cart.length}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={globalStyles.imageHolder}>
                        <Image style={globalStyles.imageStyleLarge} resizeMode="cover" source={{uri: albumData.cover_xl}}/>
                        <Text style={[globalStyles.boldyellow20,{alignSelf:'center'}]}>{albumData.title}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={[globalStyles.medium16Purple]}>
                            {stringConstants.rating} : {albumData.rating}
                        </Text>
                        <View>
                            <TouchableOpacity 
                                style={styles.artistDetails} 
                                onPress={()=> this.props.navigation.navigate(navigationConstants.artistDetails,{item:albumData.artist.id})}>
                                <Text style={[globalStyles.medium16Purple]}>
                                    {stringConstants.artist} : {albumData.artist.name}
                                </Text>
                                <View style={[globalStyles.imageViewStyle,{marginStart:20}]}>
                                    <Image style={globalStyles.imageStyle} resizeMode="contain" source={{uri : albumData.artist.picture_big}}/>  
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={[globalStyles.medium16Purple]}>
                            {stringConstants.duration} : {moment.utc(albumData.duration *1000).format("mm : ss")}
                        </Text>
                        <Text style={[globalStyles.medium16Purple]}>
                            {stringConstants.followers} : {albumData.fans}
                        </Text>
                        <Text style={[globalStyles.medium16Purple]}>
                            {stringConstants.releaseDate} : {albumData.release_date}
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
        paddingTop:0,
        justifyContent:'center',
        width:'100%'
    },
    artistDetails:{
        flexDirection:'row'
    },
    details:{
        marginTop:50,
        alignItems:'center'
    },
    hambur:{
        height:30,
        width:30
    },
    logoStyle:{
        height:60
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
})

const mapStateToProps = (state) => {
    return {
        cart : state.cart.cart,
        fav : state.favourite.favourite
    }
}

export default connect(mapStateToProps,null)(albumDetails)
