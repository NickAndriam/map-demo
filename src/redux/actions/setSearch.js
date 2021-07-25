const setSearch = (input, result, data) => {
    return {
        type: 'onFocus',
        input
    }, {
        type: 'onBlur',
    }, {
        type: 'onResult',
        result,
        input,
        data
    }
}

export default setSearch;