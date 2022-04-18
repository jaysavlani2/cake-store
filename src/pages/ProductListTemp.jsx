import { Card, Pagination, Button } from "@windmill/react-ui";
import Product from "components/Product";
import Spinner from "components/Spinner";
import { useProduct } from "context/ProductContext";
import Layout from "layout/Layout";
import React, { useState } from "react";
import Rating from "components/Rating";

const ProductList = () => {
  const { products, setPage } = useProduct();

  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [mobileFilter, setMobileFilter] = useState(false);
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const [menu3, setMenu3] = useState(false);

  const [brand, setBrand] = useState("");
  const [ram, setRam] = useState("");
  const [battery, setBattery] = useState("");
  const [price, setPrice] = useState([{ "Lower": 0, "Upper": 5000 }]);
  const [sort, setSort] = useState("");
  const [rating, setRating] = useState(0);

  function transformProducts() {
    let sortedProducts = products;

    if (brand) {
      sortedProducts = sortedProducts.filter(
        (prod) => brand === prod.brandname
      );
    }

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (price) {
      sortedProducts = sortedProducts.filter(
        (prod) => (prod.price >= price[0].Lower && prod.price <= price[0].Upper)
      );
    }

    return sortedProducts;
  };

  console.log(products);


  function clrFilter() {
    setBrand("")
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
      <div className="flex flex-no-wrap text-gray-700 bg-gray-100 mt-8 md:mt-16 lg:mt-16 mx-auto px-4 md:px-0 flex-grow h-full w-full">


        {/* Sidebar starts */}
        <div className="absolute lg:relative md:relative w-64 lg:w-80 h-screen shadow bg-gray-100 hidden lg:block md:block hidden px-8">
          <div className="h-16 w-full flex items-center px-8">
            <svg xmlns="http://www.w3.org/2000/svg" width={144} height={30} viewBox="0 0 144 30">
              <path
                fill="#5F7DF2"
                d="M80.544 9.48c1.177 0 2.194.306 3.053.92.86.614 1.513 1.45 1.962 2.507.448 1.058.673 2.247.673 3.568 0 1.303-.233 2.473-.699 3.51-.465 1.037-1.136 1.851-2.012 2.444-.876.592-1.885.888-3.028.888-1.405 0-2.704-.554-3.897-1.663v4.279h2.64v3.072h-9.14v-3.072h2.26V12.78H70.45V9.657h6.145v1.663l.209-.21c1.123-1.087 2.369-1.63 3.74-1.63zm17.675 0c1.176 0 2.194.306 3.053.92.859.614 1.513 1.45 1.961 2.507.449 1.058.673 2.247.673 3.568 0 1.303-.233 2.473-.698 3.51-.466 1.037-1.136 1.851-2.012 2.444-.876.592-1.886.888-3.028.888-1.405 0-2.704-.554-3.898-1.663v4.279h2.64v3.072h-9.14v-3.072h2.26V12.78h-1.904V9.657h6.144v1.663l.21-.21c1.122-1.087 2.368-1.63 3.739-1.63zM24.973 1c1.13 0 2.123.433 2.842 1.133 0 .004 0 .008.034.012 1.54 1.515 1.54 3.962-.034 5.472-.035.029-.069.058-.069.089-.719.65-1.712 1.05-2.773 1.05-.719 0-1.37.061-1.985.184-2.363.474-3.8 1.86-4.28 4.13-.114.489-.18 1.02-.2 1.59l-.003.176.001-.034.002.034c.022.505-.058 1.014-.239 1.495l-.076.182.064-.157c.106-.28.18-.575.217-.881l.008-.084-.026.195c-.286 1.797-1.858 3.188-3.754 3.282l-.204.005h-.103l-.103.002h-.034c-.65.012-1.232.072-1.78.181-2.328.473-3.765 1.863-4.279 4.139-.082.417-.142.863-.163 1.339l-.008.362v.23c0 2.02-1.603 3.681-3.661 3.861L4.16 29l-.48-.01c-.958-.073-1.849-.485-2.499-1.113-1.522-1.464-1.573-3.808-.152-5.33l.152-.154.103-.12c.719-.636 1.677-1.026 2.704-1.026.754 0 1.404-.062 2.02-.184 2.362-.475 3.8-1.86 4.28-4.126.136-.587.17-1.235.17-1.942 0-.991.411-1.896 1.027-2.583.069-.047.137-.097.172-.15.068-.051.102-.104.17-.159.633-.564 1.498-.925 2.408-.978l.229-.007h.034c.068 0 .171.003.274.009.616-.014 1.198-.074 1.746-.18 2.328-.474 3.766-1.863 4.279-4.135.082-.44.142-.912.163-1.418l.008-.385v-.132c0-2.138 1.78-3.872 4.005-3.877zm-.886 10c1.065 0 1.998.408 2.697 1.073.022.011.03.024.042.036l.025.017v.015c1.532 1.524 1.532 3.996 0 5.52-.034.03-.067.06-.067.09-.7.655-1.665 1.056-2.697 1.056-.7 0-1.332.062-1.932.186-2.298.477-3.696 1.873-4.163 4.157-.133.591-.2 1.242-.2 1.95 0 1.036-.399 1.975-1.032 2.674l-.1.084c-.676.679-1.551 1.055-2.441 1.13l-.223.012-.366-.006c-.633-.043-1.3-.254-1.865-.632-.156-.096-.296-.201-.432-.315l-.2-.177v-.012c-.734-.735-1.133-1.72-1.133-2.757 0-2.078 1.656-3.793 3.698-3.899l.198-.005h.133c.666-.007 1.266-.069 1.832-.185 2.265-.476 3.663-1.874 4.163-4.161.08-.442.139-.916.159-1.424l.008-.387v-.136c0-2.153 1.731-3.899 3.896-3.904zm3.882 11.025c1.375 1.367 1.375 3.583 0 4.95s-3.586 1.367-4.96 0c-1.345-1.367-1.345-3.583 0-4.95 1.374-1.367 3.585-1.367 4.96 0zm94.655-12.672c1.405 0 2.628.323 3.669.97 1.041.648 1.843 1.566 2.406 2.756.563 1.189.852 2.57.87 4.145h-9.954l.03.251c.132.906.476 1.633 1.03 2.18.605.596 1.386.895 2.343.895 1.058 0 2.09-.525 3.097-1.574l3.301 1.066-.203.291c-.69.947-1.524 1.67-2.501 2.166-1.075.545-2.349.818-3.821.818-1.473 0-2.774-.277-3.904-.831-1.13-.555-2.006-1.34-2.628-2.355-.622-1.016-.933-2.21-.933-3.58 0-1.354.324-2.582.971-3.682s1.523-1.961 2.628-2.583c1.104-.622 2.304-.933 3.599-.933zm13.955.126c1.202 0 2.314.216 3.339.648v-.47h3.034v3.91h-3.034l-.045-.137c-.317-.848-1.275-1.272-2.875-1.272-1.21 0-1.816.339-1.816 1.016 0 .296.161.516.483.66.321.144.791.262 1.409.355 1.735.22 3.102.536 4.1.946 1 .41 1.697.919 2.095 1.524.398.605.597 1.339.597 2.202 0 1.405-.48 2.5-1.441 3.282-.96.783-2.266 1.174-3.917 1.174-1.608 0-2.7-.321-3.275-.964V23h-3.098v-4.596h3.098l.032.187c.116.547.412.984.888 1.311.53.364 1.183.546 1.962.546.762 0 1.324-.087 1.688-.26.364-.174.546-.476.546-.908 0-.296-.076-.527-.228-.692-.153-.165-.447-.31-.883-.438-.435-.127-1.102-.27-2-.431-1.997-.313-3.433-.82-4.31-1.517-.875-.699-1.313-1.64-1.313-2.825 0-1.21.455-2.162 1.365-2.856.91-.695 2.11-1.042 3.599-1.042zm-69.164.178v10.27h1.98V23h-8.24v-3.072h2.032V12.78h-2.031V9.657h6.259zm-16.85-5.789l.37.005c1.94.05 3.473.494 4.6 1.335 1.198.892 1.797 2.185 1.797 3.878 0 1.168-.273 2.15-.819 2.945-.546.796-1.373 1.443-2.482 1.943l3.085 5.776h2.476V23h-5.827l-4.317-8.366h-2.183v5.116h2.4V23H39.646v-3.25h2.628V7.118h-2.628v-3.25h10.918zm61.329 0v16.06h1.892V23h-8.24v-3.072h2.082v-13h-2.082v-3.06h6.348zm-32.683 9.04c-.812 0-1.462.317-1.949.951-.486.635-.73 1.49-.73 2.565 0 1.007.252 1.847.756 2.52.503.673 1.161 1.01 1.974 1.01.838 0 1.481-.312 1.93-.934.448-.622.672-1.504.672-2.647 0-1.092-.228-1.942-.685-2.552-.457-.61-1.113-.914-1.968-.914zm17.675 0c-.813 0-1.463.317-1.95.951-.486.635-.73 1.49-.73 2.565 0 1.007.253 1.847.756 2.52.504.673 1.162 1.01 1.974 1.01.838 0 1.481-.312 1.93-.934.449-.622.673-1.504.673-2.647 0-1.092-.229-1.942-.686-2.552-.457-.61-1.113-.914-1.967-.914zM14.1 0C16.267 0 18 1.743 18 3.894v.01c0 2.155-1.733 3.903-3.9 3.903-4.166 0-6.3 2.133-6.3 6.293 0 2.103-1.667 3.817-3.734 3.9l-.5-.009c-.933-.075-1.8-.49-2.433-1.121C.4 16.134 0 15.143 0 14.1c0-2.144 1.733-3.903 3.9-3.903 4.166 0 6.3-2.133 6.3-6.294C10.2 1.751 11.934.005 14.1 0zm108.32 12.184c-.76 0-1.372.22-1.834.66-.46.44-.75 1.113-.87 2.018h5.561c-.118-.795-.442-1.44-.97-1.936-.53-.495-1.158-.742-1.886-.742zM49.525 7.118h-2.26v4.444h1.829c2.023 0 3.034-.754 3.034-2.26 0-.728-.233-1.274-.698-1.638-.466-.364-1.1-.546-1.905-.546zm15.821-3.593c.635 0 1.183.231 1.644.692.462.462.692 1.01.692 1.644 0 .677-.23 1.238-.692 1.682-.46.445-1.009.667-1.644.667-.643 0-1.195-.23-1.656-.692-.462-.461-.692-1.013-.692-1.657 0-.634.23-1.182.692-1.644.46-.461 1.013-.692 1.656-.692zM5.991 1.171c1.345 1.563 1.345 4.095 0 5.658-1.374 1.561-3.585 1.561-4.96 0-1.375-1.563-1.375-4.095 0-5.658 1.375-1.561 3.586-1.561 4.96 0z"
              />
            </svg>
          </div>
          <section className="mb-4">
            <h6 className="fw-bold mb-3">Product Category</h6>

            <div className="d-flex flex-wrap my-2">
              <label className="fw-bold">Select Category</label>

              <div className="w-100">
                <select onChange={(e) => setBrand(e.target.value)} id="sort" className="mdb-select md-form md-outline" value={brand}>
                  <option value="">All</option>
                  <option value="men's clothing">Men's clothong</option>
                  <option value="women's clothing">Women's clothong</option>
                  <option value="jewelery">Jewellery</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>
            </div>

            <div className="d-flex flex-wrap py-2 border-t">
              <label className="fw-bold">Categories</label>
              <div className="select-outline position-relative w-100">
                <div>
                  <input type="radio" id="lowToHigh" name="lowToHigh" value="lowToHigh" onChange={() => setPrice([{ "Lower": 0, "Upper": 10000 }])} checked={(price[0].Lower === 0 && price[0].Upper === 10000) ? true : false} />
                  <label htmlFor="lowToHigh">Lower Budjet Smartphone</label>
                </div>

                <div>
                  <input type="radio" id="highToLow" name="highToLow" value="highToLow" onChange={() => setPrice([{ "Lower": 10000, "Upper": 20000 }])} checked={price[0].Lower === 10000 ? true : false} />
                  <label htmlFor="highToLow">Budjet Smartphone</label>
                </div>

                <div>
                  <input type="radio" id="highToLow" name="highToLow" value="highToLow" onChange={() => setPrice([{ "Lower": 20000, "Upper": 40000 }])} checked={price[0].Lower === 20000 ? true : false} />
                  <label htmlFor="highToLow">Midrange Smartphone</label>
                </div>

                <div>
                  <input type="radio" id="highToLow" name="highToLow" value="highToLow" onChange={() => setPrice([{ "Lower": 40000, "Upper": 200000 }])} checked={price[0].Lower === 40000 ? true : false} />
                  <label htmlFor="highToLow">Flagship Smartphone</label>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap py-2 border-t">
              <label className="fw-bold">Sort by Price</label>
              <div className="select-outline position-relative w-100">
                <div>
                  <input type="radio" id="lowToHigh" name="lowToHigh" value="lowToHigh" onChange={() => setSort("lowToHigh")} checked={sort === "lowToHigh" ? true :false} />
                  <label htmlFor="lowToHigh">Low To High</label>
                </div>

                <div>
                  <input type="radio" id="highToLow" name="highToLow" value="highToLow" onChange={() => setSort("highToLow")} checked={sort === "highToLow" ? true :false} />
                  <label htmlFor="highToLow">High To Low</label>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap py-2 border-t">
              <label className="text-bold">Sort by Rating</label>
              <div className="flex flex-wrap w-100">
                <Rating onClick={(e) => setRating(e + 1)} rating={rating} />
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
            <h3 className="-mx-2 -my-3 flow-root">
              {/* <!-- Expand/collapse section button --> */}
              <button type="button" className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                <span className="font-medium text-gray-900"> Color </span>
                <span className="ml-6 flex items-center">
                  {/* <!--
                    Expand icon, show/hide based on section open state.

                    Heroicon name: solid/plus-sm
                  --> */}
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                  </svg>
                  {/* <!--
                    Collapse icon, show/hide based on section open state.

                    Heroicon name: solid/minus-sm
                  --> */}
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                  </svg>
                </span>
              </button>
            </h3>
            {/* <!-- Filter section, show/hide based on section state. --> */}
            <div className="pt-6" id="filter-section-mobile-0">
              <div className="space-y-6">
                <div className="flex items-center">
                  <input id="filter-mobile-color-0" name="color[]" value="white" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"/>
                  <label for="filter-mobile-color-0" className="ml-3 min-w-0 flex-1 text-gray-500"> White </label>
                </div>

                <div className="flex items-center">
                  <input id="filter-mobile-color-1" name="color[]" value="beige" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"/>
                  <label for="filter-mobile-color-1" className="ml-3 min-w-0 flex-1 text-gray-500"> Beige </label>
                </div>

                <div className="flex items-center">
                  <input id="filter-mobile-color-2" name="color[]" value="blue" type="checkbox" checked className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"/>
                  <label for="filter-mobile-color-2" className="ml-3 min-w-0 flex-1 text-gray-500"> Blue </label>
                </div>

                <div className="flex items-center">
                  <input id="filter-mobile-color-3" name="color[]" value="brown" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"/>
                  <label for="filter-mobile-color-3" className="ml-3 min-w-0 flex-1 text-gray-500"> Brown </label>
                </div>

                <div className="flex items-center">
                  <input id="filter-mobile-color-4" name="color[]" value="green" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"/>
                  <label for="filter-mobile-color-4" className="ml-3 min-w-0 flex-1 text-gray-500"> Green </label>
                </div>

                <div className="flex items-center">
                  <input id="filter-mobile-color-5" name="color[]" value="purple" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"/>
                  <label for="filter-mobile-color-5" className="ml-3 min-w-0 flex-1 text-gray-500"> Purple </label>
                </div>
              </div>
            </div>
          </div>

          </section>
          <Button className="btn btn-outline-dark" onClick={() => clrFilter()}>Clear Filters</Button>
          {/* <ul aria-orientation="vertical" className=" py-6">
            <li className="pl-6 cursor-pointer text-white text-sm leading-3 tracking-normal pb-4 pt-5 text-indigo-700 focus:text-indigo-700 focus:outline-none">
              <div className="flex items-center">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x={4} y={4} width={6} height={6} rx={1} />
                    <rect x={14} y={4} width={6} height={6} rx={1} />
                    <rect x={4} y={14} width={6} height={6} rx={1} />
                    <rect x={14} y={14} width={6} height={6} rx={1} />
                  </svg>
                </div>
                <span className="ml-2">Dashboard</span>
              </div>
            </li>
            <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-4 mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                </svg>
                <span className="ml-2">Products</span>
              </div>
            </li>
            <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mb-4 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-compass" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="8 16 10 10 16 8 14 14 8 16" />
                  <circle cx={12} cy={12} r={9} />
                </svg>
                <span className="ml-2">Performance</span>
              </div>
            </li>
            <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="7 8 3 12 7 16" />
                  <polyline points="17 8 21 12 17 16" />
                  <line x1={14} y1={4} x2={10} y2={20} />
                </svg>
                <span className="ml-2">Deliverables</span>
              </div>
            </li>
          </ul> */}
        </div>
        {/* Sidebar  */}


        {/*Mobile responsive sidebar*/}
        {mobileFilter &&
          <div className="fixed inset-0 overflow-hidden z-20" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg text-3xl font-bold text-gray-600" id="slide-over-title">Filter Products</h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button onClick={() => setMobileFilter(false)} type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Close panel</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <section className="mb-4">
                            <h6 className="fw-bold mb-3">Product Category</h6>

                            <div className="d-flex flex-wrap my-2">
                              <label className="fw-bold">Select Category</label>

                              <div className="w-100">
                                <select onChange={(e) => setBrand(e.target.value)} id="sort" className="mdb-select md-form md-outline" value={brand}>
                                  <option value="">All</option>
                                  <option value="men's clothing">Men's clothong</option>
                                  <option value="women's clothing">Women's clothong</option>
                                  <option value="jewelery">Jewellery</option>
                                  <option value="electronics">Electronics</option>
                                </select>
                              </div>
                            </div>

                            <div className="d-flex flex-wrap my-2">
                              <label className="fw-bold">Categories</label>
                              <div className="select-outline position-relative w-100">
                                <div>
                                  <input type="radio" id="lowToHigh" name="lowToHigh" value="lowToHigh" onChange={() => setPrice([{ "Lower": 0, "Upper": 10000 }])} checked={(price[0].Lower === 0 && price[0].Upper === 10000) ? true : false} />
                                  <label htmlFor="lowToHigh">Lower Budjet Smartphone</label>
                                </div>

                                <div>
                                  <input type="radio" id="highToLow" name="highToLow" value="highToLow" onChange={() => setPrice([{ "Lower": 10000, "Upper": 20000 }])} checked={price[0].Lower === 10000 ? true : false} />
                                  <label htmlFor="highToLow">Budjet Smartphone</label>
                                </div>

                                <div>
                                  <input type="radio" id="highToLow" name="highToLow" value="highToLow" onChange={() => setPrice([{ "Lower": 20000, "Upper": 40000 }])} checked={price[0].Lower === 20000 ? true : false} />
                                  <label htmlFor="highToLow">Midrange Smartphone</label>
                                </div>

                                <div>
                                  <input type="radio" id="highToLow" name="highToLow" value="highToLow" onChange={() => setPrice([{ "Lower": 40000, "Upper": 200000 }])} checked={price[0].Lower === 40000 ? true : false} />
                                  <label htmlFor="highToLow">Flagship Smartphone</label>
                                </div>
                              </div>
                            </div>

                            <div className="d-flex flex-wrap my-2">
                              <label className="fw-bold">Sort by Price</label>
                              <div className="select-outline position-relative w-100">
                                <div>
                                  <input type="radio" id="lowToHigh" name="lowToHigh" value="lowToHigh" onChange={() => setSort("lowToHigh")} checked={sort !== "lowToHigh" ? false : true} />
                                  <label htmlFor="lowToHigh">Low To High</label>
                                </div>

                                <div>
                                  <input type="radio" id="highToLow" name="highToLow" value="highToLow" onChange={() => setSort("highToLow")} checked={sort !== "highToLow" ? false : true} />
                                  <label htmlFor="highToLow">High To Low</label>
                                </div>
                              </div>
                            </div>

                            <div className="d-flex flex-wrap">
                              <label className="text-bold">Sort by Rating</label>
                              <div className="flex flex-wrap w-100">
                                <Rating onClick={(e) => setRating(e + 1)} rating={rating} />
                              </div>
                            </div>
                          </section>

                        </div>
                      </div>

                      {/* <div className="mt-8">
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
                      </div> */}
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      {/* <div className="flex justify-between text-base font-medium text-gray-900">
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
                      </div> */}
                      <Button className="btn btn-outline-dark" onClick={() => clrFilter()}>Clear Filters</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {/*Mobile responsive sidebar*/}
        {/* Sidebar ends */}

        <div className="w-full  bg-gray-100">
          <div className="container lg:px-8 py-10 md:py-2 lg:py-2 mx-auto">
            <nav className="h-16 flex items-center lg:items-stretch justify-end lg:justify-between bg-white shadow  lg:hidden md:hidden">
              <span className="Uppercase font-bold text-xl">Filter</span>
              <div className="text-gray-600 mr-8 visible lg:hidden relative" onClick={() => setMobileFilter(!mobileFilter)}>
                {mobileFilter ? (" ") : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1 0h22l-9 15.094v8.906l-4-3v-5.906z" /></svg>
                }
              </div>
            </nav>

            <Card className="flex bg-gray-100 flex-wrap h-full mx-2">
              {transformProducts()?.map((prod) => (
                <Product product={prod} key={prod.product_id} />
              ))}
            </Card>

            <Pagination
              className="pt-3"
              totalResults={35}
              resultsPerPage={12}
              onChange={handleChange}
              label="Page navigation"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;
