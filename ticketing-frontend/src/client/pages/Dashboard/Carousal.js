import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// Assets
import Jeddah from "../../assets/Jeddah5.png"
import Madinah from "../../assets/Madeenah.png"
import Jordan from "../../assets/Jordan 1.png"
import Turkey from "../../assets/Turkey 1 1.png"

const Carousal = () => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 768 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 767, min: 464 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        }
    };
    
    const sliderImageUrl = [
        //First image url
        {
          url: Jordan,
          location: 'Jordan'
        },
        {
          url: Jeddah,
          location: 'Jeddah'
        },
        //Second image url
        {
          url: Madinah,
          location: 'Madinah'
        },
        //Third image url
        {
          url: Turkey,
          location: "Turkey"
        },
      
    ];
    return (
        <div style={{width:'100%', marginTop:'30px'}}>
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={true}
            infinite={true}
            partialVisible={false}
            dotListClass="custom-dot-list-style"
          >
            {sliderImageUrl.map((imageUrl, index) => {
              return (
                <div className="slider" key={index}>
                  <img src={imageUrl.url} alt="movie" />
                  <p className="carousel-image-title">{imageUrl.location}</p>
                </div>
              );
            })}
          </Carousel>
        </div>
    )
}

export default Carousal