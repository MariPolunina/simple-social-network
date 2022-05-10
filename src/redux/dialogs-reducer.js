const ADD_MESSAGE = 'redux/dialogs-reducer/ADD-MESSAGE';
const ADD_NEW_DIALOG = 'redux/dialogs-reducer/ADD-NEW-DIALOG';
const ADD_NEW_MESSAGE = 'redux/dialogs-reducer/ADD-NEW-MESSAGE';
const ADD_NEW_INFO = 'redux/dialogs-reducer/ADD-NEW-INFO';
const NEW_CURRENT_PAGE = 'redux/dialogs-reducer/NEW-CURRENT-PAGE';
const SET_FETCHING = 'redux/dialogs-reducer/SET-FETCHING';

let initialState = {
    dialogs: [
        { id: 23529, name: 'PleaseHold1231', urlAvatr: null },
        { id: 23522, name: 'bukadp', urlAvatr: null },
        { id: 23489, name: 'Pigmentor', urlAvatr: null },
        { id: 23268, name: 'Danya_Sokol2', urlAvatr: "https://social-network.samuraijs.com/activecontent/images/users/23268/user-small.jpg?v=1" }
    ],
    messages:
    {
        '23529': [
            { id: 1, message: 'Hello, I like JacaScript', fromMe: true },
            { id: 2, message: 'Hello! Nice to meet you. I like it too', fromMe: false },
            { id: 3, message: 'Do you like use VS?', fromMe: true },
            { id: 4, message: 'Yes, I do', fromMe: false },
            { id: 5, message: 'Hello, I like JacaScript', fromMe: true },
            { id: 6, message: 'Hello! Nice to meet you. I like it too', fromMe: false },
            { id: 7, message: 'Do you like use VS?', fromMe: true },
            { id: 8, message: 'Yes, I do', fromMe: false },
            { id: 9, message: 'Hello, I like JacaScript', fromMe: true },
            { id: 10, message: 'Hello! Nice to meet you. I like it too', fromMe: false },
            { id: 11, message: 'Do you like use VS?', fromMe: true },
            { id: 12, message: 'Yes, I do', fromMe: false },
            { id: 13, message: 'Hello, I like JacaScript', fromMe: true },
            { id: 14, message: 'Hello! Nice to meet you. I like it too', fromMe: false },
            { id: 15, message: 'Do you like use VS?', fromMe: true },
            { id: 16, message: 'Yes, I do', fromMe: false },
            { id: 17, message: 'Hello, I like JacaScript', fromMe: true },
            { id: 18, message: 'Hello! Nice to meet you. I like it too', fromMe: false },
            { id: 19, message: 'Do you like use VS?', fromMe: true },
            { id: 20, message: 'Yes, I do', fromMe: false },
            { id: 21, message: 'Hello, I like JacaScript', fromMe: true },
            { id: 22, message: 'Hello! Nice to meet you. I like it too', fromMe: false },
            { id: 23, message: 'Do you like use VS?', fromMe: true },
            { id: 24, message: 'Yes, I do', fromMe: false },
            { id: 25, message: 'Hello! Nice to meet you. I like it too', fromMe: false },
            { id: 26, message: 'Do you like use VS?', fromMe: true },
            { id: 27, message: 'Yes, I do', fromMe: false },
            { id: 28, message: 'Hello, I like JacaScript', fromMe: true },
            { id: 29, message: 'Hello! Nice to meet you. I like it too', fromMe: false },
            { id: 30, message: 'Do you like use VS?', fromMe: true },
            { id: 31, message: 'Yes, I do', fromMe: false },
        ],
        '23522': [
            { id: 1, message: 'Hi. What are you doing at night today?', fromMe: true },
            { id: 2, message: 'I want to watch sometning', fromMe: true }
        ],
        '23489': [
            { id: 1, message: 'I like your new dress', fromMe: true },
            { id: 2, message: 'I bought it in H&M', fromMe: false },
            { id: 3, message: 'I like it too', fromMe: false }
        ],
        '23268': [
            { id: 1, message: 'I am tired. I think about some vacation', fromMe: true },
            { id: 2, message: 'Where would you like to come?', fromMe: false },
            { id: 3, message: 'Maybe, USA', fromMe: false }
        ]
    },
    pageSize: 10,
    currentPage: 1,
    isFetching: false
};
export default function dialogReducer(state = initialState, action = { type: '' }) {
    switch (action.type) {
        case ADD_MESSAGE:
            return (
                {
                    ...state,
                    messages: {
                        ...state.messages,
                        [action.idDialog]: [...state.messages[action.idDialog], { id: state.messages[action.idDialog].length + 1, message: action.message, fromMe: true }]
                    }
                }
            )
        case ADD_NEW_INFO:
            if (state.dialogs.filter(item => item.id == action.idUser).length == 0) {
                return (
                    {
                        ...state,
                        dialogs: [
                            ...state.dialogs, { id: action.idUser, name: action.name, urlAvatr: action.urlAvatr }
                        ],
                        messages: {
                            ...state.messages,
                            ...{ [action.idUser]: [{ id: 1, message: action.textMessage, fromMe: true }] }
                        }
                    }
                )
            }
            else {
                return (
                    {
                        ...state,
                        messages: {
                            ...state.messages,
                            [action.idUser]: [...state.messages[action.idUser], { id: state.messages[action.idUser].length + 1, message: action.textMessage, fromMe: true }]
                        }
                    }
                )
            }
        case NEW_CURRENT_PAGE:
            return (
                {
                    ...state,
                    currentPage: action.newCurrentPage
                }
            )
        case SET_FETCHING:
            return({
                ...state,
                isFetching:action.valueFetching
            })
        default: return state;
    }
}

export const addMessageActionCreator = (message, idDialog) => {
    return { type: ADD_MESSAGE, message, idDialog };
};
export const addNewDialog = (id, name, urlAvatr) => {
    return { type: ADD_NEW_DIALOG, id, name, urlAvatr }
}
export const addNewMessage = (idUser, textMessage) => {
    return { type: ADD_NEW_MESSAGE, idUser, textMessage }
}
export const addNewInfo = (idUser, textMessage, name, urlAvatr) => {
    return { type: ADD_NEW_INFO, idUser, textMessage, name, urlAvatr }
}
export const changeCurrentPage = (newCurrentPage) => {
    return { type: NEW_CURRENT_PAGE, newCurrentPage }
}
export const setFetching = (valueFetching) => {
    return { type: SET_FETCHING, valueFetching }
}