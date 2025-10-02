const SupportCard = ({ leftComponent, icon: Icon, title, text }) => {
  return (
    <div className="flex flex-col xl:flex-row justify-between gap-6">
      {/* Heading block */}
      <div className="max-w-xs">
        <Icon className="text-purple-600 w-6 h-6 mb-2" />
        <h1 className="text-3xl font-medium mb-2">{title}</h1>
        <p className="text-sm text-gray-600">{text}</p>
      </div>

      {/* Right-hand content (form, info, etc.) */}
      <div className="max-w-[550px] w-full">{leftComponent}</div>
    </div>
  );
};

export default SupportCard;
