const ContactCard = () => {
  return (
    <div className="p-6 rounded-2xl shadow bg-white">
      <div className="flex flex-col space-y-6">
        <p className="text-sm font-medium">
          You will receive response within 24 hours of time of submit.
        </p>

        {/* Name + Surname */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name.."
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Surname</label>
            <input
              type="text"
              placeholder="Enter Your Surname.."
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email.."
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Message</label>
          <textarea
            rows={4}
            placeholder="Enter Your Message.."
            className="border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Terms checkbox */}
        <label className="flex items-start text-xs">
          <input
            type="checkbox"
            defaultChecked
            className="mt-1 mr-2 h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          I agree with <span className="text-purple-600 ml-1">Terms&nbsp;&amp;&nbsp;Conditions.</span>
        </label>

        {/* Action buttons */}
        <div className="flex flex-col space-y-2">
          <button className="px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 focus:outline-none">
            Send a Message
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded text-sm hover:bg-gray-400 focus:outline-none">
            Book a Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
