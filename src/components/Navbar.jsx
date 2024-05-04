import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  SignedOut,
  SignedIn,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
const Navbar = () => {
  const previousActiveIndex = JSON.parse(localStorage.getItem("activeTab"));

  const [nav, setNav] = useState(false);
  const [activeLink, setActiveLink] = useState(previousActiveIndex || 0);

  const { user } = useUser();

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };
  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Home", link: "/" },
    { id: 2, text: "MARS", link: "/marsphotos" },
    { id: 3, text: "APOD", link: "/apod" },
    { id: 4, text: "NEWS", link: "/search" },
  ];

  const handleActiveLink = (index) => {
    sessionStorage.setItem("activeTab", JSON.stringify(index));
    setActiveLink(index);
  };
  return (
    <div className=" bg-black md:backdrop-blur-md flex justify-between items-center h-24 w-full mx-auto px-4 text-white sticky top-0 z-50">
      {/* Logo */}
      <Link to={"/"}>
        <h1 className="text-3xl font-bold text-[#957ffd]">NASA API</h1>
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex justify-center flex-1">
        {navItems.map((item, index) => (
          <Link
            to={item.link}
            key={item.id}
            onClick={() => handleActiveLink(index)}
          >
            <li
              key={item.id}
              className={`p-4 hover:bg-[#957ffd] ${
                activeLink === index && "bg-[#957ffd] p-4 rounded-xl"
              } rounded-xl m-2 cursor-pointer duration-300 hover:text-black`}
            >
              {item.text}
            </li>
          </Link>
        ))}
      </ul>

      {/* Sign In & Sign Up Buttons - Desktop */}

      <div className="hidden md:flex">
        <SignedOut>
          <Link to={"/signin"}>
            <button className=" p-4 bg-[#957ffd] hover:bg-[#6a4fb3] rounded-xl m-2 cursor-pointer duration-300 text-black">
              Sign In
            </button>
          </Link>
          <Link to={"/signup"}>
            <button className=" p-4 bg-[#957ffd] hover:bg-[#6a4fb3] rounded-xl m-2 cursor-pointer duration-300 text-black">
              Sign Up
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <div className="flex justify-start items-center gap-x-2">
            <h2>
              <span className="text-[#957ffd]">Welcome,</span> {user?.firstName}
            </h2>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <X className="cursor-pointer" />
        ) : (
          <Menu className="cursor-pointer" />
        )}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900  bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0  left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <div className="flex justify-between items-center m-4">
          <h1 className="text-3xl font-bold text-[#957ffd] ">NASA API</h1>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <Link to={item.link} key={item.id}>
            <li
              key={item.id}
              className="p-4 border-b rounded-xl hover:bg-[#957ffd] duration-300 hover:text-black cursor-pointer border-gray-600"
            >
              {item.text}
            </li>
          </Link>
        ))}

        {/* Sign In & Sign Up Buttons - Mobile */}
        <div className="flex justify-center mt-4 md:hidden">
          <SignedOut>
            <Link to={"/signin"}>
              <button className=" p-4 bg-[#957ffd] hover:bg-[#6a4fb3] rounded-xl m-2 cursor-pointer duration-300 text-black">
                Sign In
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className=" p-4 bg-[#957ffd] hover:bg-[#6a4fb3] rounded-xl m-2 cursor-pointer duration-300 text-black">
                Sign Up
              </button>
            </Link>
          </SignedOut>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
