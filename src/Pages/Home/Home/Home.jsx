import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import HowItWorks from "../HowItWorks/HowItWorks";
import PremiumMember from "../PremiumMember/PremiumMember";
import Privacy from "../Privacy/Privacy";
import SuccessCounter from "../SuccessCounter/SuccessCounter";
import SuccessStory from "../SuccessStory/SuccessStory";
import TeamMember from "../Team Member/TeamMember";


const Home = () => {
    return (
        // <div className="bg-[#fdfcf9] dark:bg-gray-900 bg-[url('/src/assets/Bg/bg-image1.png')] 
        //     bg-no-repeat bg-[position:top_left] bg-[length:450px] bg-fixed transition-colors duration-300">
        <div className="bg-white dark:bg-gray-900 bg-[url('/src/assets/Bg/bg-image1.png')] 
            bg-no-repeat bg-[position:top_left] bg-[length:450px] bg-fixed transition-colors duration-300 text-gray-900 dark:text-gray-100">

            <Banner></Banner>
            <PremiumMember></PremiumMember>
            <HowItWorks></HowItWorks>
            <SuccessCounter></SuccessCounter>
            <SuccessStory></SuccessStory>
            <Category></Category>
            <Privacy></Privacy>
            <TeamMember></TeamMember>
        </div>
    );
};

export default Home;