
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import EventFilter from "@/components/EventFilter";
import { Button } from "@/components/ui/button";
import { Event, getAllEvents, getFilteredEvents } from "@/services/eventsService";

const Index = () => {
  const [viewMode, setViewMode] = useState<"join" | "create">("join");
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  // Load events on component mount
  useEffect(() => {
    const loadEvents = () => {
      const allEvents = getAllEvents();
      setEvents(allEvents);
      setFilteredEvents(allEvents);
    };
    
    loadEvents();
  }, []);

  const handleFilterChange = (filters: {
    sport: string;
    date: Date | undefined;
    distance: string;
  }) => {
    console.log("Filters applied:", filters);
    
    const filtered = getFilteredEvents({
      sport: filters.sport,
      date: filters.date,
      distance: filters.distance
    });
    
    setFilteredEvents(filtered);
  };

  return (
    <>
      <Navbar />
      <main className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sports Events</h1>
            <p className="text-muted-foreground">
              Find and join sports events in your area
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              variant={viewMode === "join" ? "default" : "outline"}
              onClick={() => setViewMode("join")}
            >
              Join Events
            </Button>
            <Link to="/create-event">
              <Button
                variant={viewMode === "create" ? "default" : "outline"}
              >
                Create Event
              </Button>
            </Link>
          </div>
        </div>

        <EventFilter onFilterChange={handleFilterChange} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard
                key={event.id}
                id={event.id}
                sport={event.sport}
                location={event.location}
                date={event.date}
                time={event.time}
                spotsAvailable={event.spotsAvailable}
                totalSpots={event.totalSpots}
                hostName={event.hostName}
                hostRating={event.hostRating}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No events match your criteria.</p>
              <Link to="/create-event">
                <Button variant="outline" className="mt-4">
                  Create an Event
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Index;
