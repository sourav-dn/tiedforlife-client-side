import Flicking from "@egjs/react-flicking";
import { Perspective, AutoPlay } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
import SectionTitle from "../../../Components/SectionTitle";

const plugins = [
    new Perspective({ rotate: 0.3, scale: 1, perspective: 600 }),
    new AutoPlay({ duration: 3000, direction: "NEXT", stopOnHover: true }),
];

const members = [
    {
        name: "Rafi Ahmed",
        role: "CEO",
        image: "https://i.ibb.co.com/3SHVzc4/360-F-7C.jpg",
    },
    {
        name: "Zahin Rahman",
        role: "Manager",
        image: "https://i.ibb.co.com/YTjjwRXG/41b52a558b662a35edd420cf12f0358b.jpg",
    },
    {
        name: "Tanzib Sohan",
        role: "Project Manager",
        image: "https://i.ibb.co.com/b58hJMc/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-ta.jpg",
    },
];

const TeamMember = () => {
    return (
        <section className="py-12">
            <SectionTitle
                heading="Meet Our Team"
                subHeading="Behind the website"
            />

            <Flicking
                align="center"
                circular={true}
                moveType="snap"
                plugins={plugins}
                className="max-w-5xl mx-auto"
            >
                {members.map((member, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-700 rounded-xl shadow-xl p-6 mx-4 w-64 h-80 text-center flex flex-col items-center justify-center transition-transform duration-300"
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-24 h-24 rounded-full mb-4 border-4 border-pink-400 object-cover"
                        />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {member.name}
                        </h3>
                        <p className="text-pink-600 dark:text-pink-300">{member.role}</p>
                    </div>
                ))}
            </Flicking>
        </section>
    );
};

export default TeamMember;