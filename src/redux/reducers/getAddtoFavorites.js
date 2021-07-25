const initialState = {
    openFooter: false
}

const getAddtoFavorites = (state = initialState, action) => {
    switch (action.type) {
        case 'openAddtoFavorites':
            return { ...state, openFooter: true };
        case 'closeAddtoFavorites':
            return { ...state, openFooter: false };
        default:
            return { ...state };
    }
}

export default getAddtoFavorites