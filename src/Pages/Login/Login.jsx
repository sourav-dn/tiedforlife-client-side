import { useContext, useState } from "react";
import loginLottie from "../../assets/lottie/login.json";
import { Card, Label, TextInput } from "flowbite-react";
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

    const { setUser } = useContext(AuthContext); 
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    

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

                        <div className="mt-5">
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

                    <div className="my-2 mx-6 flex space-y-2">
                        <button onClick={handleGoogleSignIn} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
