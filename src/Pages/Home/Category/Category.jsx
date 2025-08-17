import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import slide1 from "../../../assets/Home-img/c1.jpg";
import slide2 from "../../../assets/Home-img/c2.jpg";
import slide3 from "../../../assets/Home-img/c3.jpg";
import slide4 from "../../../assets/Home-img/c4.jpg";
import slide5 from "../../../assets/Home-img/c5.jpg";
import slide6 from "../../../assets/Home-img/c6.jpg";
import SectionTitle from "../../../Components/SectionTitle";

const cards = [
    {
        img: slide1,
        title: "Couples",
        desc: "Find your ideal match",
    },
    {
        img: slide2,
        title: "Marriage",
        desc: "Ready for commitment",
    },
    {
        img: slide3,
        title: "Engagement",
        desc: "Celebrate love & unity",
    },
    {
        img: slide4,
        title: "Haldi Ceremony",
        desc: "Make it bright & yellow",
    },
    {
        img: slide5,
        title: "Reception",
        desc: "A grand celebration",
    },
    {
        img: slide6,
        title: "Nikah",
        desc: "Sacred Islamic union",
    },
];

const Category = () => {
    return (
        <section className="px-4">
            <SectionTitle
                heading={"Perfect Match"}
                subHeading={"Search Perfect Match For You!"}
            />
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                {cards.map((card, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative w-full h-100 overflow-hidden rounded-xl shadow-lg group transition-transform duration-300 transform hover:scale-105">
                            {/* Image */}
                            <img
                                src={card.img}
                                alt={card.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Glass hover effect */}
                            <div className="absolute bottom-0 left-0 w-full bg-white/20 backdrop-blur-md text-white p-4 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 rounded-b-xl">
                                <h3 className="text-lg font-bold">{card.title}</h3>
                                <p className="text-sm">{card.desc}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Category;