import { Badge, Button, Dropdown, DropdownItem } from "@windmill/react-ui";
import { useCart } from "context/CartContext";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, ShoppingCart, User } from "react-feather";
import { useUser } from "context/UserContext";
import { Transition } from "@windmill/react-ui";
import toast from "react-hot-toast";
import Cart from "./Cart";
import './Navbar.css'

const Nav = () => {
  const [show, setShow] = useState(false);
  const { cartTotal } = useCart();
  const { isLoggedIn, userData, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // blur-backdrop-filter bg-opacity-80 bg-clip-padding

  return (
    <>

      <Transition
        show={show}
        enter="transition ease-in-out duration-150"
      enterFrom="opacity-0 transform translate-x-20"
      enterTo="opacity-100"
      leave="transition ease-in-out duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 transform translate-x-20"
      >
        <Cart setShow={setShow} />
      </Transition>

      <nav className="bg-opacity-80 blur-backdrop-filter flex items-center justify-between px-2 lg:px-36 py-2 shadow-lg fixed w-full bg-white top-0 z-20 border-b-2 border-purple-600">
        <Link
          to="/"
          className="text-gray-700 text-2xl font-bold dark:text-gray-400"
        >
          <h1 className="uppercase">Cake Store</h1>
        </Link>
        <ul className="flex md:space-x-4">
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/login">
                  <Button layout="link">
                    <span>login</span>
                  </Button>
                </Link>
              </li>
              <li>
                <Button onClick={() => setShow(true)} layout="link">
                  <span className="lg:block hidden">Cart</span>
                  <ShoppingCart className="lg:hidden" />
                  <Badge className="ml-2" type="danger">
                    {cartTotal}
                  </Badge>{" "}
                </Button>
              </li>
            </>
          )}



          {isLoggedIn && (
            <>
              <li>
                <Button onClick={() => { setIsDropdownOpen(false); setShow(true); }} layout="link">
                  <span className="lg:block hidden">Cart</span>
                  <ShoppingCart className="lg:hidden" />
                  <Badge className="ml-2" type="danger">
                    {cartTotal}
                  </Badge>{" "}
                </Button>
              </li>

              <li onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <Button layout="link">
                  <span className="lg:block hidden">Account</span>
                  <User className="lg:hidden" />
                </Button>
                <Transition
                  show={isDropdownOpen}
                  enter="transition ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dropdown
                    align="right"
                    isOpen={isDropdownOpen}
                    className="z-10 md:mr-20"
                  >
                    <DropdownItem className="cursor-not-allowed text-gray-400 border-b flex flex-col items-start justify-start">
                      <p className="self-start">
                        {userData?.fullname?.split(" ").join(" ")}
                      </p>
                      <p className="self-start">@{userData?.username}</p>
                    </DropdownItem>
                    <DropdownItem >
                      <Link className="w-full text-left" to="/profile">
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem >
                      <Link className="w-full text-left" to="/orders">
                        Orders
                      </Link>
                    </DropdownItem>
                    <DropdownItem className="border-t">
                      <Link
                        className="w-full"
                        onClick={() => { logout(); toast.success("Logout successful 🔒", { style: { borderRadius: "0px" } }); }}
                        to="/login"
                      >
                        <Button iconRight={LogOut} block>
                          Logout
                        </Button>
                      </Link>
                    </DropdownItem>
                  </Dropdown>
                </Transition>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
