const initialState = {
    isDark: false
}

const getTheme = (state = initialState, action) => {
    switch (action.type) {
        case 'setDark':
            return { ...state, isDark: true };
        case 'setLight':
            return { ...state, isDark: false };
        default:
            return { ...state }
    }
}

export default getTheme;