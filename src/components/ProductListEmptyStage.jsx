import React from "react";

const ProductListEmptyStage = () => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
      <td colSpan={5} className=" px-6 py-4">
        <p className="text-center">There is no record</p>
      </td>
    </tr>
  );
};

export default ProductListEmptyStage;
