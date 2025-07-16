import { Link } from "react-router";


const Cover = ({img, title}) => {
    return (
        <div
            className="h-[500px] w-full bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${img})`
            }}
        >
            
            <div className="text-white text-center max-w-md px-5">
                <h1 className="mb-5 text-4xl font-bold">{title}</h1>
                <p className="mb-5">
                    Present yourself with confidence and authenticity. Let your bio-data reflect your true personality,
                    values, and aspirations.
                </p>
                <Link to="/">
                    <button className="bg-[#da7665] hover:bg-pink-300 text-white font-bold py-3 px-6 rounded">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Cover;