import React, { useState } from 'react'
import Header from '../components/Header'
import Slider from '../components/HeroSlider'
import "../styles/public.css"
import AllProducts from '../components/AllProducts'
import Footer from '../components/Footer'

function Products() {

    return (
        <>
            <div className='w-full'>
                <div className="mx-auto h-screen w-[100vw]">
                    <nav className='header'>
                        <Header />
                    </nav>
                   <div className='slider mx-auto'>
                        <Slider/>
                    </div>
                    <div className='mx-auto mt-8'>
                        <h2 className='text-center text-4xl font-bold mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent'>
                            مشاهده محصولات
                        </h2>
                        <AllProducts/>
                    </div>
                      <div className='best-sell-product max-auto w-[100vw]'>
                      <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products