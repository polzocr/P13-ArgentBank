import { Outlet } from 'react-router-dom'
import './index.css'


export default function Layout(){
    return (
        <div>
            <h1>LAYOUT</h1>
            <Outlet />
        </div>
    )
}