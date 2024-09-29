import { useState, useEffect } from "react"
import appwriteService from "../../appwrite/config"
import Postcard from "../Postcard"

function Home() {
  const [posts, setPosts] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)
  // const [searchTerm, setSearchTerm] = useState('')
  // const [filteredPosts, setFilteredPosts] = useState([])
  // const [category, setCategory] = useState('')
  // const [sort, setSort] = useState('')
  // const [price, setPrice] = useState('')
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  if (posts.length === 0) {
    return (
    <div className="w-full py-8 mt-4 text-center">
                <div className="w-full max-w-4xl mx-auto px-4">
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </div>
      </div>
    )
    }
  return (
    <div className='w-full py-8 '>
            <div className="w-full max-w-7xl mx-auto md:px-4 px-24">
                <div className='flex flex-wrap -mr-2'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                        <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
  )
}

export default Home
