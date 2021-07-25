import setMyFavorite from '../actions/setMyFavorites'
const initialState = {
    myFavorites: []
}

const getMyFavorites = (state = initialState, action = setMyFavorite) => {
    switch (action.type) {
        case 'updateFavorites':
            return { ...state, myFavorites: action.myFavorites };
        default:
            return { ...state };
    }
}

export default getMyFavorites