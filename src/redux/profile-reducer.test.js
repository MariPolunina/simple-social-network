import profileReducer, { addPostActionCreator, deletePostAC } from "./profile-reducer";

let initialState = {
    posts: [
        { id: 1, message: 'Hi, How are you?', likesCount: 12 },
        { id: 2, message: 'It is my new post', likesCount: 21 },
        { id: 3, message: 'VS is cool', likesCount: 1 },
        { id: 4, message: 'Are you sure', likesCount: 5 },
        { id: 5, message: 'VS is not cool. I like WebStorm', likesCount: 1 }
    ]
}
test('new post should be added', () => {
    //1. test data
    let action= addPostActionCreator('Hello, world!!');
    //2.action
    let newState=profileReducer(initialState, action);
    //3.expectation
    expect(newState.posts.length).toBe(6);
});

test('the post should be deleted', () => {
    //1. test data
    let action= deletePostAC(3);
    //2.action
    let newState=profileReducer(initialState, action);
    //3.expectation
    expect(newState.posts.length).toBe(4);
});


