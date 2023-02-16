import './index.css'
import Banner from '../../components/Banner/index'
import Info from '../../components/Info/index'

import img1 from '../../assets/images/icon-chat.png'
import img2 from '../../assets/images/icon-money.png'
import img3 from '../../assets/images/icon-security.png'

export default function Home() {
    return (
        <main>
            <Banner />
            <section className='features'>
                <h2 className='sr-only'>Features</h2>
                <Info 
                    key={`infos-#1`}
                    img={img1}
                    title='You are our #1 priority'
                >
                    Need to talk to a representative? You can get in touch through our
                    24/7 chat or through a phone call in less than 5 minutes.
                </Info>
                <Info
                    key={`infos-#2`}
                    img={img2}
                    title='More savings means higher rates'
                >
                    The more you save with us, the higher your interest rate will be!
                </Info>
                <Info
                    key={`infos-#3`}
                    img={img3}
                    title='Security you can trust'
                >
                    We use top of the line encryption to make sure your data and money
                    is always safe.
                </Info>
            </section>
        </main>
    )
}