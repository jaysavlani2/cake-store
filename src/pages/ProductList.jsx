/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { Card, Pagination, Button } from "@windmill/react-ui";
import Product from "components/Product";
import Spinner from "components/Spinner";
import { useProduct } from "context/ProductContext";
import Layout from "layout/Layout";
import React, { useState } from "react";

const ProductList = () => {
  const { products, setPage } = useProduct();

  const [cakeFilter, setCakeFilter] = useState(false);
  const [sortCard, setSortCard] = useState(false);
  const [categoryCard, setCategoryCard] = useState(false);
  const [brandCard, setBrandCard] = useState(false);

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState([{ "Lower": 0, "Upper": 5000 }]);
  const [sort, setSort] = useState("");

  function transformProducts() {
    let sortedProducts = products;

    if (brand) {
      sortedProducts = sortedProducts.filter(
        (prod) => brand === prod.category
      );
    }

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (price[0]) {
      sortedProducts = sortedProducts.filter(
        (prod) => (prod.price >= price[0].Lower && prod.price <= price[0].Upper)
      );
    }

    // if (battery) {
    //   sortedProducts = sortedProducts.filter(
    //     (prod) => {
    //       let tempBattery = parseInt((prod.battery).substr(0, 4))
    //       return (tempBattery >= battery[0].Lower && tempBattery <= battery[0].Upper)
    //     }
    //   )
    // }

    return sortedProducts;
  };

  console.log(products);


  function clrFilter() {
    setBrand("");
    setSort("");
    setPrice([{ "Lower": 0, "Upper": 5000 }]);

  }


  const handleChange = (page) => {
    setPage(page);
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  if (!products) {
    return (
      <>
        <Layout>
          <Spinner size={100} loading />
        </Layout>
      </>
    );
  }

  return (
    <Layout>
      <div className="bg-white">
        <div>
          {cakeFilter &&
            <div className="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
              <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true"></div>
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg text-2xl font-bold tracking-wider text-gray-900">Filters</h2>
                  <button onClick={() => setCakeFilter(!cakeFilter)} type="button" className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400">
                    <span className="sr-only">Close menu</span>
                    {/* <!-- Heroicon name: outline/x --> */}
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* <!-- Filters --> */}
                <form className="mt-4 border-t border-gray-200">
                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button onClick={() => setBrandCard(!brandCard)} type="button" className="px-2 py-3 bg-white focus:outline-none w-full flex items-center justify-between text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-1" aria-expanded="false">
                        <span className="font-medium text-gray-900 uppercase">BY TYPES</span>
                        <span className="ml-6 flex items-center">
                          {(brandCard === false) &&
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                          }
                          {(brandCard === true) &&
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                            </svg>
                          }
                        </span>
                      </button>
                    </h3>
                    {brandCard &&
                      <div className="pt-6">
                        <ul role="list" className="font-medium text-gray-900 space-y-4">
                          <li>
                            <a onClick={() => setBrand("All Cakes")} className={`${brand === "All Cakes" && "text-purple-500"} block text-gray-500 px-2`} href="#" >All Cakes</a>
                          </li>

                          <li>
                            <a onClick={() => setBrand("Photo Cakes")} className={`${brand === "Photo Cakes" && "text-purple-500"} block text-gray-500 px-2`} href="#" >Photo Cakes</a>
                          </li>

                          <li>
                            <a onClick={() => setBrand("Designer Cakes")} className={`${brand === "Designer Cakes" && "text-purple-500"} block text-gray-500 px-2`} href="#" >Designer Cakes</a>
                          </li>

                          <li>
                            <a onClick={() => setBrand("Eggless Cakes")} className={`${brand === "Eggless Cakes" && "text-purple-500"} block text-gray-500 px-2`} href="#" >Eggless Cakes</a>
                          </li>

                          <li>
                            <a onClick={() => setBrand("Dry Cakes")} className={`${brand === "Dry Cakes" && "text-purple-500"} block text-gray-500 px-2`} href="#" >Dry Cakes</a>
                          </li>

                        </ul>
                      </div>
                    }
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button onClick={() => setCategoryCard(!categoryCard)} type="button" className="px-2 py-3 bg-white focus:outline-none w-full flex items-center justify-between text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-1" aria-expanded="false">
                        <span className="font-medium text-gray-900 uppercase">PRICE RANGE</span>
                        <span className="ml-6 flex items-center">
                          {(categoryCard === false) &&
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                          }
                          {(categoryCard === true) &&
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                            </svg>
                          }
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter section, show/hide based on section state. --> */}
                    {categoryCard &&
                      <div className="pt-6" id="filter-section-mobile-1">
                        <div className="space-y-6">
                          <div className="flex items-center">
                            <input className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" type="radio" value={[{ "Lower": 0, "Upper": 500 }]} onChange={() => setPrice([{ "Lower": 0, "Upper": 500 }])} checked={(price[0].Lower === 0 && price[0].Upper === 500) ? true : false} />
                            <label htmlFor="low budget" className={`ml-3 text-md text-gray-500 ${(price[0].Upper === 500) && "text-purple-500"}`}>Under ₹500 </label>
                          </div>

                          <div className="flex items-center">
                            <input className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" type="radio" value={[{ "Lower": 501, "Upper": 1000 }]} onChange={() => setPrice([{ "Lower": 501, "Upper": 1000 }])} checked={price[0].Lower === 501 ? true : false} />
                            <label htmlFor="budget" className={`ml-3 text-md text-gray-500 ${(price[0].Lower === 501) && "text-purple-500"}`}>₹501 - ₹1000</label>
                          </div>

                          <div className="flex items-center">
                            <input className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" type="radio" value={[{ "Lower": 1001, "Upper": 1500 }]} onChange={() => setPrice([{ "Lower": 1001, "Upper": 1500 }])} checked={price[0].Lower === 1001 ? true : false} />
                            <label htmlFor="midrange" className={`ml-3 text-md text-gray-500 ${(price[0].Lower === 1001) && "text-purple-500"}`}>₹1001 - ₹1500</label>
                          </div>

                          <div className="flex items-center">
                            <input className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" type="radio" value={[{ "Lower": 1501, "Upper": 5000 }]} onChange={() => setPrice([{ "Lower": 1501, "Upper": 5000 }])} checked={price[0].Lower === 1501 ? true : false} />
                            <label htmlFor="flagship" className={`ml-3 text-md text-gray-500 ${(price[0].Lower === 1501) && "text-purple-500"}`}>Over ₹1500</label>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </form>
              </div>
            </div>
          }


          {/*
          ===========================================================================
          ===========================================================================
          Normal sidebar filter
          ===========================================================================
          ===========================================================================
          */}
          <main className="px-4 sm:px-6">
            <div className=" flex items-baseline justify-between pt-20 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Bakers make the world smell better</h1>

              <div className="flex items-center">
                <div className="relative inline-block text-left">
                  <button onClick={() => setSortCard(!sortCard)} type="button" className="focus:outline-none group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                    Sort
                    {/* <!-- Heroicon name: solid/chevron-down --> */}
                    <svg className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  {sortCard &&
                    <div className="origin-top-right z-10 absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                      <div className="py-1" role="none">
                        {/* <!--
                  Active: "bg-gray-100", Not Active: ""

                  Selected: "font-medium text-gray-900", Not Selected: "text-gray-500"
                --> */}
                        <a href="#" onClick={() => setSort("lowToHigh")} className={`${sort === "lowToHigh" && "text-gray-900"} text-gray-500 block px-4 py-2 text-sm`} role="menuitem" tabindex="-1" id="menu-item-3"> Price: Low to High </a>

                        <a href="#" onClick={() => setSort("highToLow")} className={`${sort === "highToLow" && "text-gray-900"} text-gray-500 block px-4 py-2 text-sm`} role="menuitem" tabindex="-1" id="menu-item-4"> Price: High to Low </a>
                      </div>
                    </div>
                  }
                </div>
                <button type="button" onClick={() => setCakeFilter(!cakeFilter)} className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden">
                  <span className="sr-only">Filters</span>
                  {/* <!-- Heroicon name: solid/filter --> */}
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">Products</h2>

              <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-8 gap-y-10">
                {/* <!-- Filters --> */}
                <form className="hidden lg:block">
                  <div className="pb-6">
                    <h3 className="-my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button onClick={() => setBrandCard(!brandCard)} type="button" className="py-3 bg-white focus:outline-none w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                        <span className="font-medium text-gray-900 uppercase">BY TYPES</span>
                        <span className="ml-6 flex items-center">
                          {(brandCard === false) &&
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                          }
                          {(brandCard === true) &&
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                            </svg>
                          }
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter section, show/hide based on section state. --> */}
                    {brandCard &&
                      <div className="pt-6">
                        <ul role="list" className="text-sm font-medium text-gray-900 space-y-4 border-gray-200">
                          <li>
                            <a onClick={() => setBrand("")} className={`${brand === "" && "text-purple-500"} text-gray-500`} href="#">All Cakes</a>
                          </li>

                          <li>
                            <a onClick={() => setBrand("Photo Cakes")} className={`${brand === "Photo Cakes" && "text-purple-500"} text-gray-500`} href="#">Photo Cakes</a>
                          </li>

                          <li>
                            <a onClick={() => setBrand("Designer Cakes")} className={`${brand === "Designer Cakes" && "text-purple-500"} text-gray-500`} href="#">Designer Cakes</a>
                          </li>

                          <li>
                            <a onClick={() => setBrand("Eggless Cakes")} className={`${brand === "Eggless Cakes" && "text-purple-500"} text-gray-500`} href="#">Eggless Cakes</a>
                          </li>

                          <li>
                            <a onClick={() => setBrand("Dry Cakes")} className={`${brand === "Dry Cakes" && "text-purple-500"} text-gray-500`} href="#">Dry Cakes</a>
                          </li>

                        </ul>
                      </div>
                    }
                  </div>

                  <div className="border-t border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button onClick={() => setCategoryCard(!categoryCard)} type="button" className="py-3 bg-white focus:outline-none w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                        <span className="font-medium text-gray-900 uppercase">Price Range</span>
                        <span className="ml-6 flex items-center">
                          {(categoryCard === false) &&
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                          }
                          {(categoryCard === true) &&
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                            </svg>
                          }
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter section, show/hide based on section state. --> */}
                    {categoryCard &&
                      <div className="pt-6" id="filter-section-1">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" type="radio" value={[{ "Lower": 0, "Upper": 500 }]} onChange={() => setPrice([{ "Lower": 0, "Upper": 500 }])} checked={(price[0].Lower === 0 && price[0].Upper === 500) ? true : false} />
                            <label htmlFor="low budget" className={`ml-3 text-sm text-gray-600 ${(price[0].Upper === 500) && "text-purple-500"}`}>Under ₹500 </label>
                          </div>

                          <div className="flex items-center">
                            <input className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" type="radio" value={[{ "Lower": 501, "Upper": 1000 }]} onChange={() => setPrice([{ "Lower": 501, "Upper": 1000 }])} checked={price[0].Lower === 501 ? true : false} />
                            <label htmlFor="budget" className={`ml-3 text-sm text-gray-600 ${(price[0].Lower === 501) && "text-purple-500"}`}>₹501 - ₹1000</label>
                          </div>

                          <div className="flex items-center">
                            <input className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" type="radio" value={[{ "Lower": 1001, "Upper": 1500 }]} onChange={() => setPrice([{ "Lower": 1001, "Upper": 1500 }])} checked={price[0].Lower === 1001 ? true : false} />
                            <label htmlFor="midrange" className={`ml-3 text-sm text-gray-600 ${(price[0].Lower === 1001) && "text-purple-500"}`}>₹1001 - ₹1500</label>
                          </div>

                          <div className="flex items-center">
                            <input className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" type="radio" value={[{ "Lower": 1501, "Upper": 5000 }]} onChange={() => setPrice([{ "Lower": 1501, "Upper": 5000 }])} checked={price[0].Lower === 1501 ? true : false} />
                            <label htmlFor="flagship" className={`ml-3 text-sm text-gray-600 ${(price[0].Lower === 1501) && "text-purple-500"}`}>Over ₹1500</label>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <Button className="w-full rounder-nune" onClick={() => clrFilter()}>Clear Filters</Button>
                </form>

                {/* <!-- Product grid --> */}
                <div className="lg:col-span-5">
                  {/* <!-- Replace with your content --> */}
                  <div className="h-full">
                    <Card className="flex flex-wrap h-full mx-2">
                      {transformProducts()?.map((prod) => (
                        <Product product={prod} key={prod.product_id} />
                      ))}
                    </Card>
                  </div>
                  <Pagination
                    className="pt-3"
                    totalResults={24}
                    resultsPerPage={12}
                    onChange={handleChange}
                    label="Page navigation"
                  />
                  {/* <!-- /End replace --> */}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

    </Layout>
  );
};

export default ProductList;
