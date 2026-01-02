import React from 'react'
import Header from '../components/Header'
import Slider from '../components/HeroSlider'
import ContactSection from "../components/ContactSection";
import Footer from '../components/Footer';

function ContactUs() {
    return (
        <>
            <div className='w-full'>
                <div className="mx-auto h-screen w-[100vw]">
                    <nav className='header'>
                        <Header />
                    </nav>
                    <div className='slider mx-auto'>
                        <Slider />
                    </div>
                    <div className='mx-auto'>
                        <ContactSection />
                    </div>
                    <div className='best-sell-product max-auto w-[100vw]'>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs