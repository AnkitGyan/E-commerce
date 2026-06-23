import React from 'react';
import './Payment.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import CheckoutPath from '../../cart/checkout/CheckoutPath';
import { Link, useNavigate } from 'react-router-dom';
import API from "../../../axios.js";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Payment() {
  const orderItem = JSON.parse(
    sessionStorage.getItem('orderItem')
  );

  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector(
    (state) => state.cart
  );

  const navigate = useNavigate();

  const completePayment = async (amount) => {
    try {
      // Get Razorpay Key
      console.log("calling api to get key for payment");
      const { data: keyData } = await API.get(
        '/api/v1/getKey'
      );
      console.log(keyData);
      const { key } = keyData;

      // Create Razorpay Order
      const { data: orderData } = await API.post(
        '/api/v1/payment/process',
        { amount }
      );

      const { order } = orderData;

      console.log('Razorpay Key:', key);
      console.log('Order:', order);

      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: 'Opulex',
        description: 'E-commerce Transaction',
        order_id: order.id,

        handler: async function (response) {
          try {
            console.log(
              'Payment Response:',
              response
            );

            const { data } = await API.post(
              '/api/v1/paymentVerification',
              {
                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_signature:
                  response.razorpay_signature,
              }
            );

            console.log(
              'Verification Response:',
              data
            );

            if (data.success) {
              navigate(
                `/paymentSuccess?reference=${data.reference}`
              );
            } else {
              toast.error(
                'Payment Verification Failed',
                {
                  position: 'top-center',
                  autoClose: 3000,
                }
              );
            }
          } catch (error) {
            console.error(error);

            toast.error(
              error.response?.data?.message ||
                error.message,
              {
                position: 'top-center',
                autoClose: 3000,
              }
            );
          }
        },

        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact:
            shippingInfo?.phoneNumber || '',
        },

        notes: {
          address: 'Opulex Order Payment',
        },

        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new Razorpay(options);

      rzp.on('payment.failed', function (
        response
      ) {
        console.log(
          'Payment Failed:',
          response.error
        );

        toast.error(
          response.error.description ||
            'Payment Failed',
          {
            position: 'top-center',
            autoClose: 3000,
          }
        );
      });

      rzp.open();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.message,
        {
          position: 'top-center',
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <>
      <PageTitle title="Payment Processing" />
      <Navbar />

      <CheckoutPath activePath={2} />

      <div className="payment-container">
        <Link
          to="/order/confirm"
          className="payment-go-back"
        >
          Go Back
        </Link>

        <button
          className="payment-btn"
          onClick={() =>
            completePayment(orderItem.total)
          }
        >
          Pay ({orderItem.total})/-
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Payment;