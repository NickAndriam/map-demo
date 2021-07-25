const setMyFavorites = (myFavorites) => {
    return {
        type: 'updateFavorites',
        myFavorites
    }
}

export default setMyFavorites