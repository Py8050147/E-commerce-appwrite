
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import SignUp from './components/SignUp.jsx'
import AuthLayout from "./components/AuthLayout.jsx"
import { Provider } from 'react-redux'
import store from "./store/store.js"
import SigninForm from './components/_auth/signinForm.jsx'
import PostForm from './components/post/PostForm.jsx'
import Post from "./components/pages/Post.jsx"
import AllPosts from './components/pages/AllPosts.jsx'
import Cart from './components/Cart.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
          <SignUp />
          </AuthLayout>
        )
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <SigninForm/>
          </AuthLayout>
        )
      },
      {
        path: '/postForm',
        element: (
          <AuthLayout authentication>
            { " " }
            <PostForm />
            </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <AllPosts />
            </AuthLayout>
        ),
      },
      {
        path: "/Cart",
        element: (
            <AuthLayout authentication>
                {" "}
                <Cart />
            </AuthLayout>
        ),
      },
      {
        path: '/post/:slug',
        element: (
          <AuthLayout authentication>
            {" "}
            <Post />
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
 
  <Provider store={store}>
  <RouterProvider router={router} />
</Provider>

)
