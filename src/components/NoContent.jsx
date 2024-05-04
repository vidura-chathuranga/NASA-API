import { MonitorOff } from "lucide-react";

const NoContent = () => {
  return (
    <div className="h-[400px] translate-y-[10%] flex flex-col justify-center items-center" data-testid="no-content">
      <MonitorOff size={80} className="text-gray-600 opacity-40"/>
      <h1 className="text-[60px] text-gray-600 opacity-40">No results found</h1>
    </div>
  );
};

export default NoContent;
