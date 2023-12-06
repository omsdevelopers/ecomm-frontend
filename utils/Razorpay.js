import Script from 'next/script';
import { useEffect } from 'react';

const RazorpayScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <Script />;
};

export default RazorpayScript;
