const initialState = {
    isSmall: false,
}

const getScreenWidth = (state = initialState, action) => {
    switch (action.type) {
        case 'smallScreen':
            return { ...state, isSmall: true };
        case 'largeScreen':
            return { ...state, isSmall: false };
        default:
            return { ...state };
    }
}

export default getScreenWidth