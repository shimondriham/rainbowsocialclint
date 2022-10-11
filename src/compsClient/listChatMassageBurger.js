import { reverse } from 'lodash';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Authclient from '../global_comps/authclient';

import { API_URL, doApiGet } from '../services/apiService';
// import { checkTokenLocal } from '../services/localService';
import ListMessage from './listMessage';
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:3002";

function ListChatMessageBurger(props) {
    let users_ar = {};
    let [arChat, setArChat] = useState([]);
    let [id, setId] = useState();
    let [ar, setAr] = useState([]);
    const nav = useNavigate()
    let [loading, setLoading] = useState(false);
    let [userObj, setUserObj] = useState({});
    const [style, setStyle] = useState("none")


    useEffect(() => {
        doApiUserObj();
        doApi()
     
    }, [])

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
        let url = API_URL + "/messages/MyChat"
        try {
            setLoading(true);
            let { data } = await doApiGet(url);
            reverse(data);
            setAr(data);
            setLoading(false);


        } catch (error) {
            alert("error,come back later 222")
            console.log(error);
        }
    }

    return (
        <div className=' pt-5 '>
            <div className="listChatMessag1 row ">
                <div className="mx-5 " style={{ display: "block", justifyContent: "center" }}  >
                    {/* <Authclient /> */}
                    <div className=' ChatMessageBox mt-5 ' >

                      <h2  className='mx-2 '>
                      <span className='welcome ms-5 r'>R</span>
                        <span className='welcome a'>a</span>
                        <span className='welcome i'>i</span>
                        <span className='welcome n'>n</span>
                        <span className='welcome b'>b</span>
                        <span className='welcome o'>o</span>
                        <span className='welcome w me-3'>w</span>
                        <span className='welcome  '>chat </span>
                        </h2>

                        <div className='ChatMessageBurger p-2  mt-5 ' >
                            {loading ? <h1>Loading....</h1> : ""}
                            {ar.map((item, i) => {
                                return (

                                    <div key={i} className="bg-light p-2 " >
                                        <h2><button className='btn  w-100 btnMesssage shadow' onClick={() => {
                                            setStyle("flex")
                                            nav("/listChatMessageBurger/?id=" + item)
                                            setId(item)
                                        }}>~ {userObj[item]} ~
                                        </button>
                                        </h2>

                                    </div>
                                )
                            }
                            )}
                            <ListMessage
                                userObj={userObj}
                                arChat={arChat}
                                setArChat={setArChat}
                                setStyle={setStyle}
                                style={style}
                                id={id}

                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListChatMessageBurger