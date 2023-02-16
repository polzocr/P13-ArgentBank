import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Layout from '../pages/Layout/index'
import Home from '../pages/Home/index'
import SignIn from '../pages/SignIn/index'
import Profil from '../pages/Profil/index'
import ErrorPage from '../pages/ErrorPage/index'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Layout />} errorElement={<ErrorPage />}>
                <Route index element={<Home />} />
                <Route path='/login' element={<SignIn />} />
                <Route path='/profil' element={<Profil />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
        </>
    )
)

function Router() {
    return (
        <RouterProvider router={router} /> 
    )
}

export default Router