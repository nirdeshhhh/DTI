import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "@/services/eventsService";

// ...imports remain unchanged

const EventCreationForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formStage, setFormStage] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    sport: "",
    location: "",
    date: "",
    time: "",
    totalSpots: "5",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setFormData({ ...formData, date: format(selectedDate, "yyyy-MM-dd") });
    }
  };

  const handleNext = () => setFormStage((prev) => prev + 1);
  const handlePrevious = () => setFormStage((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createEvent({
        sport: formData.sport,
        location: formData.location,
        date: formData.date,
        time: formData.time,
        totalSpots: parseInt(formData.totalSpots),
        description: formData.description
      });

      toast({
        title: "Event Created!",
        description: "Your sports event has been created successfully.",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating your event. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-md">
      {formStage === 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">🏟️ Basic Event Details</h2>

          <div className="space-y-2">
            <Label htmlFor="sport">Sport Type</Label>
            <Select value={formData.sport} onValueChange={(value) => handleSelectChange("sport", value)} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Tennis">Tennis</SelectItem>
                <SelectItem value="Soccer">Soccer</SelectItem>
                <SelectItem value="Volleyball">Volleyball</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter the match location"
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleNext} className="px-6">Next</Button>
          </div>
        </div>
      )}

      {formStage === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">📅 Date & Time</h2>

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
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handlePrevious}>Previous</Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      )}

      {formStage === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">📝 Additional Details</h2>

          <div className="space-y-2">
            <Label htmlFor="totalSpots">Number of Spots</Label>
            <Input
              id="totalSpots"
              name="totalSpots"
              type="number"
              min="2"
              max="50"
              value={formData.totalSpots}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Skill level, rules, what to bring, etc."
              rows={4}
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handlePrevious}>Previous</Button>
            <Button type="submit" className="px-6">Create Event</Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default EventCreationForm;
