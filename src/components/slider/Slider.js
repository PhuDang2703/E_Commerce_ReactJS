import { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { sliderData } from './slider-data'
import './Slider.scss'
import { Link } from 'react-router-dom'

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 3000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    }
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    }

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [currentSlide, slideInterval, autoScroll]) 

    return (
        <div className='slider'>
            <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
            <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />

            {sliderData.map((slide, index) => {
                const { image, heading, desc } = slide;
                return (
                    <div key={index} className={index === currentSlide ? "slide current" : "slide"}>

                        {index === currentSlide && (
                            <>
                                <img src={image} alt='slide' />
                                <div className='content'>
                                    <h2>{heading}</h2>
                                    <p>{desc}</p>
                                    <hr />
                                    <Link to='/#products' className='--btn --btn-primary'>Shop Now</Link>
                                </div>
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Slider