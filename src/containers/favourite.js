import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList,ActivityIndicator } from 'react-native'
import { navigationConstants } from '../utils/constants/navigationConstants';
import { colors } from './../utils/constants/colors';
import { globalStyles } from './../utils/globalStyles';
import { fonts } from '../utils/constants/fonts';
import { stringConstants } from './../utils/constants/stringConstants';
import { fetchAllSongs, fetchAlbumData, fetchArtistData, allSongsFlatlist } from './../network/requests';
import SongsListUI from '../components/songsListUI';
import { connect } from 'react-redux';
import MainHeader from '../components/mainHeader';

export class favourite extends Component {
    render() {
        return (
            <MainHeader>
            <View style={styles.body}>
                <View>
                    <Text style = {globalStyles.mainhead}>{stringConstants.favourites} : {this.props.favourite.length}</Text>
                    <FlatList
                            data = {this.props.favourite}
                            renderItem={({item})=>(
                                <SongsListUI  key = {item.id} item = {item} removeFav={true}/>
                            )}
                            extraData = {this.props.cartData}
                            keyExtractor = {(item)=> item.id}
                            ListEmptyComponent={<Text>{stringConstants.nosongaddedtocart}</Text>}
                            ItemSeparatorComponent={()=>(<View style={globalStyles.separator}></View>)}
                    />
                </View>
            </View>
            </MainHeader>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favourite : state.favourite.favourite
    }
}

const styles = StyleSheet.create({
    body:{
        backgroundColor:colors.theme_col_brownShade,
        flex:1,
        paddingTop:20,
        paddingHorizontal:20
    },
})

export default connect(mapStateToProps,null)(favourite)
