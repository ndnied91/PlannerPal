import { useState } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../context';
import { MdOutlineClose } from 'react-icons/md';
import OutsideClickHandler from 'react-outside-click-handler';

const RegisterModal = ({ setShowRegModal, renderSignIn, showRegModal }) => {
  const { setContextUser } = useGlobalContext();

  const [user, setUser] = useState({
    name: 'Jim Bob',
    email: 'testing@test.com',
    password: '12345678',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await customFetch.post('/auth/register', user);
      setContextUser(user);
      setShowRegModal(false);
      toast.success('Registration Successful!');
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'unable to complete signup!');
      return error;
    }
  };

  const handleTestLogin = async () => {
    //handle guest login

    const user = {
      email: 'guest@plannerpal.com',
      password: 'Guest1234',
    };

    try {
      const { data } = await customFetch.post('/auth/login', user);

      setContextUser(data.user);
      window.location.reload();
    } catch (error) {
      toast.error(
        error?.response?.data?.msg || 'Unable to login, please try again!'
      );
      return error;
    }
  };

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10 "></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <OutsideClickHandler onOutsideClick={() => setShowRegModal(false)}>
            <div
              className={`transition ease-in ${
                showRegModal
                  ? 'opacity-100 translate-y-[0rem] duration-300'
                  : 'opacity-0 translate-y-[-5rem]'
              } relative transform overflow-hidden rounded-lg bg-white text-left !w-96 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md self-center`}
            >
              <div className=" px-4 py-3 flex justify-end items-center pb-1">
                <button onClick={() => setShowRegModal(false)} type="button">
                  <MdOutlineClose className="text-3xl text-gray-700" />
                </button>
              </div>
              <div className="bg-white px-4 pb-4 !pt-0 sm:p-6 sm:pb-4">
                <div className="">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <div className="">
                      {/* forms starts here */}
                      <div className="align-center">
                        <form className="" onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="username"
                            >
                              {/* Name */}
                            </label>
                            <input
                              className="shadow appearance-none border h-14 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Name"
                              required
                              value={user.name}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="username"
                            >
                              {/* Email */}
                            </label>
                            <input
                              className="shadow appearance-none border h-14 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              name="email"
                              type="text"
                              placeholder="Email Address"
                              required
                              value={user.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-6">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="password"
                            >
                              {/* Password */}
                            </label>
                            <input
                              className="shadow appearance-none border h-14 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                              id="password"
                              type="password"
                              name="password"
                              placeholder="Password"
                              required
                              value={user.password}
                              onChange={handleChange}
                            />
                          </div>

                          <section className="flex flex-col gap-5">
                            <div className="flex" id="asda">
                              <button
                                id="ssss"
                                className="flex justify-center items-center tracking-widest text-white rounded-md bg-gray-900 px-20 py-2 text-sm font-semibold shadow-sm  ring-gray-300 hover:opacity-90 sm:mt-0 w-full h-12"
                                type="submit"
                              >
                                Register
                              </button>
                            </div>

                            <div className="flex">
                              <div
                                className="flex justify-center items-center text-white tracking-widest cursor-pointer rounded-md bg-red-500 px-20 py-2 text-sm font-semibold shadow-sm hover:bg-opacity-90 sm:mt-0 w-full h-12"
                                onClick={handleTestLogin}
                              >
                                Test Drive
                              </div>
                            </div>
                          </section>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 flex justify-center text-sm">
                <div className="flex place-items-center font-bold tracking-wider pb-2 pt-2">
                  Already a member?{' '}
                  <span
                    className="text-gray-500 hover:text-gray-800 pl-2 cursor-pointer"
                    onClick={renderSignIn}
                  >
                    {' '}
                    Sign in
                  </span>
                </div>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
