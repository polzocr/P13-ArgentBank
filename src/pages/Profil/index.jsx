import './index.css'
import Welcome from '../../components/Welcome/index'
import Transaction from '../../components/Transaction/index'

export default function Profil() {
    return (
        <main className='main bg-dark'>
            <Welcome />
            <h2 className='sr-only'>Accounts</h2>
            <Transaction />
            <Transaction />
            <Transaction />
        </main>
    )
}