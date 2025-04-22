
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: {
    sport: string;
    date: Date | undefined;
    distance: string;
  }) => void;
}

const EventFilter = ({ onFilterChange }: FilterProps) => {
  const [sport, setSport] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [distance, setDistance] = useState<string>("5");

  const handleApplyFilters = () => {
    onFilterChange({
      sport,
      date,
      distance,
    });
  };

  return (
    <div className="bg-card p-4 rounded-lg shadow-sm border mb-6">
      <h3 className="font-medium mb-4">Filter Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sport">Sport</Label>
          <Select value={sport} onValueChange={setSport}>
            <SelectTrigger id="sport">
              <SelectValue placeholder="Select sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="Basketball">Basketball</SelectItem>
              <SelectItem value="Football">Football</SelectItem>
              <SelectItem value="Tennis">Tennis</SelectItem>
              <SelectItem value="Soccer">Soccer</SelectItem>
              <SelectItem value="Volleyball">Volleyball</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="distance">Distance (km)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="distance"
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full"
              min="1"
              max="50"
            />
            <Button onClick={handleApplyFilters}>Apply</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
