import React, { useState } from "react";
import Style from './MyPosts.module.scss'
import Post from "./Post/Post";
import { Form, Field } from 'react-final-form'
import { Textarea } from "../../common/FormsControls/FormsControls";
import { useDispatch ,useSelector } from "react-redux";


function PutPostForm(props) {
    const handleChange = (event) => {
        props.setLengthMessage(event.target.value.length)
    }
    const lengthMessage=props.lengthMessage;
    return (
        <Form onSubmit={props.onSubmit} render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit} className={Style.formArea} onChange={handleChange} >
                <Field name="message" component={Textarea} />
                {props.somethingWrong && <p>Some word is too long. Make it less than 50 symbols</p>}
                <p className={lengthMessage>280? Style.attentionLength:''} >{lengthMessage}/300</p>
                <button type="submit" disabled={submitting || pristine} >Add post</button>
            </form>
        )}
        />
    );
}

const MyPosts = (props) => {
    let [somethingWrong, setSomethingWrong] = useState(false);
    const [lengthMessage, setLengthMessage] = useState(0);
    const myLogin=useSelector((state)=>{
        return state.auth.login
    });
    let postsElements = props.posts.map((item) => <Post message={item.message} likes={item.likesCount} key={item.id} sender={item.sender} changeLikeCount={props.changeLikeCount} id={item.id} iLike={item.iLike} />);

    const handleClick = (values) => {
        let stringPost = values.message.split(/\W/);
        if (stringPost.every(item => item.length < 50)) {
            if (somethingWrong) {
                setSomethingWrong(false);
            }
            if (values.message.length != 0) {
                props.addPost(values.message, myLogin);
                values.message = '';
                setLengthMessage(0);
            }
        }
        else {
            setSomethingWrong(true);
        }
    };
    return (
        <div className={Style.myposts}>
            <h2 className={Style.hStyle}>My posts</h2>
            <PutPostForm lengthMessage={lengthMessage} setLengthMessage={setLengthMessage} onSubmit={handleClick} somethingWrong={somethingWrong} />
            <div>
                <h2 className={Style.hStyle}>Posts</h2>
                {postsElements}
            </div>
        </div>
    );
}
export default React.memo(MyPosts);