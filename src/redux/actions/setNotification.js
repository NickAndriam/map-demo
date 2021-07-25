const setNotification = (msg) => {
    return {
        type: 'openNotification',
        msg
    },
    {
        type: 'closeNotification',
    }
}

export default setNotification