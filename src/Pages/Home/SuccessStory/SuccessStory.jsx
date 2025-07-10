import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { HiArrowRight } from "react-icons/hi";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import SectionTitle from "../../../Components/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from "swiper/modules";
import { Link } from "react-router";

const SuccessStory = () => {

    const [reviews, setReviews] = useState([]);
    const [sortOrder, setSortOrder] = useState("ascending");

    useEffect(() => {
        fetch("http://localhost:3000/successReview")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    // Sorting function based on selected order
    const sortedReviews = [...reviews].sort((a, b) => {
        return sortOrder === "ascending"
            ? new Date(a.marriageDate) - new Date(b.marriageDate)
            : new Date(b.marriageDate) - new Date(a.marriageDate);
    });

    return (
        <section className="my-20 text-center shadow-xl p-10">
            <SectionTitle
                heading="Success Story"
                subHeading="Want to Become a part of Success Story"
            />
            {/* Sorting dropdown */}
            <div className="flex justify-between items-center mb-4">
                <label className="font-semibold">
                    Sort by: <span className="text-pink-600">"Marriage Date"</span>
                </label>
                <select
                    className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>

            <div className="py-10 rounded-lg">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {sortedReviews.map((review) => (
                        <SwiperSlide key={review._id}>
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <img
                                    src={review.image}
                                    alt="img"
                                    className="w-40 h-40 rounded-full border-4 border-purple-400 shadow-xl"
                                />
                            </div>
                            <div className="flex flex-col items-center mx-16 my-6">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.reviewStar}
                                    readOnly
                                />
                            </div>

                            <div className="text-center space-y-3">
                                <p className="text-xl font-bold text-pink-500 pb-3">
                                    Marriage Date: {review.marriageDate}
                                </p>
                                <span className="text-sm text-gray-600 italic">
                                    {review.successStory}
                                </span>
                            </div>

                            <div className="flex justify-center py-4">
                                <Link to={`/successReview/${review._id}`}>
                                    <Button
                                        color="pink"
                                        className="px-6 py-2 rounded-lg shadow-md transition-all duration-300"
                                    >
                                        See More <HiArrowRight className="text-xl" />
                                    </Button>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default SuccessStory;