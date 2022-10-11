import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiService';
import {clientContext} from '../context/contextClient';

// import Select from 'react-select'




function AddPost(props) {
    let {search,setSearch}  = useContext(clientContext)
 

    // for disabled the send btn for avoid multi click on him
    let [btnSend, setBtnSend] = useState(false)

    let nav = useNavigate()
    let { register, handleSubmit, formState: { errors } } = useForm();

    let titleRef = register("title", { required: true, minLength: 2, maxLength: 99 })
    let url_titleRef = register("url_title", { required: true, minLength: 2, maxLength: 99 })
    let postMessageRef = register("postMessage", { required: true, minLength: 1, maxLength: 999 })
    let img_urlRef = register("url_img", { required: false, minLength: 3, maxLength: 999 })


    const onSubForm = (formData) => {
        setBtnSend(true);
        doFormApi(formData);
        
    }

    const doFormApi = async (formData) => {
        let url = API_URL + "/posts";
        try {
            let resp = await doApiMethod(url, "POST", formData);
            // console.log(resp.data.post._id);
            
            if (resp.data.post._id) {
                toast("Posts added");
                nav("/home")

            }
        }
        catch (err) {
            console.log(err.response);
            alert("There problem try again later")
            nav("/")
        }
    }
    return (
        <div className='container-fluid addPost '>
        <div className='container'>
            <div style={{ height: "50px" }}>
            </div>
            <h1 className='mt-5 mx-1'>Add new post</h1>
            <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow addPostform'>   
                <div>
               <label>Img url</label>  <Link to="/searchpic" className='badge bg-info' > For Img Url Click Here</Link>
                <input defaultValue={search} {...img_urlRef} type="text" className='form-control my-2' />
                {errors.img_url ? <small className='text-danger d-block'>* Enter valid  img url </small> : ""}
               </div>
               <label>title:</label>
                <input {...titleRef} type="text" className='form-control' />
                {errors.title ? <small className='text-danger d-block'>* Enter valid titel 2 to 99 chars</small> : ""}

                <label>url_title:</label>
                <input {...url_titleRef} type="text" className='form-control' />
                {errors.url_title ? <small className='text-danger d-block'>* Enter valid url_title 2 to 99 chars</small> : ""}

                <label>post Message:</label>
                <textarea {...postMessageRef} className='form-control' rows="3"></textarea>
                {errors.postMessageRef ? <small className='text-danger d-block'>* Enter valid post Message, 3 to 500 chars</small> : ""}
              
            

                <button className='btn btn-outline-dark mt-2' disabled={btnSend}>Add new product</button>
            </form>

        </div>
        </div>
    )
}

export default AddPost