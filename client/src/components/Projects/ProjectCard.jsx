import React from "react";

export const ProjectCard = () => {
  return (
    <>
      <div className="card bg-base-100 w-full shadow-xl my-8">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div className="flex">
              <i className="fa-regular fa-square text-5xl mr-2"></i>
              <h2 className="card-title">Project Name</h2>
            </div>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
            repudiandae nam dolore sit vitae, assumenda aperiam nemo. Nesciunt
            perspiciatis dolor libero accusantium! Accusamus deleniti vero fugit
            in, tempora pariatur, incidunt magni unde suscipit provident nulla
            animi quae, dolore sint? Nam reprehenderit rem eos, consequatur
            voluptate dolor cum non? Iusto, omnis!
          </p>
          <div className="card-actions w-full justify-between items-center ">
            <div className="w-[60%]">
              <div className="badge bg-website-purple text-white p-3 mx-1">
                neutral
              </div>
              <div className="badge bg-website-purple text-white p-3 mx-1">
                primary
              </div>
              <div className="badge bg-website-purple text-white p-3 mx-1">
                secondary
              </div>
              <div className="badge bg-website-purple text-white p-3 mx-1">
                accent
              </div>
              <div className="badge bg-website-purple text-white p-3 mx-1">
                ghost
              </div>
            </div>
            <button className="btn bg-website-purple text-white rounder-2xl">
              Request to join
            </button>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 w-full shadow-xl my-8">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-website-purple  rounder-2xl">
              Request to join
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
