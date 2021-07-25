import setSearch from '../actions/setSearch'
const initialState = {
    searchState: false,
    input: "",
    result: null,
    data: null
}

const getSearch = (state = initialState, action = setSearch) => {
    switch (action.type) {
        case 'onFocus':
            return { ...state, searchState: true, input: action.input };
        case 'onBlur':
            return { ...state, searchState: false, input: action.input };
        case 'onResult':
            return { ...state, searchState: true, result: action.result, input: action.input, data: action.data };
        default:
            return { ...state }
    }
}

export default getSearch;