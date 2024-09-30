/* eslint-disable react/prop-types */

import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProduct } from '../store/cartSlice'


function Postcard({ $id, title, productImg, price }) {
  const dispatch = useDispatch()
  const handleAddToCart = () => {
    dispatch(addProduct({ id: $id, title, productImg, price }))
    console.log('hello')
    }
  return (
    <div className='w-full'>
      <div className='bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out'>
        {/* Image Container */}
        <Link to={`/post/${$id}`} className='block mb-2'>
        <div className='w-full aspect-w-1 aspect-h-1 mb-4 overflow-hidden rounded-xl'>
          <img
            src={appwriteService.getFilePreview(productImg)}
            className='w-full h-full object-cover'
            alt={title}
          />
          </div>
          </Link>

        {/* Product Details */}
        <div className='flex flex-col justify-between h-full'>
            <h2 className='text-lg font-semibold text-gray-900 truncate'>{title}</h2>
          {/* Price and Rating */}
          <div className='flex items-center justify-between mb-3'>
          <h4 className='text-lg font-semibold text-gray-900 truncate'>price</h4>
            <span className='text-xl font-bold text-green-600'>${price}</span>
            {/* <span className='flex items-center text-sm text-yellow-500'>
              {'★'.repeat(Math.floor(rating))}{' '}
              <span className='text-gray-500 ml-1'>({rating.toFixed(1)})</span>
            </span> */}
          </div>

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart} className='w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Postcard
