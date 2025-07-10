import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FcGoogle } from "react-icons/fc";
import { Button } from "flowbite-react";


const SocialLogin = () => {

    const { signInWithGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                // console.log(result.user);

                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
            })

            .catch((error) => {
                console.log(error)
                // console.log(error.message);
            });
    };

    return (
        <div>
            <Button onClick={handleGoogleSignIn} outline gradientduotone="pinkToOrange">
                <div className="flex justify-center items-center w-8"><FcGoogle /></div>
                Google
            </Button>
        </div>
    );
};

export default SocialLogin;