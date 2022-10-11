import axios from "axios";

// export const API_URL = "http://localhost:3002";
export const API_URL = "https://rainbowsocial.herokuapp.com";

export const doApiGet = async (_url) => {
  try {
    let data = await axios.get(_url, {
      headers: {
        'x-api-key': localStorage["token_social"],
        'content-type': "application/json"
      }
    });
    return data;
  }
  catch(err){
    // console.log(err,2222);
    console.log(err.response.data);
    throw err
  }
}

export const doApiMethod = async (_url,_method,_body) => {
    try {
      let data = await axios({
        method:_method,
        url:_url,
        data: JSON.stringify(_body),
        headers:{
          'x-api-key': localStorage["token_social"],
          'content-type': "application/json"
        }
      });
      return data;
    }
    catch(err){
      console.log(err.response);
      console.log(err,3333);
      throw err
    }
  }