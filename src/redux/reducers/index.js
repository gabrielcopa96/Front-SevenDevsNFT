import {
    SET_MODAL,
    GET_ALL_NFT,
    GET_TOKEN,
    REMOVE_USER,
    GET_NFT_QUERY,
    REMOVE_NFT_QUERY,
    GET_ALL_COLLECTIONS,
    FILTER_NFT,
    PUT_USER,
    PUT_LIKES,
    CREATE_NFT,
    GET_CATEGORY,
    GET_CURRENCIES,
    GET_FILES_TYPE,
    GET_SALES_TYPE,
    FILTER_CATEGORY,
    CATEGORY_FILTER,
    DELETE_NFT,
    GET_USERS,
    CURRENCY_FILTER,
    SALES_FILTER,
    FILE_FILTER,
    CREATE_CATEGORY,
    CREATE_CURRENCIES,
    CREATE_SALES_TYPES,
    PUT_NFT,
    UPDATE_IMAGE_NFT,
    UPDATE_IMAGE_USER,
    SEARCHBAR_FILTER,
    POST_COLLECTIONS,
    GET_TRANSACTIONS,
    FILTER_CONTRACT_TOKEN,
    UPDATE_WALLET,
    PUT_NFT_SALE_TYPES,
    DELETE_COLLECTIONS,
    GET_TRANS_ID
} from "../actions";


const initialState = {
    // isOpen: true,
    nfts: [],
    copynft: [],
    nftquery: [],
    hasMore: true,
    isLogged: false,
    user: {},
    collections: [],
    users: [],
    filterNfts: [],
    nft: {},
    category: [],
    sales_type: [],
    files_type: [],
    currencies: [],
    img: "",
    open: false,
    transactions: [],
    transactionsid: [],
    contract: [],
    contrato: null
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODAL:
            return { ...state, open: action.payload }
        case GET_ALL_NFT:
            return { ...state, nfts: action.payload, copynft: action.payload }
        case GET_TOKEN:
            return { ...state, user: action.payload.usuario, isLogged: true }
        case REMOVE_USER:
            return { ...state, user: action.payload, isLogged: false }
        case GET_NFT_QUERY:
            var setHasMore;
            if (state.nftquery.length) {
                setHasMore = action.payload.length !== 0 ? true : false
            } else {
                setHasMore = false
            }
            const unionPrueba = state.nftquery.concat(action.payload)
            return {
                ...state,
                hasMore: setHasMore,
                nftquery: state.hasMore !== true ? state.nftquery : unionPrueba
            }
        case REMOVE_NFT_QUERY:
            return {
                ...state,
                nftquery: [],
                hasMore: true
            }
        case UPDATE_WALLET:
            return {
                ...state,
                user: {...state.user, wallet: action.payload}
            }
        case GET_TRANS_ID:
            return {
                ...state,
                transactionsid: action.payload
            }
        case UPDATE_IMAGE_NFT:
            return {
                ...state,
                img: action.payload
            }
        case GET_ALL_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        case GET_TRANSACTIONS:
            return {
                ...state, transactions: action.payload
            }
        case FILTER_NFT:
            const nftsAll = state.nfts

            const filters = nftsAll.filter(n => n.collection_nft && n.collection_nft.name === action.payload)

            return {
                ...state,
                filterNfts: filters
            }

        case PUT_NFT_SALE_TYPES:
            const obj2 = []
            state.nfts.forEach(x => {
                if (x._id === action.payload._id) {
                    x.sales_types._id = action.payload.sales_types
                }
                obj2.push(x)
            })
            console.log(action.payload)
            return {
                ...state,
                nfts: obj2,
                copynft: obj2
            }
        case FILTER_CONTRACT_TOKEN:
            return {
                ...state,
                contrato: action.payload
            }

        case REMOVE_NFT_QUERY:
            return {
                ...state,
                nftquery: [],
                hasMore: true
            }
        case PUT_USER:
            const username = action.payload.data
            return {
                ...state,
                user: username
            }
        case PUT_NFT:
            const modnft = action.payload
            return {
                ...state,
                nft: { ...state.nft, modnft }
            }
        case PUT_LIKES:
            const objFav = []
            state.nfts.forEach(x => {
                if (x._id === action.payload.nft._id) {
                    x.likes = action.payload.nft.likes
                }
                objFav.push(x)
            })
            const miNewNft = action.payload.nft
            const actFav = state.user.favorite
            const intFav = () => {
                if (actFav.some(x => x._id === action.payload.nft._id)) {
                    return actFav.filter(x => x._id !== action.payload.nft._id)
                }
                return [...actFav, miNewNft]
            }
            return {
                ...state,
                nfts: objFav,
                user: { ...state.user, favorite: intFav() }
            }
        case CREATE_NFT:
            console.log(action.payload)
            return {
                ...state,
                nfts: [...state.nfts, action.payload],
                copynft: [...state.copynft, action.payload]
            }
        case POST_COLLECTIONS:
            // console.log(action.payload)
            const mycoll = action.payload
            return {
                ...state,
                collections: [...state.collections, action.payload],
                user: {...state.user, collection_nft: [...state.user.collection_nft, mycoll]}
            }
        case DELETE_COLLECTIONS:
            console.log(action.payload)
            const filterDeleteCollection = state.collections.filter(x => x._id !== action.payload._id)
            const filterDeleteUserCollection = state.user.collection_nft.filter(x => x._id !== action.payload._id)
            return {
                ...state,
                collections: filterDeleteCollection,
                user: {...state.user, collection_nft: filterDeleteUserCollection}
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                category: [...state.category, action.payload]
            }
        case CREATE_CURRENCIES:
            return {
                ...state,
                currencies: [...state.currencies, action.payload]
            }
        case CREATE_SALES_TYPES:
            return {
                ...state,
                sales_type: [...state.sales_type, action.payload]
            }
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case GET_CURRENCIES:
            return {
                ...state,
                currencies: action.payload
            }
        case GET_SALES_TYPE:
            return {
                ...state,
                sales_type: action.payload
            }
        case GET_FILES_TYPE:
            return {
                ...state,
                files_type: action.payload
            }
        case FILTER_CATEGORY:
            return {
                ...state,
                nftquery: action.payload,
                hasMore: false
            }
        case DELETE_NFT:
            const filterDelete = state.nfts.filter(x => x._id !== action.payload._id)
            return {
                ...state,
                nfts: filterDelete
                // nft: action.payload
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload.users
            }
        case UPDATE_IMAGE_USER:
            const profile = action.payload
            return {
                ...state,
                user: { ...state.user, image: profile }
            }
        case SEARCHBAR_FILTER:
            return { ...state, nftquery: action.payload }
        case CATEGORY_FILTER:
            return { ...state, nftquery: action.payload, hasMore: false }
        case SALES_FILTER:
            return { ...state, nftquery: action.payload, hasMore: false }
        case FILE_FILTER:
            return { ...state, nftquery: action.payload, hasMore: false }
        case CURRENCY_FILTER:
            return { ...state, nftquery: action.payload, hasMore: false }
        default: return state
    };
};
export default rootReducer;