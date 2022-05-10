import React, { useEffect, useState } from 'react';
import Style from './Dialog.module.scss'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Form, Field } from 'react-final-form'
import { Link, useParams } from 'react-router-dom';
import send from '../../assets/images/send.png'
import classNames from "classnames";
import { useDispatch, useSelector } from 'react-redux';
import { addMessageActionCreator, setFetching } from '../../redux/dialogs-reducer';
import Pages from '../Users/UserItem/Pages/Pages';
import goBack from '../../assets/images/goBack.png'

const infoHowToShow = {
    sizePortion: 10,
    decreaseIncrease: 5
}

let cx = classNames.bind(Style)
function MessageForm(props) {
    return (
        <Form onSubmit={props.submit} render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit} className={Style.formArea}>
                <Field name={`message${props.idDialog}`} component={TextareaMessage} />
                <button type="submit" className={Style.addMessage} disabled={submitting || pristine}> <img src={send} /> </button>
            </form>
        )}
        />
    );
}

function TextareaMessage({ input, ...props }) {
    return (<textarea {...input} rows={3} className={Style.textareaMessage}></textarea>)
}

export default function Dialogs(props) {
    const [dialogData, setDialogData]=useState([]);
    useEffect(() => {
        let minItem = (props.currentPage - 1) * props.pageSize;
        let maxItem = props.pageSize * props.currentPage < props.dialogs.length ? props.pageSize * props.currentPage : props.dialogs.length;
        let pageDialogsItem=[];
        for (let i = minItem; i < maxItem; i++) {
            pageDialogsItem.push(<DialogItem name={props.dialogs[i].name} id={props.dialogs[i].id} key={props.dialogs[i].id} urlAvatr={props.dialogs[i].urlAvatr} />);
        }
        setDialogData(pageDialogsItem);
    }, [props.dialogs, props.pageSize, props.currentPage]);
    return (
        <div className={Style.colorDiv}>
            <div className={Style.dialogColumn}>
                <h2>Dialogs</h2>
                <ul className={Style.listName}>
                    {dialogData}
                </ul>
                <Pages infoHowToShow={infoHowToShow} currentPage={props.currentPage} totalCount={props.dialogs.length} pageSize={props.pageSize} handlePageChange={(item) => props.changeCurrentPage(item)} />
            </div>
        </div>
    );
}

export function MessagesItem(props) {
    const dispatch = useDispatch();
    const messages = useSelector(state => {
        return state.messagesPage.messages;
    })
    const dialogs = useSelector(state => {
        return state.messagesPage.dialogs;
    });
    const isFetching = useSelector(state => {
        return state.messagesPage.isFetching;
    });
    const { idDialog } = useParams();
    const [messagesElements, setMessagesElements]=useState(<div>The dialog doesn't exist</div>);
    const [nameOfDialog, setNameOfDialog]=useState('');
    const [showForm, setShowForm] = useState(false);
    useEffect(()=>{
        if (messages[idDialog] != undefined) {
           let  newMessagesElements = messages[idDialog].map((item) => <Message message={item.message} key={item.id} fromMe={item.fromMe} />);
           let newNameOfDialog = dialogs.filter(item => item.id == idDialog)[0].name;
           setMessagesElements(newMessagesElements);
           setNameOfDialog(newNameOfDialog);
            if (!showForm) setShowForm(true);
        }
    }, [messages]);
    const handleClick = (values) => {
        if (values[`message${idDialog}`].length > 1) {
            dispatch(addMessageActionCreator(values[`message${idDialog}`], idDialog));
            values[`message${idDialog}`] = "";
        }
    };
    return (
        <div className={Style.messageColumnContainer}>
            <div className={Style.messageColumn}>
                <div className={Style.headMessageColumn}>
                    <div className={Style.upperRow}>
                        <Link to='/dialogs' className={Style.goBack}>
                            <img src={goBack} />
                        </Link>
                    <h2>Messages</h2>
                    </div>
                    <Link to={`/profile/${idDialog}`} className={Style.profileName}  >
                        <h3>{nameOfDialog}</h3>
                    </Link>
                </div>
                <AllMessages idDialog={idDialog} messagesElements={messagesElements} isFetching={isFetching} />
                {showForm && <MessageForm submit={handleClick} idDialog={idDialog} />}
            </div>
        </div>
    )
}


function AllMessages(props) {
    const dispatch = useDispatch();
    let meRef = React.createRef();

    useEffect(() => {
        dispatch(setFetching(true));
        meRef.current.scrollTo(0, meRef.current.scrollHeight);
        dispatch(setFetching(false));
    }, [])

    useEffect(() => {
        meRef.current.scrollTo(0, meRef.current.scrollHeight);
    }, [props.messagesElements]);

    return (
        < div className={props.isFetching ? cx(Style.hidden, Style.messagesForm) : Style.messagesForm} ref={meRef} >
            <ul className={Style.listMessages}>
                {props.messagesElements}
            </ul>
        </div >
    )
}