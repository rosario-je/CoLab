import React from "react";

export const MyMessageListItems = () => {
  const message =
    "Hey there, just checking in to see how you're doing. I hope you're having a great day!";

  // Function to truncate the text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <div className="card text-neutral-content w-9/12 my-10">
        <div className="card-body items-start text-center flex flex-col gap-[20px]">
          <div className="flex w-9/12 items-center gap-x-8">
            <div className="w-20 h-20 bg-white rounded-full" />
            <div className="flex flex-col justify-center items-start gap-y-2">
              <h2 className="card-title self-start text-3xl text-white font-semibold">
                Jack Sparrow
              </h2>
              <p className="self-start text-white font-light">
                {truncateText(message, 100)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
