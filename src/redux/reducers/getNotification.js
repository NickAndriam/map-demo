import setNotification from '../actions/setNotification'
const initialState = {
    isNotiOpen: false,
    msg: ''
}

const getNotification = (state = initialState, action = setNotification) => {
    switch (action.type) {
        case 'openNotification':
            return { ...state, isNotiOpen: true, msg: action.msg };
        case 'closeNotification':
            return { ...state, isNotiOpen: false };
        default:
            return { ...state };
    }
}

export default getNotification