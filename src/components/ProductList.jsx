// import React from "react";
// import { HiSearch, HiTrash } from "react-icons/hi";
// import { HiOutlinePencil, HiPlus } from "react-icons/hi2";
// import useSWR from "swr";
// import ProductListSkeletonLoader from "./ProductListSkeletonLoader";
// import ProductListEmptyStage from "./ProductListEmptyStage";
// import ProductRow from "./ProductRow";
// import { Link } from "react-router-dom";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

// const ProductList = () => {
//   // console.log(import.meta.env.VITE_API_URL);
//   const { data, isLoading, error } = useSWR(
//     import.meta.env.VITE_API_URL + "/products",
//     fetcher
//   );
//   return (
//     <div>
//       <div className="flex justify-between">
//         <div className="">
//           <div className="relative mb-6">
//             <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
//               <HiSearch className="w-4 h-4 text-stone-500 dark:text-gray-400" />
//             </div>
//             <input
//               type="text"
//               className="bg-gray-50 border border-gray-300 text-stone-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               placeholder="Search Product"
//             />
//           </div>
//         </div>

//         <div className="">
//           <Link to="/product/create"
//             className="text-white flex gap-2 items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Add New Product
//             <HiPlus className="size-5 text-white" />
//           </Link>
//         </div>
//       </div>

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-gray-400">
//           <thead className="text-xs text-stone-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 #
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Product name
//               </th>
//               <th scope="col" className="px-6 py-3 text-end">
//                 Price
//               </th>
//               <th scope="col" className="px-6 py-3 text-end">
//                 created at
//               </th>
//               <th scope="col" className="px-6 py-3 text-end">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               <ProductListSkeletonLoader />
//             ) : data.length === 0 ? (
//               <ProductListEmptyStage />
//             ) : (
//               data.map((product) => <ProductRow product={product} key={product.id} />)
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React, { useRef, useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";
import {
  HiMiniTrash,
  HiOutlinePencil,
  HiOutlineTrash,
  HiPlus,
  HiTrash,
} from "react-icons/hi2";
import useSWR from "swr";
import ProductListSkeletonLoader from "./ProductListSkeletonLoader";
import ProductListEmptyStage from "./ProductListEmptyStage";
import ProductRow from "./ProductRow";
import { Link } from "react-router-dom";
import { throttle } from "lodash";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductList = () => {
  const [search, setSearch] = useState("");

  const searchInput = useRef();
  // console.log(searchInput);

  // console.log(search);

  const { data, isLoading, error } = useSWR(
    search
      ? `${import.meta.env.VITE_API_URL}/products?product_name_like=${search}`
      : `${import.meta.env.VITE_API_URL}/products`,
    fetcher
  );

  // const handleSearch = (e) => {
  //   console.log(e.target.value);
  // };

  const handleSearch = throttle((e) => {
    setSearch(e.target.value);
    // console.log(e.target.value);
  }, 500);

  const handleClearBtn = () => {
    setSearch("");
    searchInput.current.value = "";
  };

  // if (isLoading) return <p>Loading..</p>;

  return (
    <div>
      <div className=" flex justify-between mb-3">
        <div className="">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <HiSearch className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            </div>
            <input
              ref={searchInput}
              onChange={handleSearch}
              type="text"
              className="bg-gray-50 border border-gray-300 text-stone-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Product"
            />
            {search && (
              <button
                className="absolute top-0 bottom-0 right-3 m-auto"
                onClick={handleClearBtn}
              >
                <HiX
                  fill="red"
                  className="scale-100 active:scale-90 duration-200"
                />
              </button>
            )}
          </div>
        </div>
        <div className="">
          <Link
            to={"/product/create"}
            className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add new Product
            <HiPlus />
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
          <thead className="text-xs text-stone-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-stone-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>

              <th scope="col" className="px-6 py-3 text-end">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <ProductListSkeletonLoader />
            ) : data.length === 0 ? (
              <ProductListEmptyStage />
            ) : (
              data.map((product) => (
                <ProductRow product={product} key={product.id} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
