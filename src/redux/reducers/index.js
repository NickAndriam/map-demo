import { combineReducers } from 'redux'

//all reducer imports 
import getSearch from './getSearch'
import getLatLong from './getLatLong'
import getFavorite from './getFavorite'
import getTheme from './getTheme'
import getMyFavorites from './getMyFavorites'
import getAddtoFavorites from './getAddtoFavorites'
import getNotification from './getNotification'
import getFavoriteBox from './getFavoriteBox'
import getScreenWidth from './getScreenWidth'
import getMenu from './getMenu'


const rootReducer = combineReducers({
    getSearch,
    getLatLong,
    getFavorite,
    getTheme,
    getMyFavorites,
    getAddtoFavorites,
    getNotification,
    getFavoriteBox,
    getScreenWidth,
    getMenu
})

export default rootReducer;