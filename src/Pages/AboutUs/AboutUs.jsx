import coverImg from "../../assets/Cover/cover2.jpg";
import Cover from "../../Components/Shared/Cover/Cover.jsx";
import aboutImg from "../../assets/About/about.jpg";
import aboutImg1 from "../../assets/About/about1.jpg";
import aboutImg2 from "../../assets/About/about2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAward, faGlobe } from "@fortawesome/free-solid-svg-icons";


const AboutUs = () => {
    return (
        <div>
            <Cover img={coverImg} title={"About Us"} />
            {/* About Section */}
            <div className="container mx-auto py-16 px-4 md:px-6 lg:py-32 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="h-[400px] md:h-[600px] lg:h-[800px] relative">
                        <img
                            src={aboutImg}
                            alt="About Us"
                            className="absolute w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="bg-pink-50 dark:bg-gray-700 p-6 md:p-8 rounded-lg shadow-lg lg:absolute lg:left-1/3 lg:bottom-1/4 w-full max-w-2xl">
                        <h6 className="text-pink-500 uppercase tracking-widest text-sm md:text-base pb-2">
                            About Us
                        </h6>
                        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-pink-800">
                            We Provide the Best Matchmaking Options Tailored for You
                        </h1>
                        <p className="text-gray-700 dark:text-gray-200 mb-6 text-sm md:text-base">
                            Finding your perfect life partner has never been easier. Our
                            platform offers a wide range of verified profiles based on your
                            preferences, values, and interests. Whether you're looking for
                            compatibility in culture, profession, or lifestyle, we ensure a
                            seamless experience with trusted matchmaking solutions.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <img src={aboutImg1} alt="Gallery 1" className="rounded-lg shadow-md" />
                            <img src={aboutImg2} alt="Gallery 2" className="rounded-lg shadow-md" />
                        </div>
                        <a
                            href="#"
                            className="border-2 border-pink-600 text-pink-600 py-2 px-6 rounded-lg inline-block mt-2 hover:bg-pink-300 transition text-center"
                        >
                            Join Now
                        </a>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="container mx-auto py-12 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="flex items-center space-x-4 bg-white dark:bg-gray-600 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-center bg-[#da7665] text-white 
            h-16 w-16 md:h-24 md:w-24">
                            <FontAwesomeIcon icon={faUser} size="3x" className="px-2" />
                        </div>
                        <div>
                            <h5 className="text-lg md:text-xl font-bold">Verified Profiles</h5>
                            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                                We ensure authenticity with thoroughly verified profiles, giving you confidence in finding your perfect match.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 bg-white dark:bg-gray-600 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-center bg-[#da7665] text-white h-16 w-16 md:h-24 md:w-24">
                            <FontAwesomeIcon icon={faAward} size="4x" className="px-2" />
                        </div>
                        <div>
                            <h5 className="text-lg md:text-xl font-bold">Premium Services</h5>
                            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                                Our expert team provides personalized matchmaking services to help you find the perfect match.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 bg-white dark:bg-gray-600 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-center bg-[#da7665] text-white h-16 w-16 md:h-24 md:w-24">
                            <FontAwesomeIcon icon={faGlobe} size="3x" className="px-2" />
                        </div>
                        <div>
                            <h5 className="text-lg md:text-xl font-bold">Global Reach</h5>
                            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                                Connect with potential partners across the world through our extensive global network.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;