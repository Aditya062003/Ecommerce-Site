import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const handleChange=(e)=>{
    if(e.target.name=='name'){
      setname(e.target.value)
    }else if(e.target.name=='email'){
      setemail(e.target.value)
    }else if(e.target.name=='password'){
      setpassword(e.target.value)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    let res = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    console.log(response)
    setemail('')
    setname('')
    setpassword('')
    toast.success("Your account has been successfully created!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <section className="h-screen m-auto">
      <ToastContainer/>
      <div className="container h-full px-6 py-24 m-auto">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between m-auto">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form onSubmit={handleSubmit} method="POST">
              <div class="container flex">
                <div class="lg:w-3/4 bg-white rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 shadow-xl">
                  <h1 class="text-gray-900 mb-3 text-2xl text-center font-bold title-font">
                    Sign Up for your Account
                  </h1>
                  <div class="relative mb-4">
                    <label for="name" class="leading-7 text-sm text-gray-600">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                      class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div class="relative mb-4">
                    <label for="email" class="leading-7 text-sm text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div class="relative mb-4">
                    <label
                      for="password"
                      class="leading-7 text-sm text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>

                  <button class="text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Signin
                  </button>
                  <div className="mt-3"></div>
                  <div class="flex items-center justify-between mt-6 pb-6">
                    <p class="mb-0 mr-2">Already have an account?</p>
                    <Link href={"/login"}>
                      <button
                        type="button"
                        className="text-indigo-600 border border-indigo-600 py-2 px-4 focus:outline-none hover:text-white hover:bg-indigo-600 rounded text-lg"
                      >
                        Login
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
