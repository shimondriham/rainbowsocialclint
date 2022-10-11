import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiService';
import InputEmoji from 'react-input-emoji'
// import Emojy from './emojy';


const FormClient = (props) => {

    const [text, setText] = useState('')
    function handleOnEnter(text) {
        console.log('enter', text)
     

    }

        let { register, handleSubmit, formState: { errors } } = useForm();
    let img_urlRef = register("url_img", {
        required: false,
    })
    const onSubForm = (data) => {

        data.info_comment = text
        // console.log(data);
        doApi(data)
        props.setStyleForm("none")
    }
    const doApi = async (body) => {
        try {
            let url = API_URL + "/comments/" + props.PostId
            let { data } = await doApiMethod(url, "POST", body)

            // console.log(data);

            if (data.postUpdate.modifiedCount == 1) {
                toast("you added comment")
                props.doApiComments()
            }

        } catch (error) {
            console.log(error.response.data);
        }

    }

    return (
        <React.Fragment>

            <div style={{ display: props.styleForm }} className='form_client '>
                <button onClick={() => {
                    props.setStyleForm("none")
                }} className='close-btn btn'><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                <form onSubmit={handleSubmit(onSubForm)} className='form_clientB w-50 mx-auto p-3 '>

                    <div className="mb-3 mt-4">
                        <label className="form-label">Comment Message</label>
                     
                        <InputEmoji
                       
                            value={text}
                            onChange={setText}
                            cleanOnEnter
                            onEnter={handleOnEnter}
                            placeholder="Type a message"
                        />
                        {errors.info_comment && <span className="text-danger">Enter valid Message required*</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">URL Img</label>
                        <input  {...img_urlRef} type="text" className="form-control" />
                        {errors.url_img && <span className="text-danger">Enter valid url image required*</span>}
                    </div>
                    <button className='btn btn-info'>Send</button>
                </form>

            </div>
        </React.Fragment>

    )
}

export default FormClient