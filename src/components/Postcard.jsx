/* eslint-disable react/prop-types */

import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function Postcard({$id, title, productImg}) {
  return (
      <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(productImg)} className=' rounded-xl' alt={title}/>
            </div>
        <h2 className=' text-xl font-bold'>{ title}</h2>
        </div>
      </Link>
  )
}

export default Postcard
