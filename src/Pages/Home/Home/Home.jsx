import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import PremiumMember from "../PremiumMember/PremiumMember";
import SuccessCounter from "../SuccessCounter/SuccessCounter";
import SuccessStory from "../SuccessStory/SuccessStory";


const Home = () => {
    return (
        <div className="bg-[#fdfcf9] dark:bg-gray-800 bg-[url('/src/assets/Bg/bg-image1.png')] 
    bg-no-repeat bg-[position:top_left] bg-[length:450px] bg-fixed">
            <Banner></Banner>
            <PremiumMember></PremiumMember>
            <HowItWorks></HowItWorks>
            <SuccessCounter></SuccessCounter>
            <SuccessStory></SuccessStory>
        </div>
    );
};

export default Home;