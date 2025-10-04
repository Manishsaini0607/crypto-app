import React from "react";

const InfoCard = ({ imgUrl, text, tagText, inverted }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
      className="relative p-6 sm:p-8 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300"
    >
      {/* Overlay gradient */}
      <div className={`absolute inset-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100
        ${inverted 
          ? "bg-gradient-to-br from-purple-600 to-indigo-700" 
          : "bg-gradient-to-br from-white to-gray-50"}`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Tag */}
        <span
          className={`inline-flex items-center px-4 py-1.5 mb-4 rounded-full text-sm font-semibold tracking-wide transition-transform duration-300 transform group-hover:scale-105
            ${inverted 
              ? "bg-white text-purple-700" 
              : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"}`}
        >
          {tagText}
        </span>

        {/* Description */}
        <p className={`text-lg sm:text-xl font-medium leading-relaxed
          ${inverted ? "text-white" : "text-gray-800"}`}>
          {text}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 transform translate-y-1/4 translate-x-1/4">
        <div className={`w-24 h-24 rounded-full opacity-20
          ${inverted 
            ? "bg-white" 
            : "bg-purple-600"}`}
        />
      </div>
    </div>
  );
};

export default InfoCard;
