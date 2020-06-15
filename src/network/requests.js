
import {apiRequest} from './index'
import { endpoints } from './../utils/constants/endpoints';

export const fetchAllSongs = (
    params,
    successCallBack,
    errorCallBack
)=>{
    console.log("Inside Request")
    // return () => 
       apiWrapper(
           endpoints.all_songs,
           params,
           null,
           successCallBack,
           errorCallBack
       )    
}

export const allSongsFlatlist = (
    path,
    successCallBack,
    errorCallBack
)=>{
    apiWrapper(
        endpoints.all_songs,
        null,
        path,
        successCallBack,
        errorCallBack
    )
}

export const fetchAlbumData = (
    album_id,
    successCallBack,
    errorCallBack
)=>{
    console.log("Album Request")
    apiWrapper(
        endpoints.album,
        null,
        album_id,
        successCallBack,
        errorCallBack
    )
}

export const fetchArtistData = (
    artist_id,
    successCallBack,
    errorCallBack
)=>{
    console.log("Artist Request")
    apiWrapper(
        endpoints.artist,
        null,
        artist_id,
        successCallBack,
        errorCallBack
    )
}

export const apiWrapper = (
    endpoint,
    params,
    path,
    successCallBack,
    errorCallBack
) =>  {
        console.log("APIWRAPPER")
        // let end = 
        apiRequest(
            `${endpoint}${path !== null? path : "" }`,
            params,
            successCallBack,
            errorCallBack,
            exceptionCallBack => console.log(exceptionCallBack)
        )
}