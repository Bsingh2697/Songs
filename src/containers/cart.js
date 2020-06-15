import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList,ActivityIndicator, ScrollView } from 'react-native'
import { colors } from './../utils/constants/colors';
import { globalStyles } from './../utils/globalStyles';
import { fonts } from '../utils/constants/fonts';
import { stringConstants } from './../utils/constants/stringConstants';
import SongsListUI from '../components/songsListUI';
import { connect } from 'react-redux';
import MainHeader from '../components/mainHeader';

export class cart extends Component {

    componentDidMount(){
    }

    render() {

        return (
            <MainHeader>
            <ScrollView contentContainerStyle={styles.body}>
                    <View>
                        <Text style={globalStyles.mainhead}>{stringConstants.cart} : {this.props.cartData.length} </Text>
                        <FlatList
                            data = {this.props.cartData}
                            renderItem={({item})=>(
                                <SongsListUI  key = {item.id} item = {item} removeCart={true}/>
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

const styles = StyleSheet.create({
    body:{
        backgroundColor:colors.theme_col_brownShade,
        flexGrow:1,
        paddingBottom:50,
        paddingHorizontal:20
    },
})

const mapStateToProps = (state) => {
    return {
        cartData : state.cart.cart
    }
}

export default connect(mapStateToProps,null)(cart)
