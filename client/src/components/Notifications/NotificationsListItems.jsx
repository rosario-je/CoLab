import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const NotificationListItems = ({
  notification_id,
  message
}) => {

const { dismissNotif } = useContext(AppContext);

const handleDismissClick = () => {
  dismissNotif(notification_id); 
};

  return (
    <>
      <div className="card bg-neutral text-white my-10 w-3/4">
        <button 
          onClick={handleDismissClick}
          className="btn btn-circle absolute top-0 right-0 mt-4 mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="bg-navbar-color"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="card-body items-center text-center flex flex-col justify-center gap-[20px]">
          <div className="card-actions w-full justify-between self-end">
            <p className="text-4xl my-12">{message}</p>
          </div>
        </div>
      </div>
    </>
  )};