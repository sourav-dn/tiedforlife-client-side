import Swal from 'sweetalert2';
import coverImg from '../../assets/Cover/cover.jpg'
import Cover from "../../Components/Shared/Cover/Cover.jsx";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const ContactUs = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Success!',
            text: 'Your message has been sent successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    return (
        <div>
            <Cover img={coverImg} title="Contact Us" />

            {/* Contact Section */}
            <div className="container mx-auto py-16 px-8">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-pink-600">Get in Touch</h2>
                <div className="grid md:grid-cols-2 gap-12 bg-pink-50 dark:bg-gray-700 shadow-xl p-10 rounded-2xl">

                    {/* Contact Info with Icons */}
                    <div className="space-y-6 flex flex-col justify-center items-start">
                        <p className="text-lg flex items-center gap-4">
                            <FaMapMarkerAlt className="text-pink-500 text-xl" />
                            <strong className="text-pink-500">Address:</strong> Dhaka 1205, Bangladesh
                        </p>
                        <p className="text-lg flex items-center gap-4">
                            <FaPhoneAlt className="text-pink-500 text-xl" />
                            <strong className="text-pink-500">Phone:</strong> +123 456 789
                        </p>
                        <p className="text-lg flex items-center gap-4">
                            <FaEnvelope className="text-pink-500 text-xl" />
                            <strong className="text-pink-500">Email:</strong> info@gmail.com
                        </p>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 bg-gray-50 p-8 rounded-lg shadow-lg">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            className="w-full p-4 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-pink-300 to-pink-500 text-white px-6 py-3 rounded-lg w-full shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* Google Map */}
            <div className="w-9/12 mx-auto h-96 rounded-2xl overflow-hidden shadow-xl my-12">
                <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509019!2d144.95565131567598!3d-37.81724897975124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce840!2sMelbourne%20VIC!5e0!3m2!1sen!2sau!4v1613965560442!5m2!1sen!2sau"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactUs;