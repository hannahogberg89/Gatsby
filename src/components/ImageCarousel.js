import React from 'react';
import Slider from 'react-slick';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ImageCarousel = ({ images }) => {
  // Inställningar för bildkarusellen
  const settings = {
    dots: true,            // Visa punkter för navigering
    infinite: true,        // Oändlig karusell-loop
    speed: 500,            // Hastighet för bildbyten (i millisekunder)
    slidesToShow: 1,       // Antal synliga bilder åt gången
    slidesToScroll: 1,     // Antal bilder att skrolla åt gången
  };

  return (
    // Användning av React-slick Slider-komponenten med inställningar
    <Slider {...settings}>
      {/* Loopa genom varje bild i images-arrayen */}
      {images.map((image, index) => (
        // Varje bild i en separat div med unikt index som nyckel
        <div key={index}>
          {/* Använd GatsbyImage för att visa bild med hjälp av getImage-funktionen */}
          <GatsbyImage
            image={getImage(image)}
            alt={`Carousel - Image ${index + 1}`}  // Alt-text med unikt index för tillgänglighet
            className="mt-4"  // Extra klassnamn för styling (margin-top: 4)
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
