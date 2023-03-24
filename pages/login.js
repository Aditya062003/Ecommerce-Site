import React from "react";
import Link from "next/link";

const Login = () => {
  return (
    <section className="h-screen m-auto">
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
            <form>
              <div class="container flex">
                <div class="lg:w-3/4 bg-white rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 shadow-xl">
                  <h1 class="text-gray-900 mb-3 text-2xl text-center font-bold title-font">
                    Please login to your Account
                  </h1>
                  <div class="relative mb-4">
                    <label for="email" class="leading-7 text-sm text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
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
                      class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>

                  <button class="text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Signin
                  </button>
                  <div className="mt-3">
                    <Link legacyBehavior href={"/forgot"}>
                      <a
                        class="text-primary transition duration-150 ease-in-out hover:text-indigo-900 text-indigo-700"
                      >
                        Forgot password?
                      </a>
                    </Link>
                  </div>
                  <div class="flex items-center justify-between mt-6 pb-6">
                    <p class="mb-0 mr-2">Don't have an account?</p>
                    <Link href={'/signup'}>
                      <button
                        type="button"
                        className="text-indigo-600 border border-indigo-600 py-2 px-4 focus:outline-none hover:text-white hover:bg-indigo-600 rounded text-lg"
                      >
                        Register
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

export default Login;
