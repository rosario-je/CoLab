export const CreateProjectTechStackModal = ({ handleTechStacksModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-screen h-screen">
      <div className="fixed inset-0 bg-black bg-opacity-50  w-screen h-screen"></div>
      <div className="relative bg-input-colors text-white rounded-lg p-8 shadow-lg w-1/2 h-1/2">
        <button
          className="absolute top-4 right-4 text-2xl hover:animate-spin hover:text-red mt-3 mr-6"
          onClick={handleTechStacksModal}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1 className="text-2xl mb-4">Add Languages</h1>
        <div className="flex flex-col items-center space-y-4">
          <label className="input input-bordered flex items-center gap-2 w-[95%] mt-5">
            <i class="fa-solid fa-magnifying-glass mr-3"></i>
            <input
              type="text"
              className="grow hover:outline-none bg-input-colors text-white"
              placeholder="Search Language..."
            />
          </label>
        </div>
      </div>
    </div>
  );
};
