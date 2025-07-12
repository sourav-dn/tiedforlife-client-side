import { Link } from "react-router";
import errorLottie from "../../assets/lottie/error.json";
import Lottie from "lottie-react";

const Error = () => {
    return (
        <section className="bg-white ">
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div className="wf-ull lg:w-1/2">
                    <p className="text-sm font-medium text-gray-500">404 error</p>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                        Page not found
                    </h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Sorry, the page you are looking for doesn't exist.
                    </p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <Link
                            to="/"
                            className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-gray-500 rounded-lg shrink-0 sm:w-auto hover:bg-gray-600"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>

                <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
                    {/* <img
            className=" w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover "
            src="https://img.freepik.com/free-vector/tiny-programmers-working-with-system-error-computer-monitor-internet-flat-vector-illustration-programming-it-digital-technology_74855-8632.jpg?t=st=1737857338~exp=1737860938~hmac=127e7e9e10185252969aa9bf231193657f4bb18ccf6a2b4eac57589c12d3edf4&w=1060"
            alt=""
          /> */}
                    {/* Lottie Animation */}
                    <div className="text-center lg:text-left">
                        <Lottie animationData={errorLottie} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Error;