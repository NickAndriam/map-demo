const setFavorite = (favData, saving) => {
    return {
        type: 'addFavorite',
        favData
    },
    {
        type: 'editFavorite',
        favData
    }
}

export default setFavorite