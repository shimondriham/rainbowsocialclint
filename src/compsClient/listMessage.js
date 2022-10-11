import React, { useEffect, useState } from 'react';
import InputEmoji from 'react-input-emoji'
import { reverse, sortBy } from 'lodash';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import { useSearchParams } from 'react-router-dom';

import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://localhost:3002";
const ENDPOINT = "https://rainbowsocial.herokuapp.com";
const socket = socketIOClient(ENDPOINT);

function ListMessage(props) {

    let { style } = props
    let { id } = props
    let { userObj } = props
    let { setArChat, arChat } = props
    const [text, setText] = useState('')
    let [searchParams] = useSearchParams()
    function handleOnEnter(text) {
        doAPiNewMessage(text)

    }
    let [loading, setLoading] = useState(false);
    const [response, setResponse] = useState([]);
    useEffect(() => {
        doApi();
    }, [style])

    useEffect(() => {
        socket.on("nodeJsEvent", (data) => {
            data.date_created=String(new Date(data.date_created).getHours()).padStart(2, '0')+":"+String(new Date(data.date_created).getMinutes()).padStart(2, '0');
            setResponse((pre) => [data]);
        });
        return () => socket.disconnect();
    }, [])
    const doApi = async () => {
        let url = API_URL + "/messages/userMessage/" + id
        if (searchParams.get('id') === id) {
            try {
                setLoading(true);
                let { data } = await doApiGet(url);
                let orderData = sortBy(data, ['date_created', '_id'])
                reverse(orderData);
                let temp= [...data];
                temp.forEach(element => {
                    element.date_created=String(new Date(element.date_created).getHours()).padStart(2, '0')+":"+String(new Date(element.date_created).getMinutes()).padStart(2, '0');
                    // console.log(element.date_created);
                });              
           
                setArChat(orderData);
                setLoading(false);

           


            } catch (error) {
                alert("error,come back later")
                console.log(error);
            }
        }
    }
    const doAPiNewMessage = async (text) => {
        let url = API_URL + "/messages/" + id
        let body = { Message: text }

        try {
            setLoading(true);
            let { data } = await doApiMethod(url, "POST", body);
            socket.emit("FromAPI", data.message)
            doApi()
            setLoading(false);
            // console.log(data);

        } catch (error) {
            alert("error,come back later")
            console.log(error);
        }
    }



    return (
        <div className=''>
            <div className="listMessage  p-2 " style={{ display: style }}>
                <button onClick={() => {
                    props.setStyle("none")
                    setResponse([]);
                }}
                    className='btnClose '><i className="fa fa-times-circle" aria-hidden="true"></i>
                </button>
                <div className='messageitem p-2 my-4 pb-4' >
                    <div className='nameMesssage'>~ {userObj[id]} ~</div>
                    {loading && <h1>Loading....</h1>}
                    <div id='scroll' className='itemlistMessage overflow-auto pr-5'>
                        <div>{response?.map((item, i) => (
                            <div key={i} className='mx-auto  '>
                                {id === item.sender_id &&
                                    <div className='float-end bg-info messageChat_item mt-3'>
                                        <span className=' fw-bolder text-danger' >{userObj[item.sender_id].toUpperCase()}</span><br />
                                        <span className=' ' >{item.Message}</span><br />
                                        {/* <span className=' fw-bolder spans' >{item.date_created.substring(11, 16)}</span><br /> */}
                                           <span className=' fw-bolder spans' >{item.date_created}</span><br />
                                        {/* <span className=' fw-bolder spans' >{new Date(item.date_created)}</span><br /> */}

                                    </div>}<br /></div>
                        ))}</div>
                        {arChat?.map((item, i) => {
                            return (
                                <div key={i} >
                                    <div className='mx-auto  messageChat m-3 '>
                                        {id === item.sender_id ?
                                            <div className='float-end bg-info messageChat_item '>
                                                <span className=' fw-bolder text-danger' >{userObj[item.sender_id].toUpperCase()}</span><br />
                                                <span className=' ' >{item.Message}</span><br />
                                                <span className=' fw-bolder spans' >{item.date_created}</span><br />


                                            </div> :
                                            <div id='resiver_div' className=' float-start  messageChat_item '>
                                                <span className='  fw-bolder text-danger' >{userObj[item.sender_id].toUpperCase()}</span><br />
                                                <span className='' >{item.Message}</span><br />
                                                <span className=' fw-bolder spans' >{item.date_created}</span><br />

                                            </div>}
                                    </div><br />

                                </div>
                            )
                        }

                        )}
                        <br />


                    </div>


                    <div className='emoji d-flex'>
                        <button onClick={() => {
                            handleOnEnter(text);
                            setText(" ")
                        }

                        } className='d-md-none btn btn-light my-2'><i className='fa fa-arrow-left ' aria-hidden="true"></i></button>
                        <InputEmoji className=""
                            value={text}
                            onChange={setText}
                            cleanOnEnter
                            onEnter={handleOnEnter}
                            placeholder="Type a message"
                        />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ListMessage