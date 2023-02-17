import { useState } from 'react'
import { useSelector, useStore } from 'react-redux'
import { updatingProfilInfos } from '../../features/profil'
import { selectorLogin, selectorProfil } from '../../utils/Redux/selectors'
import './index.css'

export default function Welcome(){
    
    const store = useStore()
    const profil = useSelector(selectorProfil)
    const login = useSelector(selectorLogin)
    
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({
        firstName: '',
        lastName: ''
    })

    function handleChange(e) {
        setForm((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    function handleSubmit() {
        checkEmptyValue()
        editProfil()
    }

    function checkEmptyValue() {
        if (form.firstName === '') {
            form.firstName = profil.data.firstName
        }
        if (form.lastName === '') {
            form.lastName = profil.data.lastName
        }
    }

    function editProfil() {
        updatingProfilInfos(store, login.data.token, form)
            .then(() => {
                const status = store.getState().profil.status
                if (status !== 'rejected') {
                    setEditing(false)
                }
            })
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
                    <form className='edit-form'>
                        <input type="text" placeholder={profil.data.firstName} name="firstName" value={form.firstName} onChange={handleChange}/>
                        <input type="text" placeholder={profil.data.lastName} name="lastName" value={form.lastName} onChange={handleChange} />
                    </form>
                        <button className='edit-button save-button' onClick={handleSubmit}>Save</button>
                    <button className='edit-button save-button' onClick={() => { setEditing(false) }}>Cancel</button>
                </>
            )}
        </div>
        
    )
}