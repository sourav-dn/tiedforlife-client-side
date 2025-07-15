// FIX 1: Import CardElement and useLocation
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// FIX 2: Correct the import path and add useLocation
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const CheckOutForm = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    
    // FIX 3: Get the biodata from the navigation state
    const location = useLocation();
    const biodataToPayFor = location.state;
    console.log("Data received in checkout:", biodataToPayFor);
    const totalPrice = 500; // The price in dollars

    useEffect(() => {
        if (totalPrice > 0) {
            // FIX 4: Send 'price' to the backend to match the server code
            axiosSecure
                .post("/create-payment-intent", { price: totalPrice })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch((error) => console.error("Error fetching clientSecret:", error));
        }
    }, [totalPrice, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            setLoading(false);
            return;
        }

        const { error: paymentMethodError } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            setLoading(false);
            return;
        } else {
            setError("");
        }

        // Confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous",
                },
            },
        });

        setLoading(false);

        if (confirmError) {
            setError(confirmError.message);
        } else {
            if (paymentIntent.status === "succeeded") {
                // Save the payment information in the database
                const payment = {
                    // FIX 5: Use the data from location state
                    name: biodataToPayFor?.fullName,
                    email: user?.contactEmail,
                    mobileNumber: biodataToPayFor?.mobileNumber,
                    transitionId: paymentIntent.id,
                    price: totalPrice,
                    date: new Date(),
                    bioDataId: biodataToPayFor?.biodataId,
                    status: "pending",
                };

                const res = await axiosSecure.post("/payments", payment);
                
                if (res.data?.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Payment Successful. Your contact request has been sent.",
                        icon: "success",
                    });
                    navigate("/dashboard/contact-request");
                }
            }
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg"
            >
                <div className="form-control my-5">
                    <h1 className="text-gray-500 text-center">Pay ${totalPrice} for contact information</h1>
                </div>
                <div className="form-control my-5">
                    <label className="text-gray-500">Biodata ID</label>
                    <input
                        type="text"
                        value={biodataToPayFor?.biodataId || ''}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div className="form-control my-5">
                    <label className="text-gray-500">Your Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <CardElement
                    className="p-3 my-5 border rounded-lg shadow-sm bg-gray-50"
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": { color: "#aab7c4" },
                            },
                            invalid: { color: "#9e2146" },
                        },
                    }}
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition disabled:bg-gray-400"
                    type="submit"
                    disabled={!stripe || !clientSecret || loading}
                >
                    {loading ? "Processing..." : "Pay"}
                </button>
            </form>
        </div>
    );
};

export default CheckOutForm;