import SectionTitle from "../../../Components/SectionTitle";
import image from "../../../assets/Home-img/wed4.png";
import "./HowIt.css";

const HowItWorks = () => {
    return (
        <div>
            <SectionTitle
                heading="How It Works"
                subHeading="To Know More Keep Eyes On Our Website!"
            ></SectionTitle>

            <section
                className="relative bg-cover bg-center bg-no-repeat bg-fixed w-full min-h-[450px] flex items-center justify-center
        text-white text-center p-4 md:p-8 overflow-hidden howIt-item"
            >
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-70"></div>
                <div className="relative z-10 max-w-5xl w-full">
                    {/* Content Section */}
                    <div className="flex flex-col md:flex-row justify-center items-center py-4 px-4 md:px-8 gap-6">
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img
                                className="w-full max-w-xs md:max-w-md rounded-2xl shadow-lg transform hover:scale-110 transition-all duration-500"
                                src={image}
                                alt="How It Works"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;