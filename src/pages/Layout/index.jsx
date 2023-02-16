import { Outlet } from 'react-router-dom'
import './index.css'
import Header from '../../components/Header/index'
import Footer from '../../components/Footer/index'


export default function Layout(){
    return (
        <body>
            <Header />
            <Outlet />
            <Footer />
        </body>
    )
}