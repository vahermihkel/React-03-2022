import { useState } from "react";
import Slider from "react-slick";

function CarouselGallery() {
  const [images, setImages] = useState(
    [
      {name: "https://picsum.photos/id/130/900/200"},
      {name: "https://picsum.photos/id/53/900/200"},
      {name: "https://picsum.photos/id/900/900/200"}
    ]
  )
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true
  };
  return (
    <div>
      <Slider {...settings}>
        { images.map(element => 
              <div>
                  <img src={element.name} alt="" />
              </div>) }
      </Slider>
    </div>
  );

}

export default CarouselGallery;