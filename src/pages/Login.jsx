import React, { useEffect, useState } from "react";
import Loader from "../components/General/Loader";
import { WebHandler } from "../data/remote/WebHandler";
import { URLS } from "../data/remote/URL";
import { useNavigate } from "react-router-dom";
import Toast from "../components/General/Toast";

const Login = () => {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [res, setRes] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      const body = JSON.stringify(obj);
      const { response, status } = await WebHandler(URLS.LOGIN, "POST", body);
      if (status === 200) {
        setIsLoggedIn(true);
        setRes(response.message);
      } else {
        setShowToast(true);
        setRes(response.message);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      {showToast && (
        <Toast message={res} severity={"danger"} onClose={setShowToast} />
      )}
      {loading && <Loader />}
      <div className="bg-[#f2f6f8]  w-screen fixed top-0 left-0 flex flex-col justify-center h-screen">
        <div className="w-full max-w-md mx-auto p-8 bg-white rounded shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-start mb-4">
              <b className="text-2xl">Login</b>
            </div>
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email or Username*"
                required
                className="w-full p-2 outline-none  text-sm text-gray-700 mt-5 border border-white border-b-2 border-b-black"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder="Password*"
                required
                className="w-full p-2 outline-none  text-sm text-gray-700 mt-5 border border-white border-b-2 border-b-black"
              />
            </div>
            <div className="flex justify-start mt-8">
              <input
                type="checkbox"
                name="user"
                id="user"
                className="w-4 h-4 text-gray-700 "
              />
              <label className="ml-2 text-sm text-gray-700" htmlFor="user">
                Remember me
              </label>
            </div>
            <input
              className="w-full cursor-pointer p-2 bg-[#0DAFE6] hover:bg-[white] hover:text-[#0DAFE6] active:bg-[#0DAFE6] active:text-white text-white font-bold py-2 px-4 rounded-xl mt-6"
              type="submit"
              value="Login"
            />
          </form>
          <div className="flex justify-between">
            <button
              onClick={() => navigate("/forget")}
              className="text-sm cursor-pointer text-gray-700 mt-2 active:text-blue-400"
            >
              Forget Passwrod!
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm cursor-pointer text-gray-700 mt-2 active:text-blue-400"
            >
              Register Now!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
