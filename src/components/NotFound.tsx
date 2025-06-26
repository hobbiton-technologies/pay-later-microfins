import { Button } from "antd";
import React from "react";
// import Image404 from '../../assets/404.png'
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-5 justify-center items-center bg-contentBackground text-center">
      {/* <img src={Image404} className='w-96 h-96'></img> */}
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/">
        <Button type="primary">Go to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
