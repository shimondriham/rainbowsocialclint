import React, { useEffect, useState } from 'react'
import { AiTwotoneLike, AiOutlineLike, AiOutlineMessage } from 'react-icons/ai';
import { BiCommentDetail, BiCommentAdd } from 'react-icons/bi';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import { includes } from 'lodash'
import FormClient from './formClient';
import ItemComment from './itemComment';
import { useNavigate } from 'react-router-dom';
import InputEmoji from 'react-input-emoji'

// import Authclient from '../global_comps/authclient';
// import { checkTokenLocal } from '../services/localService';
// import { Link } from 'react-router-dom';

const ItemPost = (props) => {
    let users_ar = {};
    let item = props.item;
    const [user, setUser] = useState({});
    const [style, setStyle] = useState("none");
    const [styleForm, setStyleForm] = useState();
    const [likes, setlikes] = useState(item.likes?.length);
    const [flag, setflag] = useState(false);
    const [flag2, setflag2] = useState(true);
    const [flagMessage, setFlagMessage] = useState(false);
    let nav = useNavigate();
    let [userObj, setUserObj] = useState({});
    const [comments_ar, setCommentsAr] = useState([]);
    const [commensts_lenght, setCommensts_lenght] = useState(item.comments?.length);
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false);
    


    useEffect(() => {
        onLikes()
        doApi();
        doApiComments();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const onLikes = async () => {
        try {
            let url = API_URL + "/posts/likes/" + item._id
            let { data } = await doApiGet(url)
            setflag(data ? false : true)
            // console.log(data);
        } catch (error) {

            console.log(error);
        }
    }

    const doApiUserObj = async () => {
        try {
            let url2 = API_URL + "/users/all_users";
            let resp2 = await doApiGet(url2);
            let temp_ar = resp2.data;
            temp_ar.forEach(item => {
                users_ar[item._id] = item.name;
            })
            setUserObj(users_ar)
            // console.log(users_ar);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const doApi = async () => {
        try {
            let url = API_URL + '/users/userInfo/' + item.user_id
            let { data } = await doApiGet(url)
            setUser(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const onChangeStyle = async () => {
        setStyle(style === "block" ? "none" : "block");
        // doApiComments();
        // console.log(style);
    }

    const doApiComments = async () => {
        try {

            doApiUserObj();
            let url = API_URL + "/comments/" + item._id
            let { data } = await doApiGet(url);
            if (data.comments.length != comments_ar.length) {
                setCommentsAr(data.comments)
                setCommensts_lenght(data.comments.length)
                setflag2(false)
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const onLikesClick = async () => {
        try {
            let url = API_URL + "/posts/likes/" + item._id
            let { data } = await doApiMethod(url, "PATCH", {})
            setflag(includes(data.likes, data.user_id) ? false : true);
            setlikes(data.likes.length);
        } catch (error) {

            console.log(error);
        }

    }
    // function for the input for the new message
    function handleOnEnter(text) {
        setFlagMessage(false);
        doApiNewMessage(text);
        // nav("/?new_message")
        window.location.reload()
    }
    const doApiNewMessage = async (text) => {
        let url = API_URL + "/messages/" + item.user_id
        let body = { Message: text }

        try {
            setLoading(true);
            let { data } = await doApiMethod(url, "POST", body);
            doApi()
            setLoading(false);
            console.log(data);

        } catch (error) {
            alert("error,come back later")
            console.log(error);
        }
    }



    function relativeDays(timestamp) {
        const rtf = new Intl.RelativeTimeFormat('en', {
            numeric: 'auto',
        });
        const oneDayInMs = (1000 * 60 * 60 * 24)+1*(24*60*60*1000);
        const daysDifference = Math.round(
            (timestamp - new Date().getTime()) / oneDayInMs,
        );

        return rtf.format(daysDifference, 'day');
    }

    const [dateCreate, setDateCreat] = useState(relativeDays(new Date(item.date_created.substring(0, 10)).getTime()))



    return (
        <div className='item-post'>
          
            {/* <Authclient /> */}
            <div className='border my-3 shadow p-3  mx-5 itemPost'>
                <span className='text-muted'>{dateCreate}</span >
                <button className='btn float-end d-flex align-items-center namePost' onClick={(e) => {
                    // console.log(item.user_id);
                    nav("/profile/" + item.user_id)
                }}>
                    <h2 className='mx-2 '>{user.name}</h2>

                    <img className='imgName' width={50} src={user.gender === "man" ? "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" : user.gender === "female" ? "https://media.istockphoto.com/photos/female-portrait-icon-as-avatar-or-profile-picture-picture-id477333976?b=1&k=20&m=477333976&s=170667a&w=0&h=0MKAqzspB2Tcx7Yf42nYI0Pda9qK1oZap25Mru21K40=" : ""} alt="avatar" /> </button>

                <h2 className='mt-5'> {item.title}</h2>
                <h5 >{item.postMessage}</h5>
                {item.url_img?.length > 10 ?
                    <div className='w-75 my-3'><img className='imgPost col-12 col-md-auto' src={item.url_img} alt={item.title} /></div>


                    : ""}
                <div className='row itemPost_buttons_div'>
                    {flag ?
                        <button onClick={onLikesClick} className='col-2 col-md-auto btn'><AiOutlineLike /> {likes}</button>
                        :
                        <button onClick={onLikesClick} className='col-2 col-md-auto btn'><AiTwotoneLike /> {likes}</button>}
                    <button className='btn col-2 col-md-auto' onClick={onChangeStyle}>
                        <BiCommentDetail /> {commensts_lenght}</button>

                    <button className='btn col-2 col-md-auto' onClick={() => { setStyleForm(styleForm === "block" ? "none" : "block") }} >
                        <BiCommentAdd />
                    </button>
                    <button
                    title='Back in private'
                    onClick={()=>{
                        setFlagMessage((pre)=>pre?false:true);
                     
                    }} 
                    className='btn col-2 col-md-auto'>
                        <AiOutlineMessage />
                    </button>

                </div>

                <div>
                    <p>{item.date_created.substring(0, 10)}   {item.date_created.substring(12, 16)}</p>
                </div>

                {comments_ar?.length > 0 ?
                    <div style={{ display: style }} >
                        {comments_ar.map((item, i) => (
                            <ItemComment key={item._id} item={item} user={user} userObj={userObj} />
                        ))}
                    </div> : ""}

                <FormClient doApiComments={doApiComments} styleForm={styleForm} setStyleForm={setStyleForm} PostId={item._id} />

              {flagMessage&&<div className='emoji'>
                    <InputEmoji
                        value={text}
                        onChange={setText}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder="Type a message"
                    />

                </div>}


            </div>
        </div>
    )
}

export default ItemPost