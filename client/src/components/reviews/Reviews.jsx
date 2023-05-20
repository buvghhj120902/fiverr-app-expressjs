import React from 'react'
import './Reviews.scss'
import Review from '../review/Review'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const Reviews = ({gigId}) => {

  const queryClient = useQueryClient()

  const {isLoading, data, error} = useQuery({

    queryKey: ["reviews"],

    queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => {

      return res.data

    })

  })


  const mutation = useMutation({

    mutationFn: (review) => {

      return newRequest.post("/reviews", review)

    },

    onSuccess: () => {

      queryClient.invalidateQueries(["reviews"])

    }

  })

  const handleSubmit = (e) => {

    e.preventDefault()

    const star = e.target[0].value

    const desc = e.target[1].value

    mutation.mutate({gigId, desc, star})
      
    
  }

  

  return (

    <div className="reviews">

        <h2>Đánh giá</h2>

        {isLoading ? ("Loading...") : error ? ("Đã xảy ra lỗi") : data.map((review) => (

            <Review key={review._id} review={review} />

        )) }

        <div className="add">

          Đánh giá về dịch vụ

          <form onSubmit={handleSubmit} className='addForm'>

          <select>

              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>

          </select> 

             

          <input type="text" placeholder='Viết nhận xét của bạn' />

            

            <button type='submit'>Gửi</button>

          </form>

        </div>

     </div>

  )

}

export default Reviews