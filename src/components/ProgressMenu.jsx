const ProgressMenu = ({ progress, selectedProgress, setSelectedProgress }) => {
  return (
    <div className="border rounded p-2 bg-white flex items-center justify-between gap-3">
      {Object.entries(progress).map(([key, value]) => {
        const selected = value === selectedProgress;
        return (
          <div
            className={`flex gap-3 items-center group opacity-50 hover:opacity-100 transition-all duration-300 font-bold cursor-pointer ${selected && "opacity-100"}`}
            onClick={() => setSelectedProgress(value)}
            key={key}
          >
            <div
              className={`w-5 h-5 rounded-full cursor-pointer m-auto group-hover:border-2 ${value} ${selected ? "border-2" : "border"} `}
            ></div>
            <span className="text-xs">{key.toUpperCase()}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressMenu;
