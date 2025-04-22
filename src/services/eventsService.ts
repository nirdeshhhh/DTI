
import { v4 as uuidv4 } from 'uuid';
import { mockEvents } from "@/lib/mock-data";

export interface Event {
  id: string;
  sport: string;
  location: string;
  date: string;
  time: string;
  spotsAvailable: number;
  totalSpots: number;
  hostName: string;
  hostRating: number;
  description: string;
}

// Our in-memory database of events
let events: Event[] = [...mockEvents];

export const getAllEvents = (): Event[] => {
  return events;
};

export const getFilteredEvents = (filters: {
  sport?: string;
  date?: Date;
  distance?: string;
}): Event[] => {
  let filtered = events;
  
  if (filters.sport && filters.sport !== "all") {
    filtered = filtered.filter(event => event.sport === filters.sport);
  }
  
  if (filters.date) {
    const dateStr = filters.date.toISOString().split('T')[0];
    filtered = filtered.filter(event => event.date === dateStr);
  }
  
  return filtered;
};

export const createEvent = (eventData: Omit<Event, 'id' | 'spotsAvailable' | 'hostName' | 'hostRating'>): Event => {
  // In a real app, this would be coming from auth
  const mockHostName = "Current User";
  const mockHostRating = 4.5;
  
  const newEvent: Event = {
    ...eventData,
    id: uuidv4(),
    spotsAvailable: Number(eventData.totalSpots),
    hostName: mockHostName,
    hostRating: mockHostRating
  };
  
  // Add to our in-memory database
  events = [newEvent, ...events];
  
  return newEvent;
};

export const joinEvent = (eventId: string): Event | undefined => {
  const eventIndex = events.findIndex(event => event.id === eventId);
  
  if (eventIndex === -1) return undefined;
  if (events[eventIndex].spotsAvailable <= 0) return undefined;
  
  // Decrease available spots
  events[eventIndex] = {
    ...events[eventIndex],
    spotsAvailable: events[eventIndex].spotsAvailable - 1
  };
  
  return events[eventIndex];
};
