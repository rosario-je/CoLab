import React from "react";

export const JoinRequestListItems = () => {
  return (
    <>
      <div className="card bg-neutral text-neutral-content w-11/12 my-10">
        <div className="card-body items-center text-center flex flex-col justify-center gap-[20px]">
          <h2 className="requested-user self-start text-3xl font-semibold">
            Jack Sparrow
          </h2>

          <p className="self-start font-light text-3xl italic">
            Has requested to join:
          </p>

          <div className="card-actions w-full justify-between self-end">
            <h2 className="text-5xl font-bold">CoLab</h2>
            <div className="flex justify-center items-center gap-[15px]">
              <button className="btn bg-green hover:bg-dark-green text-white">
                Accept
              </button>

              <button className="btn bg-red hover:bg-dark-red text-white">
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
