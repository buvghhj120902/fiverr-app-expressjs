import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import { getCurrentUser } from "../../utils/getCurrentUser.js";
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser()

  const {isLoading , error, data} = useQuery({

  queryKey: ['myGigs'],

  queryFn: () => newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {

    return res.data

  })

})

  const queryClient = useQueryClient()

  const mutation = useMutation({

    mutationFn: (id) => {

      return newRequest.delete(`/gigs/${id}`)

    },

    onSuccess: () => {

      queryClient.invalidateQueries(["myGigs"])

    }

  })

  console.log(data)

  const handleDelete = (id) => {

    mutation.mutate(id)

  }

  return (
    <div className="myGigs">

      {isLoading ? ("Loading...") : error ? ("Đã có lỗi xảy ra") : <div className="container">

        <div className="title">
          <h1>Dịch vụ của tôi</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Thêm dịch vụ</button>
            </Link>
          )}
        </div>

        <table>

          <tr>
            <th>Image</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Giảm giá</th>
            <th>Hành động</th>
          </tr>

          {data.map((gig) => (

          <tr key={gig._id}>

            <td >

              <img
                className="image"
                src={gig.cover}
                alt=""
              />
  
            </td>

            <td>{gig.title}</td>

            <td>{gig.price}</td>

            <td>{gig.sales}</td>

            <td>
              <img className="delete" src="./img/delete.png" alt="" onClick={() => handleDelete(gig._id)}/>
            </td>

          </tr>
           ))}

        </table>
      </div>
       }
    </div>
  );
}

export default MyGigs;
