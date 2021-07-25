import setFavorite from '../actions/setFavorite'
const initialState = {
    favData: null,
    saving: false
}

const getFavorite = (state = initialState, action = setFavorite) => {
    switch (action.type) {
        case 'addFavorite':
            return { ...state, favData: action.favData };
        case 'editFavorite':
            return { ...state, favData: action.favData };
        case 'onSave':
            return { ...state, saving: true };
        case 'onStopSave':
            return { ...state, saving: false };
        default:
            return { ...state };
    }
}

export default getFavorite