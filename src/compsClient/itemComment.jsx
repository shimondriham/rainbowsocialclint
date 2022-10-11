import React, { useEffect, useState } from 'react'
// import { includes , map, pick} from 'lodash';
import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import { checkTokenLocal } from '../services/localService';


function ItemComment(props) {

    let item = props.item;
    let userObj = props.userObj;
    const [likes, setlikes] = useState(item.likes?.length);
    const [flagComment, setflagComment] = useState(false);
    let nav = useNavigate();


    useEffect(async () => {
        //   console.log(userObj);
        if (checkTokenLocal()) {

            onLikes()
        }
    }, [])
    const onLikes = async () => {
        try {
            let url = API_URL + "/comments/likes/" + item._id
            let { data } = await doApiGet(url)
            setflagComment(data ? false : true)
            // console.log(data,4444);
        } catch (error) {

            console.log(error);
        }
    }




    const onLikesCommentClick = async () => {

        try {

            let url = API_URL + "/comments/likes/" + item._id
            let { data } = await doApiMethod(url, "PATCH", {})
            // console.log(data.likes_ar);
            setflagComment(data.likes_ar.length === 1 ? false : true)
            setlikes(data.likes_ar.length)
        } catch (error) {

            console.log(error.response);
        }

    }
    return (
        <React.Fragment  >
            <div className='border m-3 shadow  p-3 itemPost'>
                <button className='btn float-end d-flex align-items-center namePost' onClick={(e) => {
                    nav("/profile/" + item.user_id)
                }}> <h5 className='fw-bolder mx-2  namePost'>{userObj[item.user_id]}</h5>  </button>
                <p className=' '> {item.creatDate.substring(0, 10)} {item.creatDate.substring(12, 16)}</p>


                <h5 >{item.info_comment}</h5>
                {flagComment ?
                    <button onClick={onLikesCommentClick} className='col-md-auto btn'><AiOutlineLike /> {likes}</button>
                    :
                    <button onClick={onLikesCommentClick} className='col-md-auto btn'><AiTwotoneLike /> {likes}</button>}
            </div>
        </React.Fragment>
    )
}

export default ItemComment