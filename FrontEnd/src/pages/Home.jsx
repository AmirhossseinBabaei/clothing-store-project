import React from 'react'
import Header from '../components/Header'
import Slider from '../components/HeroSlider'
import BestSellProduct from '../components/BestSellProduct'
import SelectCategory from "../components/SelectCategory";
import Footer from '../components/Footer';
import CheapProducts from '../components/CheapProducts';

function Home() {
    return (
        <>
            <div className='w-full'>
                <div className="mx-auto h-screen w-[100vw]">
                    <nav className='header'>
                        <Header/>
                    </nav>
                    <div className='slider mx-auto'>
                        <Slider/>
                    </div>
                    <div className='best-sell-product max-auto w-[100vw]'>
                      <BestSellProduct/>  
                    </div>
                      <div className='best-sell-product max-auto w-[100vw]'>
                      <CheapProducts/>
                    </div>
                    <div className='best-sell-product max-auto w-[100vw]'>
                      <SelectCategory/>  
                    </div>
                     <div className='best-sell-product max-auto w-[100vw]'>
                      <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home