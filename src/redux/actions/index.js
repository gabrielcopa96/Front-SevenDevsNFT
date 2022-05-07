import axios from "axios";

export const SET_MODAL = 'SET_MODAL';
export const SET_RESIZE = 'SET_RESIZE';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_ALL_NFT = 'GET_ALL_NFT';
export const GET_NFT_QUERY = 'GET_NFT_QUERY';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_SALES_TYPE = 'GET_SALES_TYPE';
export const GET_FILES_TYPE = 'GET_FILES_TYPE';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const PUT_USER = 'PUT_USER'
export const PUT_LIKES = 'PUT_LIKES';
export const REMOVE_USER = 'REMOVE_USER';
export const REMOVE_NFT_QUERY = 'REMOVE_NFT_QUERY';
export const GET_ALL_COLLECTIONS = 'GET_ALL_COLLECTIONS';
export const FILTER_NFT = 'FILTER_NFT';
export const CREATE_NFT = 'CREATE_NFT';
export const FILTER_CATEGORY = 'FILTER_CATEGORY';



export const setModalOpening = (isOpen) => async (dispatch) => {

    dispatch({
        type: SET_MODAL,
        payload: isOpen
    })
};

export const getAllNft = () => async dispatch => {
    const dataNft = await axios.get('http://localhost:4000/nft')
    const data = await dispatch({
        type: GET_ALL_NFT,
        payload: dataNft.data.getAllNfts
    })
    return data
}

export const getAllCollections = () => async dispatch => {
    const dataCollections = await axios.get('http://localhost:4000/misc/collection')
    const data = await dispatch({
        type: GET_ALL_COLLECTIONS,
        payload: dataCollections.data
    })
    return data
}

export function filterNft(payload) {
    return {
        type: 'FILTER_NFT',
        payload
    }
};


export const getNftQuery = (page) => async dispatch => {
    const dataQuery = await axios.get('http://localhost:4000/nft', { params: { page: page, limit: 8 } })
    if (dataQuery) {
        const dataNftQuery = await dispatch({
            type: GET_NFT_QUERY,
            payload: dataQuery.data.getAllNfts
        })
        return dataNftQuery
    }
}

export const getTokenUser = (user) => async dispatch => {
    try {
        const dataToken = await axios.get('http://localhost:4000/auth/renew', {
            headers: {
                authorization: JSON.parse(user)
            }
        })
        const dataUser = await dispatch({
            type: GET_TOKEN,
            payload: dataToken.data
        })
        return dataUser
    } catch (error) {
        console.log(error)
    }
}

export const putLikesNft = (nft, tokenuser, item) => async dispatch => {
    try {
        const dataLikes = await axios.put(`http://localhost:4000/nft/${nft}`, item, {
            headers: {
                Authorization: JSON.parse(tokenuser)
            }
        })
        const Likes = await dispatch({
            type: PUT_LIKES,
            payload: dataLikes.data
        })
        return Likes
    } catch (error) {
        console.log('error:', error)
    }
}

export const getCategory = () => async dispatch => {
    try {
        const dataCategory = await axios.get('http://localhost:4000/misc/category')
        const finallyDataCategory = await dispatch({
            type: GET_CATEGORY,
            payload: dataCategory.data
        })
        return finallyDataCategory
    } catch (error) {
        console.log('error:', error)
    }
}

export const getSalesType = () => async dispatch => {
    try {
        const dataSalesType = await axios.get('http://localhost:4000/misc/sales_type')
        const finallyDataSalesType = await dispatch({
            type: GET_SALES_TYPE,
            payload: dataSalesType.data
        })
        return finallyDataSalesType
    } catch (error) {
        console.log('error:', error)
    }
}

export const getCurrencies = () => async dispatch => {
    try {
        const dataCurrencies = await axios.get('http://localhost:4000/misc/currencies')
        const finallyDataCurrencies = dispatch({
            type: GET_CURRENCIES,
            payload: dataCurrencies.data
        })
        return finallyDataCurrencies
    } catch (error) {
        console.log('error:', error)
    }
}

export const getFileTypes = () => async dispatch => {
    try {
        const dataFileTypes = await axios.get('http://localhost:4000/misc/files_type')
        const finallyDataFilesType = await dispatch({
            type: GET_FILES_TYPE,
            payload: dataFileTypes.data
        })
        return finallyDataFilesType
    } catch (error) {
        console.log('error:', error)
    }
}

export const postNft = (tokenuser, item) => async dispatch => {
    try {
        const dataPost = await axios.post(`http://localhost:4000/nft`, item, {
            headers: {
                Authorization: JSON.parse(tokenuser)
            }
        })
        const responsePost = await dispatch({
            type: CREATE_NFT,
            payload: dataPost.data
        })
        console.log(dataPost.data)
        return responsePost
    } catch (error) {
        console.log("error", error)
    }
}

export const filterForCategory = (id) => async dispatch => {
    try {
        const dataFilterCategory = await axios.get(`http://localhost:4000/filter/category/${id}`)
        const finallyFilterCategory = await dispatch({
            type: FILTER_CATEGORY,
            payload: dataFilterCategory.data
        })
        return finallyFilterCategory
    } catch (error) {
        console.log("error", error)
    }
}

// export const filterForCollections = (id) => async dispatch => {
//     try {
//         const dataFilterCategory = await axios.get(`http://localhost:4000/filter/category/${id}`)
//         const finallyFilterCategory = await dispatch({
//             type: FILTER_CATEGORY,
//             payload: dataFilterCategory.data
//         })
//         return finallyFilterCategory
//     } catch (error) {
//         console.log("error", error)
//     }
// }

export const modificacionUser = (id, item) => async dispatch => {
    try {
        const modifUser = await axios.put(`http://localhost:4000/users/${id}`, item)
        dispatch({
            type: PUT_USER,
            payload: modifUser
        })
        console.log(modifUser)
        return modifUser
    } catch (error) {
        console.log('un error nuevo', error)
    }
    // return dispatch => {

    // }
}

export const removeNftQuery = () => dispatch => {
    dispatch({
        type: REMOVE_NFT_QUERY,
        payload: []
    })
}


export const removeUser = () => dispatch => {
    dispatch({
        type: REMOVE_USER,
        payload: {}
    })
}
