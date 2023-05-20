import React, { useReducer, useState } from "react";
import "./Add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import {useNavigate} from 'react-router-dom'

const Add = () => {

  const [singleFile, setSingleFile] = useState(undefined)

  const [files, setFiles] = useState([])

  const [uploading, setUploading] = useState(false)

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE)

  const navigate = useNavigate()

  const handleChange = (e) => {

  dispatch({

    type: "CHANGE_INPUT",

    payload: {

      name: e.target.name,
      value: e.target.value

    }

  })

 }

 const handleFeature = (e) => {

  e.preventDefault()

  dispatch({

    type: "ADD_FEATURE",

    payload: e.target[0].value

  })

  e.target[0].value = ""

 }

 const handleUpload = async () => {

  setUploading(true)

  try {

   const cover = await upload(singleFile)

   const images = await Promise.all([...files].map(async (file) => {

      const url = await upload(file)
      
      return url

    }

  ))

  setUploading(false)

  dispatch({

    type:"ADD_IMG",

    payload: {

      cover,
      images

    }

  })
    
  } catch (err) {

    console.log(err)
    
  }

 }

 const queryClient = useQueryClient()

 const mutation = useMutation({

  mutationFn: (gig) => {

    return newRequest.post("/gigs", gig)

  },

  onSuccess: () => {

    queryClient.invalidateQueries(["myGigs"])

  }

})

 const handleSubmit  = (e) => {

   e.preventDefault()

   mutation.mutate(state)

   navigate("/mygigs")

 }

 console.log(state);

  return (

    <div className="add">

      <div className="container">

        <h1>Thêm dịch vụ</h1>

        <div className="sections">

          <div className="info">

            <label htmlFor="">Tiêu đề</label>

            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />

            <label htmlFor="">Category</label>

            <select name="cat" id="cat" onChange={handleChange}>
              <option>Thể loại</option>
              <option value="desgin">Design</option>
              <option value="Wordpress">Wordpress</option>
              <option value="animation">Animation</option>
              <option value="video">Video</option>
              <option value="voice">Voice</option>
            </select>

            <div className="images">

              <div className="imagesInputs">

                  <label htmlFor="">Cover Image</label>

                  <input type="file" onChange={(e) => setSingleFile(e.target.files[0])}/>

                  <label htmlFor="">Upload Images</label>

                  <input type="file" multiple  onChange={(e) => setFiles(e.target.files)} />

               </div>

               <button onClick={handleUpload}>{uploading ? "Uploading..." : "Upload"}</button>

            </div>

            <label htmlFor="">Mô tả</label>

            <textarea 
                name="desc" 
                id="" 
                placeholder="Brief descriptions to introduce your service to customers"
                cols="0" 
                rows="16"
                onChange={handleChange}
            >
           </textarea>

            <button onClick={handleSubmit}>Tạo</button>

          </div>

          <div className="details">

            <label htmlFor="">Dịch vụ khác</label>

            <input type="text"  name="shortTitle" placeholder="e.g. One-page web design"  onChange={handleChange}/>

            <label htmlFor="">Mô tả</label>

            <textarea 
                name="shortDesc" 
                id="" 
                placeholder="Short description of your service" 
                cols="30" 
                rows="10"
                onChange={handleChange}
                >
            </textarea>

            <label htmlFor="">Thời gian hoàn thành (e.g. 3 days)</label>

            <input type="number"  name="deliveryTime" onChange={handleChange}/>

            <label htmlFor="">Số lần sửa free</label>

            <input type="number" name="revisionNumber" onChange={handleChange} />

            <label htmlFor="">Ưu đãi</label>

            <form action="" className="add" onSubmit={handleFeature}>

              <input type="text" placeholder="e.g. page design" />

              <button type="submit">Thêm</button>
              
            </form>

            <div className="addedFeatures">
              {state?.features?.map(feature => (

                  <div className="item" key={feature}>
                    <button onClick={() => dispatch({type:"REMOVE_FEATURES", payload: feature})} >{feature} <span>X</span></button>
                  </div>

              ))}
            </div>

            <label htmlFor="">Giá</label>

            <input type="number" name="price"  onChange={handleChange}/>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Add;
