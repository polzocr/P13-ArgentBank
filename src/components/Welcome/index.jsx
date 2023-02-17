import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectorProfil } from '../../utils/Redux/selectors'
import './index.css'

export default function Welcome(){
    
    const profil = useSelector(selectorProfil)
    const [editing, setEditing] = useState(false)

    function editProfil(){
        console.log('editing')
    }

    return (
        <div className='header'>
            {!editing ? (
                <>
                    <h1>Welcome back <br/> {profil.data.firstName} {profil.data.lastName} </h1>
                    <button className='edit-button' onClick={() => {setEditing(true)}}>Edit Name</button>
                </>
            ) : (
                <>
                    <h1>Welcome back</h1>
                    <form action="">
                        <input type="text" placeholder={profil.data.firstName}/>
                        <input type="text" placeholder={profil.data.lastName}/>
                    </form>
                    <button className='edit-button' onClick={() => { editProfil }}>Save</button>
                    <button className='edit-button' onClick={() => { setEditing(false) }}>Cancel</button>
                </>
            )}
        </div>
        
    )
}