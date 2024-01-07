import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from "../../Store";
import { getError } from '../../utils';

function SendEmail() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsDisable(true);
    try {
      axios.post('/api/users/forget-password', {
        email,
      }).then(res => {
        if (res.data.message) {
          toast.success(res.data.message);
        }
      })
    } catch (err) {
      toast.error(getError(err));
    }
  };

  
  return (
    <section class="bg-gray-50 pt-10 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  sm:p-8">
          {isDisable ? (
            <h1 class="text-xl font-bold text-green-500 leading-tight tracking-tight md:text-2xl "> Check your e-mail! </h1>
          ) : (
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">Enter your e-mail</h1>
          )}
          <form
            onSubmit={submitHandler}
            class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                Enter Your email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required=""
              />
            </div>

            {isDisable ? (
              <button
                disabled
                class="w-full text-black bg-slate-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Mail Sent!
              </button>
            ) : (
              <button
                type="submit"
                class="w-full text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Send Email
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default SendEmail;
