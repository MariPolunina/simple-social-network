import dialogReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";


let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi, How are you?', likesCount: 12 },
        { id: 2, message: 'It is my new post', likesCount: 21 },
        { id: 3, message: 'VS is cool', likesCount: 1 },
        { id: 4, message: 'Are you sure', likesCount: 5 },
        { id: 5, message: 'VS is not cool. I like WebStorm', likesCount: 1 }
      ],
      newPostText: 'Hello, world'
    },
    messagesPage: {
      newMessageText:'Hello',
      dialogs: [
        { id: 1, name: 'Sveta' },
        { id: 2, name: 'Misha' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Viktoria' },
        { id: 5, name: 'Dima' },
        { id: 6, name: 'Mariana' }
      ],
      messages: [
        { id: 1, message: 'Hello, I like JacaScript' },
        { id: 2, message: 'Hello! Nice to meet you. I like it too' },
        { id: 3, message: 'Do you like use VS?' },
        { id: 4, message: 'I dont know' }
      ]
    }
  },
  getState() {
    return this._state;
  },
  rerenderEntireTree() {
    console.log('state not changed');
  },
  subscribe(observer) {
    this.rerenderEntireTree = observer;
  },
  dispatch(action) {
    this._state.profilePage=profileReducer(this._state.profilePage, action);
    this._state.messagesPage=dialogReducer(this._state.messagesPage, action);
    this.rerenderEntireTree(this._state);
  }
}
export default store;

