import './index.css'

export default function Info({img, title, children}) {
    return (
        <div className='feature-item'>
            <img src={img} alt="chat icon" className='feature-icon'/>
            <h3 className='feature-item-title'>{title}</h3>
            <p>{children}</p>
        </div>
    )
}