import { useContext } from "react";
import { useForm } from "react-hook-form";
// import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import registerLottie from "../../assets/lottie/register.json";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import Lottie from "lottie-react";
import { Card, TextInput } from "flowbite-react";
import { AuthContext } from "../../Provider/AuthContext";

const Register = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        // console.log(data);

        // Check for at least one special character in the password
        if (!/[!#$%&?@]/.test(data.password)) {
            toast.error("Password must include at least one special character");
            return;
        }

        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                // console.log(loggedUser);

                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        // console.log("user profile info updated");

                        const userInfo = {
                            email: loggedUser?.email,
                            name: loggedUser?.displayName || data.name,
                            photo: loggedUser?.photoURL || data.photo,
                        };

                        axiosPublic.post("/users", userInfo)
                            .then((res) => {
                                // console.log(res.data);
                                console.log(res)
                                reset();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "User created successfully",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                navigate("/");
                            })
                            .catch((error) => {
                                console.error("Error saving user:", error);
                            });
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    });
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div>
            <ToastContainer />
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="flex flex-col lg:flex-row items-center gap-10 p-5">
                    <div className="text-center lg:text-left w-3/4">
                        <Lottie animationData={registerLottie} />
                    </div>
                    <Card className="w-full max-w-md shadow-lg">
                        <h1 className="text-4xl font-bold text-center mb-5">
                            Register now!
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-gray-700">Name</label>
                                <TextInput
                                    {...register("name", { required: true })}
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                // required
                                />
                                {errors.name && (
                                    <span className="text-rose-700">Name is required</span>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-700">Email</label>
                                <TextInput
                                    {...register("email", { required: true })}
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                // required
                                />
                                {errors.email && (
                                    <span className="text-rose-700">Email is required</span>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-700">Photo URL</label>
                                <TextInput
                                    {...register("photo", { required: true })}
                                    type="url"
                                    placeholder="Photo URL"
                                    name="photo"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-700">Password</label>
                                <TextInput
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                                    })}
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                // required
                                />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600">
                                        Password must be 6 characters
                                    </p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600">
                                        Password must be less than 20 characters
                                    </p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600">
                                        Password must have one, uppercase, one lowercase and one
                                        number!
                                    </p>
                                )}
                            </div>
                            <div className="mt-6">
                                <input
                                    type="submit"
                                    value="Register"
                                    className="w-full mt-4 bg-yellow-400 text-white py-2 px-4 rounded-lg hover:bg-pink-400"
                                />
                            </div>
                        </form>
                        <div className="text-center mt-4">
                            <p>
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-green-500 font-bold underline"
                                >
                                    Login
                                </Link>{" "}
                                Now!
                            </p>
                        </div>
                        <div className="mt-4">
                            <SocialLogin />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Register;