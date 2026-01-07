import React from 'react'
import Header from '../components/Header'
import Slider from '../components/HeroSlider'
import BestSellProduct from '../components/BestSellProduct'
import SelectCategory from "../components/SelectCategory";
import Footer from '../components/Footer';
import CheapProducts from '../components/CheapProducts';

function Home() {
    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50'>
            <Header/>
            <div className='mt-20'>
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
                <Footer/>
            </div>
        </div>
    )
}

export default Home