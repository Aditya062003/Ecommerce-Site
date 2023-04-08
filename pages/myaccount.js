import { React, useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const MyAccount = () => {
  const Router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("myuser")) {
      Router.push("/");
    }
  }, []);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [npassword, setnpassword] = useState("");

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setname(e.target.value);
    }
    if (e.target.name == "email") {
      setemail(e.target.value);
    }
    if (e.target.name == "phone") {
      setphone(e.target.value);
    }
    if (e.target.name == "address") {
      setaddress(e.target.value);
    }
    if (e.target.name == "pincode") {
      setpincode(e.target.value);
    }
    if (e.target.name == "password") {
      setpassword(e.target.value);
    }
    if (e.target.name == "cpassword") {
      setcpassword(e.target.value);
    }
    if (e.target.name == "npassword") {
      setnpassword(e.target.value);
    }
  };

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser && myuser.token) {
      setuser(myuser);
      setemail(myuser.email);
      fetchData(myuser.token);
    } else {
      toast.error("Please Signup before ordering!", {
        toastId: "error",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        Router.push("/signup");
      }, 3000);
    }
  }, []);

  const fetchData = async (token) => {
    let data = { token: token };
    console.log(data);
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log(response);
    setname(response.name);
    setaddress(response.address);
    setpincode(response.pincode);
    setphone(response.phone);
  };
  const handleUserSubmit = async () => {
    let data = { token: user.token, address, name, phone, pincode };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    if (response.success) {
      toast.success("Successfully Updated Details!", {
        toastId: "error",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setname(response.name);
    setaddress(response.address);
    setpincode(response.pincode);
    setphone(response.phone);
  };

  const handlePasswordSubmit = async () => {
    let response;
    if (npassword == cpassword) {
      let data = { token: user.token, password, cpassword, npassword };
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      response = await res.json();
    } else {
      response = { success: false };
    }
    if (response.success) {
      toast.success("Successfully Updated Password!", {
        toastId: "error",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setpassword('')
      setcpassword('')
      setnpassword('')
    } else {
      toast.error("Error Updating Password!", {
        toastId: "error",
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setname(response.name);
    setaddress(response.address);
    setpincode(response.pincode);
    setphone(response.phone);
  };
  return (
    <div className="container mx-auto my-6">
      <ToastContainer />
      <div className="text-3xl text-center font-bold">Update Your Account</div>
      <div className="container m-auto">
      <Head>
        <title>Care-Leisure.com-Wear the style</title>
        <meta name="description" content="StylesWear" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h2 className="font-bold mb-2 mx-4">1. Delivery Details </h2>
        <div className="my-4 mx-auto">
          <div class="px-2 flex">
            <div class=" m-2 w-1/2 mb-2">
              <label for="full-name" class="leading-7 text-sm text-gray-600">
                Full Name
              </label>
              <input
                onChange={handleChange}
                value={name}
                type="text"
                id="name"
                name="name"
                class="w-full bg-gray-100 px-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1  leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class=" m-2 w-1/2">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Email
              </label>
              {user && user.value ? (
                <input
                  onChange={handleChange}
                  value={user.email}
                  type="email"
                  id="email"
                  name="email"
                  readOnly
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              ) : (
                <input
                  onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  name="email"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              )}
            </div>
          </div>
          <div class=" m-3">
            <label for="address" class="leading-7 text-sm text-gray-600">
              Address
            </label>
            <input
              onChange={handleChange}
              value={address}
              id=""
              name="address"
              class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></input>
          </div>
          <div class="px-2 flex">
            <div class=" m-2 w-1/2 ">
              <label for="full-name" class="leading-7 text-sm text-gray-600">
                Phone Number
              </label>
              <input
                onChange={handleChange}
                value={phone}
                type="text"
                id="phone"
                name="phone"
                class="w-full bg-gray-100 px-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1  leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class=" m-2 w-1/2">
              <label class="leading-7 text-sm text-gray-600">Pincode</label>
              <input
                onChange={handleChange}
                value={pincode}
                type="text"
                id="pincode"
                name="pincode"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="m-4">
            <button
              onClick={handleUserSubmit}
              className="disabled:bg-blue-200 flex my-3  md:my-0 mx-auto text-white bg-indigo-500 border-0 py-3 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <h2 className="font-bold mb-2 mx-4">2. Change Password </h2>
      <div className="px-2 flex">
        <div class=" m-2 w-1/2 mb-2">
          <label for="password" class="leading-7 text-sm text-gray-600">
            Password
          </label>
          <input
            onChange={handleChange}
            value={password}
            type="password"
            id="password"
            name="password"
            class="w-full bg-gray-100 px-3 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1  leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="m-2 w-1/2">
          <label for="cpassword" class="leading-7 text-sm text-gray-600">
            New Password
          </label>

          <input
            onChange={handleChange}
            value={npassword}
            type="password"
            id="npassword"
            name="npassword"
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class=" m-2 w-1/2">
          <label for="cpassword" class="leading-7 text-[0.85rem] md:text-sm text-gray-600">
            Confirm Password
          </label>

          <input
            onChange={handleChange}
            value={cpassword}
            type="password"
            id="cpassword"
            name="cpassword"
            class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="m-3">
        <button
          onClick={handlePasswordSubmit}
          className="disabled:bg-blue-200 flex my-3  md:my-0 mx-auto text-white bg-indigo-500 border-0 py-3 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MyAccount;
