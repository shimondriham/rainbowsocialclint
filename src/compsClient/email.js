
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../global_comps/loading';
import { API_URL, doApiMethod } from "../services/apiService"

const Email = () => {
    let [flag,setFlag] =useState(false);
    let [loading,setLoading] =useState(false);
    let { register, handleSubmit, formState: { errors } } = useForm();
    const nav=useNavigate();
    const onSubForm = async (data) => {
      console.log(data)
      let url = API_URL + "/contact";
      try {
        setFlag(true)
        setLoading(true)
        let resp = await doApiMethod(url, "POST", data);
        setLoading(false)
        console.log(resp.data)
        if (resp.data.status === "ok") {
          toast.success("Email sended")
            nav("/home")
        }
        else {
          setFlag(false)
            toast.error("There problem , try again later")
        }
      }
      catch(err){
        setFlag(false)
        console.log(err)
        alert("There problem , try again later 2")
      }
    }
  
    let nameRef = register("name", { required: true, minLength: 3 })
    let msgRef = register("msg", { required: false, minLength: 3 })
    let emailRef = register("email", {
      required: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    })
  
  
    return (
      <div className='container pt-5 contact' style={{height:"100vh"}}>
        {loading && <Loading/>}
        <h1 className='text-center pt-5 '>Contact us:</h1>
        <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 mx-auto p-3 '>
          <label>Name:</label>
          <input {...nameRef} type="text" className='form-control' />
          {errors.name ? <small className='text-danger d-block'>Enter valid name, 3 chars min</small> : ""}
          <label>Your Email:</label>
          <input {...emailRef} type="text" className='form-control' />
          {errors.email ? <small className='text-danger d-block'>Enter valid Email</small> : ""}
          <label>Message:</label>
          <textarea {...msgRef} className='form-control'></textarea>
          {errors.msg ? <small className='text-danger d-block'>Enter valid message, 3 chars min</small> : ""}
          <button className='btn btn-outline-dark mt-2' disabled={flag}>Send</button>
        </form>
      </div>
    )
  
}

export default Email



