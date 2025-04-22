
import { useEffect } from "react";
import { getAllEvents } from "@/services/eventsService";

const MapView = () => {
  useEffect(() => {
    const events = getAllEvents();
    console.log("Map would initialize here with events:", events);
    
    // In a real implementation, you would initialize a map library here
    // and place markers for each event
  }, []);

  return (
    <div className="w-full h-[60vh] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Map View</h3>
        <p className="text-muted-foreground">
          This would display an interactive map with event locations
        </p>
      </div>
    </div>
  );
};

export default MapView;
