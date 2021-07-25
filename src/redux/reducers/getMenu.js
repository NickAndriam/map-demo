const initialState = {
    isMenuOpened: false
}

const getMenu = (state = initialState, action) => {
    switch (action.type) {
        case 'openMenu':
            return { ...state, isMenuOpened: true };
        case 'closeMenu':
            return { ...state, isMenuOpened: false };
        default:
            return { ...state };
    }
}

export default getMenu