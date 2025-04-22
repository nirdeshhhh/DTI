
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { mockEvents } from "@/lib/mock-data";

const MapView = () => {
  const [selectedEvent, setSelectedEvent] = useState<null | typeof mockEvents[0]>(null);

  useEffect(() => {
    // In a real implementation, we would initialize a map library like Google Maps here
    console.log("Map would initialize here with events:", mockEvents);
  }, []);

  return (
    <div className="w-full h-[70vh] bg-secondary rounded-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-secondary flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Map View</h3>
          <p className="text-muted-foreground mb-4">
            In a complete implementation, this would show a Google Maps view with event pins.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {mockEvents.slice(0, 4).map((event) => (
              <button
                key={event.id}
                className={`p-2 rounded-full ${
                  selectedEvent?.id === event.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary-foreground/10"
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                {event.sport}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {selectedEvent && (
        <Card className="absolute bottom-4 left-4 right-4 max-w-md mx-auto">
          <CardContent className="p-4">
            <h4 className="font-bold">{selectedEvent.sport} at {selectedEvent.location}</h4>
            <p className="text-sm text-muted-foreground">
              {selectedEvent.date} at {selectedEvent.time}
            </p>
            <p className="text-sm">
              {selectedEvent.spotsAvailable} of {selectedEvent.totalSpots} spots available
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapView;
