"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import loginImg from "../images/loginBG2.jpg";
import SignupForm from "../components/Auth/SignupForm";
import LoginForm from "../components/Auth/LoginForm";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Head>
        <title>Login/Signup Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`w-1/2 relative transition-all duration-500 ease-in-out ${isLogin ? "left-1/2" : "left-0"}`}>
        {isLogin ? (
          <LoginForm toggleForm={toggleForm} /> // Render LoginForm if isLogin is true
        ) : (
          <SignupForm toggleForm={toggleForm} /> // Render SignupForm if isLogin is false
        )}
      </div>

      <div className={`absolute inset-y-0 w-1/2 transition-all duration-500 ease-in-out ${isLogin ? "left-0" : "left-1/2"}`}>
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={loginImg}
            alt="Login image"
            layout="fill"
            objectFit="cover"
            priority
            className="transition-transform duration-500 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
}
