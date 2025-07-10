import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);
const Payment = () => {

    const [data, setData] = useState(null);
    // console.log(data);
    const { id } = useParams();
    // console.log(id);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure
            .get(`/biodata/${id}`)
            .then((res) => setData(res.data))
            .catch((error) => console.error(error));
    }, [id, axiosSecure]);

    return (
        <div className="py-16">
            <SectionTitle
                heading="Payment"
                subHeading="pay for Premium member"
            ></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    {data ? <CheckOutForm data={data} /> : <p>Loading...</p>}
                </Elements>
            </div>
        </div>
    );
};

export default Payment;