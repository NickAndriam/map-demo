import setLatLong from '../actions/setLatLong'
const initialState = {
    value: [144.9560978250015, -37.820286740392866],
    color: "",
    latLongStateChange: false,
}

const getLatLong = (state = initialState, action = setLatLong) => {
    switch (action.type) {
        case 'onChange':
            return { ...state, value: action.value, latLongStateChange: true, color: action.color };
        case 'onStop':
            return { ...state, latLongStateChange: false };
        default:
            return { ...state }
    }
}

export default getLatLong;