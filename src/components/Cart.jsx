import React from 'react';
import { useCart } from 'context/CartContext';
import CartItem from './CartItem';
import { ShoppingCart } from "react-feather";
import { Link } from 'react-router-dom';
import { Button } from '@windmill/react-ui';
import { formatCurrency } from 'helpers/formatCurrency'

export default function Cart({ setShow }) {
    const { cartData, isLoading, cartSubtotal } = useCart();
    return (
        !isLoading && (
            <div className="fixed inset-0 overflow-hidden z-30" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button onClick={() => setShow(false)} type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Close panel</span>
                                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul className="-my-6 divide-y divide-gray-200">
                                                <div className='flex justify-center'>
                                                    {
                                                        cartData?.items?.length === 0 && (
                                                            <li className="flex py-6">
                                                                <div className="h-full flex flex-col justify-center items-center">
                                                                    <ShoppingCart size={150} />
                                                                    <p>Cart is empty</p>
                                                                    <Button tag={Link} to="/">
                                                                        Continue shopping
                                                                    </Button>
                                                                </div>
                                                            </li>
                                                        )
                                                    }
                                                </div>
                                                {cartData?.items?.map((item) => {
                                                    return (
                                                        <CartItem setShow={setShow} item={item} key={item.product_id} />
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>{formatCurrency(cartSubtotal)}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <Link tag={Link}
                                            to={{
                                                pathname: "/cart/checkout",
                                                state: {
                                                    fromCartPage: true,
                                                },
                                            }}
                                            className="flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700">Checkout</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
