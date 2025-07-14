import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../../../src/assets/Home-img/img1.jpg"
import img2 from "../../../../src/assets/Home-img/img2.jpg"
import img3 from "../../../../src/assets/Home-img/img3.jpg"
import img4 from "../../../../src/assets/Home-img/img4.jpg"
import img5 from "../../../../src/assets/Home-img/img5.jpg"
import img6 from "../../../../src/assets/Home-img/img6.jpg"
import img7 from "../../../../src/assets/Home-img/img7.jpg"

const Banner = () => {
    return (
        <Carousel  
        autoPlay           
        infiniteLoop       
        interval={4000}    
        showThumbs={false} 
        showStatus={false} 
        stopOnHover={false}
        >
                <div className="h-[200px]
                        sm:h-[300px]
                        md:h-[500px]
                        lg:h-[700px]">
                    <img className="w-full h-full object-cover" src={img1} />                  
                </div>
                <div className="h-[200px]
                        sm:h-[300px]
                        md:h-[500px]
                        lg:h-[700px]">
                    <img className="w-full h-full object-cover" src={img2} />                   
                </div>
                <div className="h-[200px]
                        sm:h-[300px]
                        md:h-[500px]
                        lg:h-[700px]">
                    <img className="w-full h-full object-cover" src={img3} />                   
                </div>
                <div className="h-[200px]
                        sm:h-[300px]
                        md:h-[500px]
                        lg:h-[700px]">
                    <img className="w-full h-full object-cover" src={img4} />                    
                </div>
                <div className="h-[200px]
                        sm:h-[300px]
                        md:h-[500px]
                        lg:h-[700px]">
                    <img className="w-full h-full object-cover" src={img5} />                    
                </div>
                <div className="h-[200px]
                        sm:h-[300px]
                        md:h-[500px]
                        lg:h-[700px]">
                    <img className="w-full h-full object-cover" src={img6} />                  
                </div>
                <div className="h-[200px]
                        sm:h-[300px]
                        md:h-[500px]
                        lg:h-[700px]">
                    <img className="w-full h-full object-cover" src={img7} />
                </div>
            </Carousel>
    );
};

export default Banner;