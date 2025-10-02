import React from "react";

const InfoCard = ({ imgUrl, text, tagText, inverted }) => {
  return (
    <div
      style={{ backgroundImage: `url(${imgUrl})` }}
      className={`relative p-6 rounded-lg shadow-lg bg-cover bg-no-repeat
        ${inverted ? "bg-purple-700 text-white" : "bg-white text-black"}`}
    >
      {/* Tag */}
      <span
        className={`inline-block px-3 py-1 mb-4 rounded-full font-semibold
          ${inverted ? "bg-white text-purple-700" : "bg-purple-700 text-white"}`}
      >
        {tagText}
      </span>

      {/* Description */}
      <p className="font-medium text-lg">{text}</p>
    </div>
  );
};

export default InfoCard;
