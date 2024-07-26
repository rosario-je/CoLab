import React from "react";

export const ProjectCard = () => {
  return (
    <>
      <div className="card bg-base-100 w-full shadow-xl border-solid border-2 border-website-purple/25 text-white my-8">
        <div className="card-body h-96">
          <div className="flex justify-between items-center text-white">
            <div className="flex">
              <i className="fa-regular fa-square text-5xl mr-2"></i>
              <h2 className="card-title font-bold text-4xl">Project Name</h2>
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
          <p className="font-light text-xl pt-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
            repudiandae nam dolore sit vitae, assumenda aperiam nemo. Nesciunt
            perspiciatis dolor libero accusantium! Accusamus deleniti vero fugit
            in, tempora pariatur, incidunt magni unde suscipit provident nulla
            animi quae, dolore sint? Nam reprehenderit rem eos, consequatur
            voluptate dolor cum non? Iusto, omnis!
          </p>
          <div className="flex card-actions w-full justify-between items-center ">
            <div className="w-[60%]">
              <div className="badge bg-website-purple text-white px-5 py-4 mx-1 w-auto">
                neutral
              </div>
              <div className="badge bg-website-purple text-white px-5 py-4 mx-1 w-auto">
                primary
              </div>
              <div className="badge bg-website-purple text-white px-5 py-4 mx-1 w-auto">
                secondary
              </div>
              <div className="badge bg-website-purple text-white px-5 py-4 mx-1 w-auto">
                accent
              </div>
              <div className="badge bg-website-purple text-white px-5 py-4 mx-1 w-auto">
                ghost
              </div>
            </div>
            <button className="btn bg-website-purple hover:bg-create text-white rounded-full">
              Request to join
            </button>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 w-full shadow-xl border-solid border-2 border-website-purple/25 text-white my-8">
        <div className="card-body h-96">
          <div className="flex justify-between items-center text-white">
            <div className="flex">
              <i className="fa-regular fa-square text-5xl mr-2"></i>
              <h2 className="card-title font-bold text-4xl">Project Name</h2>
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
          <p className="font-light text-xl pt-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
            repudiandae nam dolore sit vitae, assumenda aperiam nemo. Nesciunt
            perspiciatis dolor libero accusantium! Accusamus deleniti vero fugit
            in, tempora pariatur, incidunt magni unde suscipit provident nulla
            animi quae, dolore sint? Nam reprehenderit rem eos, consequatur
            voluptate dolor cum non? Iusto, omnis!
          </p>
          <div className="card-actions w-full justify-between items-center ">
            <div className="w-[60%]">
              <div className="badge bg-website-purple text-white px-5 py-4 mx-1 w-auto">
                neutral
              </div>
              <div className="badge bg-website-purple text-white px-5 py-4 mx-1 w-auto">
                primary
              </div>
              <div className="badge bg-website-purple text-white px-5 py-4 mx-1 w-auto">
                secondary
              </div>
              <div className="badge bg-website-purple text-white px-5 py-4 mx-1 w-auto">
                accent
              </div>
              <div className="badge bg-website-purple text-white px-5 py-4 mx-1 w-auto">
                ghost
              </div>
            </div>
            <button className="btn bg-website-purple hover:bg-create text-white rounder-2xl rounded-full">
              Request to join
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
