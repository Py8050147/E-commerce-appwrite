import { useState } from "react";
import Postcard from "../Postcard";
import appwriteService from "../../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]) 
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  return (
      <div className=' w-full py-8'>
        <div className="w-full max-w-4xl mx-auto px-4">
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard {...post} />
                    </div>
                ))}
            </div>
            </div>
    </div>
  )
}

export default AllPosts
