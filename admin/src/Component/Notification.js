import React from "react";
import AddAlertIcon from "@mui/icons-material/AddAlert";

function Notification() {
  return (
    <div>
      <div className=" flex items-center  justify-between p-4 border-b-2">
        <div>
          <h3 className=" text-indigo-600 font-bold ">Notification</h3>
        </div>
        <div className=" cursor-pointer ">
          <h3 className="text-indigo-600">
            <AddAlertIcon />
          </h3>
        </div>
      </div>
      <div className="flex justify-between pt-3 pb-1 px-2 m-1 rounded-lg bg-cyan-200 ">
        <div className=" h-1 w-1 rounded-full ">1</div>
        <div>
          <p>12345</p>
        </div>
        <div>
          <p>product name</p>
        </div>
        <div>
          <button
            type="button"
            class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50   font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
