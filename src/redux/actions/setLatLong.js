const setLatLong = (value, color) => {
    return {
        type: 'onChange',
        value,
        color,
    },
    {
        type: 'onStop',
        value,
    }
}

export default setLatLong;