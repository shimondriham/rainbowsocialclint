import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doApiGet } from '../services/apiService';

function PageLinks(props) {
  const nav = useNavigate();
  const [pages, setPages] = useState(0)
  const [amount, setAmonut] = useState(0)

  useEffect(() => {
    doApi()
  }, [])


  // Check how many pages there are
  const doApi = async () => {
    let url = props.apiUrlAmount;
    let resp = await doApiGet(url);
    setAmonut(resp.data.amount)
    setPages(Math.ceil(resp.data.amount / props.perPage));
  }


  return (

    <div className='my-3'>
      {amount > 5 ?
        <div>
          <span>page: </span>
          {/* createa array from number var that we can do map/loop on him  */}
          {[...Array(pages)].map((item, i) => {
            return (
              <button key={i} className={props.clsCss} onClick={() => {
                nav(props.urlLinkTo + "?page=" + (i + 1))
              }}>{i + 1}</button>
            )
          })}
        </div> : ""}

    </div>
  )
}

export default PageLinks