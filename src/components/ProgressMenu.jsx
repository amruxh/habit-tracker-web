import { PROGRESSES, PROGRESS_COLORS } from "../constants";

const ProgressMenu = ({ selectedProgress, setSelectedProgress }) => {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex flex-wrap items-center gap-2 sm:gap-4 bg-transparent w-full sm:w-auto">
      {PROGRESSES.map((progress) => {
        const selected = progress === selectedProgress;
        return (
          <div
            className={`flex items-center justify-center sm:justify-start gap-2 cursor-pointer transition-all duration-300 border border-transparent rounded-md p-1 sm:p-0 ${selected ? "opacity-100 scale-105 bg-card-base sm:bg-transparent shadow-sm sm:shadow-none" : "opacity-60 hover:opacity-100"}`}
            onClick={() => setSelectedProgress(progress)}
            key={progress}
          >
            <div
              className={`size-3 sm:size-4 border-2 border-border-base transition-all ${
                PROGRESS_COLORS[progress]
              }`}
            />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
              {progress}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressMenu;
