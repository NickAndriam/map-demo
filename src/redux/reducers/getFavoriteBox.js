const initialState = {
    isFBOpen: false,
}

const getFavoriteBox = (state = initialState, action) => {
    switch (action.type) {
        case 'openFB':
            return { ...state, isFBOpen: true };
        case 'closeFB':
            return { ...state, isFBOpen: false };
        default:
            return { ...state };
    }
}

export default getFavoriteBox