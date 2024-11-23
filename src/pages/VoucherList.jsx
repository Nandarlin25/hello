import React, { useRef, useState } from "react";
import { HiSearch, HiTrash, HiX } from "react-icons/hi";
import { HiComputerDesktop, HiOutlinePencil, HiPlus } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useSWR from "swr";
import VoucherListRow from "../components/VoucherListRow";
import { debounce, throttle } from "lodash";

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherList = () => {
  const [search, setSearch] = useState("");

  const searchInput = useRef("");
  console.log(searchInput);
  // console.log(search);

  const { data, isLoading, error } = useSWR(
    search
      ? `${import.meta.env.VITE_API_URL}/vouchers?voucher_id_like=${search}`
      : `${import.meta.env.VITE_API_URL}/vouchers`,
    fetcher
  );

  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  // };

  // throttle 500 & debounce - 500

  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
    // console.log(e.target.value);
  }, 1000);

  const handleClearSearch = () => {
    setSearch("");
    searchInput.current.value= "";
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <HiSearch className="w-4 h-4 text-stone-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              ref={searchInput}
              onChange={handleSearch}
              className="bg-gray-50 border border-gray-300 text-stone-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Voucher"
            />
            {search && (
              <button
                className=" absolute right-2 top-0 bottom-0 m-auto"
                onClick={handleClearSearch}
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
            to={"/sale"}
            type="submit"
            className="text-white flex gap-2 items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Sale
            <HiComputerDesktop className="size-4 text-white" />
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-gray-400">
          <thead className="text-xs text-stone-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                # Voucher Id
              </th>
              <th scope="col" className="px-6 py-3">
                Customer name
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                created at
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 last:table-row hidden">
              <td colSpan={5} className=" px-6 py-4">
                <p className="text-center">There is no record</p>
              </td>
            </tr>

            {!isLoading &&
              data.map((voucher, index) => (
                <VoucherListRow key={index} voucher={voucher} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherList;
