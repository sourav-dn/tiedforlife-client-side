import { useContext, useState } from "react";
import loginLottie from "../../assets/lottie/login.json";
import { Card, Label, TextInput } from "flowbite-react";
import SocialLogin from "../../Components/SocialLogin/SocialLogin.jsx";
// import { AuthContext } from "../../Provider/AuthProvider.jsx";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { AuthContext } from "../../Provider/AuthContext.jsx";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useContext(AuthContext); // if your AuthContext provides setUser
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const adminLogin = () => {
        setEmail("info@gmail.com");
        setPassword("123@Info");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // call firebase sign in with email/password
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/", { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Login Failed!",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            });
    };

    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                toast.success("Google sign in successful!");
                setUser && setUser(user);
                navigate(from, { replace: true });
            })
            .catch(() => {
                toast.error("Failed to sign in with Google!");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
                {/* Lottie Animation */}
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={loginLottie} />
                </div>

                {/* Login Form */}
                <Card className="w-full max-w-md shadow-2xl">
                    <h1 className="text-4xl font-bold text-center mt-4 text-gray-800">
                        Login now!
                    </h1>
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="mb-4">
                            <Label htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="mt-1">
                                <Link
                                    to="#"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full mt-4 py-2 px-4 rounded-lg transition-all bg-yellow-400 text-white hover:bg-pink-400"
                            >
                                Login
                            </button>
                        </div>

                        <div className="mt-4 text-center">
                            <p>
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-red-600 font-bold underline"
                                >
                                    Register
                                </Link>{" "}
                                Now!
                            </p>
                        </div>
                    </form>

                    <div className="my-2 mx-6 flex flex-col space-y-2">
                        <button
                            onClick={handleGoogleSignIn}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                        >
                            Sign in with Google
                        </button>

                        <div className="flex justify-between">
                            <SocialLogin /> {/* optional - you can remove if duplicating */}

                            <button
                                onClick={adminLogin}
                                className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
                            >
                                Admin Login
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
