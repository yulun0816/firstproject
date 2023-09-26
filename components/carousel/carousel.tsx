import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import carouselStyle from './carousel.module.scss'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function Carousel({ allPostsData }: { allPostsData: [{ id: string, name: string }]; }) {
    const carouselItemRef = useRef(null);
    const carouselDotRef = useRef(null);
    let intervalTime = 3000;
    let carouselIndex = 0;
    let intervalCarousel;
    let intervalProcess;
    let time = 0;

    useEffect(() => {
        let lastImg = carouselItemRef.current.lastElementChild.cloneNode(true);
        let firstImg = carouselItemRef.current.firstElementChild.cloneNode(true);
        carouselItemRef.current.appendChild(firstImg);
        carouselItemRef.current.insertBefore(lastImg, carouselItemRef.current.firstElementChild);
        lastImg.style.position = 'absolute';
        lastImg.style.transform = 'translateX(-100%)';

        carouselDotRef.current.querySelector('.carouselActive').firstElementChild.style.transition = `${intervalTime / 1000}s linear`
        carouselDotRef.current.querySelector('.carouselActive').firstElementChild.style.width = '100%';

        moveTo(0);
        intervalCarousel = carouselInterval();

        return () => {
            clearInterval(intervalCarousel);
            clearInterval(intervalProcess);
        }
    }, [])

    const carouselInterval = () => {
        return setInterval(() => {
            nextCarouselControl();
        }, intervalTime)
    }

    const carouselEnter = () => {
        clearInterval(intervalCarousel);
        clearInterval(intervalProcess);
    }

    const carouselLeave = () => {
        moveTo(carouselIndex, true);
    }

    const moveTo = (index: number, isReEnter: boolean = false) => {
        let carouselActive = carouselDotRef.current.querySelector('.carouselActive');
        let elementLi = carouselDotRef.current.querySelectorAll('li')[index];

        carouselItemRef.current.style.transform = `translateX(-${index * 100}%)`;
        carouselItemRef.current.style.transition = '0.5s';

        if (!isReEnter) {
            carouselActive.firstElementChild.style.transition = 'none'
            carouselActive.firstElementChild.style.width = '0%';
            time = 0;
        }
        carouselActive.classList.remove('carouselActive');
        elementLi.classList.add('carouselActive');

        clearInterval(intervalProcess);
        intervalProcess = setInterval(() => {
            time += (100 / intervalTime) * 100;
            elementLi.querySelector('div').style.width = `${time}%`;
            if (time > 100) {
                if (isReEnter) {
                    nextCarouselControl();
                    intervalCarousel = carouselInterval();
                } else {
                    nextCarouselControl();
                }
            }
        }, 100)

        carouselIndex = index;
    }

    const prevCarouselControl = () => {
        if (carouselIndex === 0) {
            carouselItemRef.current.style.transition = 'none';
            carouselItemRef.current.style.transform = `translateX(-${allPostsData.length * 100}%)`;
            setTimeout(() => {
                moveTo(allPostsData.length - 1)
            }, 50)
        } else {
            moveTo(carouselIndex - 1)
        }
    }

    const nextCarouselControl = () => {
        if (carouselIndex === allPostsData.length - 1) {
            carouselItemRef.current.style.transition = 'none';
            carouselItemRef.current.style.transform = `translateX(100%)`;
            setTimeout(() => {
                moveTo(0)
            }, 50)
        } else {
            moveTo(carouselIndex + 1)
        }
    }

    const carouselDotClick = (index) => {
        moveTo(index)
    }

    return (
        <div className={carouselStyle.carousel} onMouseEnter={carouselEnter} onMouseLeave={carouselLeave}>
            <div className={carouselStyle.carouselItem} ref={carouselItemRef}>
                {
                    allPostsData &&
                    allPostsData.map((items, index) => (
                        <Image
                            key={items.id}
                            priority
                            src={`/images/Banner/${items.name}`}
                            width={1920}
                            height={1080}
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                            alt=""
                        />
                    ))
                }
            </div>
            <FaChevronLeft className={`${carouselStyle.chevronIcon} ${carouselStyle.left}`} onClick={prevCarouselControl} />
            <FaChevronRight className={`${carouselStyle.chevronIcon} ${carouselStyle.right}`} onClick={nextCarouselControl} />
            {/* <ul className={carouselStyle.carouselDots} ref={carouselDotRef}>
                {
                    allPostsData &&
                    allPostsData.map((id, index) => (
                        <li key={id} className={index == 0 ? 'carouselActive' : ''} onClick={() => carouselDotClick(index)}></li>
                    ))
                }
            </ul> */}

            <ul className={carouselStyle.carouselProcessLine} ref={carouselDotRef}>
                {
                    allPostsData &&
                    allPostsData.map((items, index) => (
                        <li key={items.id} className={index == 0 ? 'carouselActive' : ''} onClick={() => carouselDotClick(index)}>
                            <div></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}