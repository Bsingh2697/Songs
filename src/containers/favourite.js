import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList,ActivityIndicator,ScrollView } from 'react-native'
import { colors } from './../utils/constants/colors';
import { globalStyles } from './../utils/globalStyles';
import { fonts } from '../utils/constants/fonts';
import { stringConstants } from './../utils/constants/stringConstants';
import SongsListUI from '../components/songsListUI';
import { connect } from 'react-redux';
import MainHeader from '../components/mainHeader';

export class favourite extends Component {
    render() {
        return (
            <MainHeader
                header={stringConstants.favourites}
            >
            <ScrollView contentContainerStyle={styles.body}>
                <View>
                    <Text style = {globalStyles.mainhead}>{stringConstants.total} : {this.props.favourite.length}</Text>
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
            </ScrollView>
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
        flexGrow:1,
        paddingBottom:50,
        paddingHorizontal:20
    },
})

export default connect(mapStateToProps,null)(favourite)
