import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Base Swiper CSS
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import imageData from "../app/jsons/images.json";
import Image from "next/image";

const ImageCarousel = () => {
    return (
        <div className="flex justify-center items-center p-20">
            <Swiper
                effect={"coverflow"} // Effect = coverflow and coverflowEffects make the three slides per effect work
                centeredSlides={true} // centeredSlides makes the current slide centered instead of on the left
                slidesPerView={3}
                loop={true}
                coverflowEffect={{
                    rotate: 30, // Rotate other slides?
                    stretch: 0,
                    depth: 100, // How far back other slides are
                    modifier: 1, // How pronounced the effect should be
                    slideShadows: true, // Shadows or no shadows behind the front image
                }}
                autoplay={{
                    // autoplay allows it to autmoatically scroll through, delay is in ms
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={false} // pagination = false hides the dots
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="mySwiper"
                allowTouchMove={false} // Disable touch dragging
            >
                {imageData.images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex justify-center items-center h-full">
                            {/* Centers content within the slide */}
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={800}
                                height={500}
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-pagination absolute bottom-0 w-full text-center" />
        </div>
    );
};

export default ImageCarousel;
