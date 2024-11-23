import React from "react";
import useRecordStore from "../stores/useRecordStore";
import toast from "react-hot-toast";

const VoucherTableRow = ({
  record: {
    id,
    cost,
    Quantity,
    product: { product_name, price },
  },
  index,
}) => {
  // console.log(record);

  const { removeRecord, changeQuantity } = useRecordStore();

  const handleDelete = () => {
    removeRecord(id);
    toast.success("Product delete successfully");
  };

  const handleIncreaseQuantity = () => {
    changeQuantity(id, 1);
  };
  const handleDecreaseQuantity = () => {
    changeQuantity(id, -1);
  };

  return (
    <tr
      className="record-row border-b dark:border-gray-700 group"
      product-id={1}
      row-id="5a45f553-89e8-4620-86ba-32b04cdf3165"
    >
      <td className="px-6 py-4">{index + 1}</td>
      <th
        scope="row"
        className="record-product-name px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {product_name}
      </th>
      <td className="record-product-price px-6 py-4 text-end">{price}</td>
      <td className="px-6 py-4 text-end">
        <button
          onClick={handleDecreaseQuantity}
          className="quantity-sub border border-blue-500 text-blue-500 p-0.5 rounded-full active:scale-90 hidden group-hover:inline-block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-3 pointer-events-none"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        <span className="record-q w-5 inline-block text-center">
          {Quantity}
        </span>
        <button
          onClick={handleIncreaseQuantity}
          className="quantity-add border border-blue-500 text-blue-500 p-0.5 rounded-full active:scale-90 hidden group-hover:inline-block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-3 pointer-events-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </td>
      <td className="record-cost px-6 py-4 text-end">{cost}</td>
      <td>
        <button
          onClick={handleDelete}
          className=" pointer-events-none duration-200 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto left-full top-3 translate-x-2 active:scale-75 bg-blue-100 p-2 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 pointer-events-none stroke-blue-700 stroke-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </td>
      {/* <td className="px-6 py-4 block print:hidden">
        <button className="record-remove font-medium text-blue-600 dark:text-blue-500 hover:underline">
          Remove
        </button>
      </td> */}
    </tr>
  );
};

export default VoucherTableRow;
