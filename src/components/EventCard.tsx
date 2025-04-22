import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { joinEvent } from "@/services/eventsService";
import { Calendar, MapPin, User } from "lucide-react";

interface EventCardProps {
  id: string;
  sport: string;
  location: string;
  date: string;
  time: string;
  spotsAvailable: number;
  totalSpots: number;
  hostName: string;
  hostRating: number;
}

const EventCard = ({
  id,
  sport,
  location,
  date,
  time,
  spotsAvailable,
  totalSpots,
  hostName,
  hostRating,
}: EventCardProps) => {
  const { toast } = useToast();

  const handleJoin = () => {
    try {
      const updatedEvent = joinEvent(id);

      if (updatedEvent) {
        toast({
          title: "Request Sent",
          description: `You've requested to join the ${sport} event. Await host approval.`,
        });
      } else {
        toast({
          title: "Event Full",
          description: "This event is either full or no longer available.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error joining event:", error);
      toast({
        title: "Error",
        description: "Unable to join the event. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full hover:shadow-lg rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge
            variant={getSportBadgeVariant(sport)}
            className="text-xs px-3 py-1 capitalize"
          >
            {sport}
          </Badge>
          <span className="text-sm text-muted-foreground font-medium">
            {spotsAvailable} / {totalSpots} spots left
          </span>
        </div>

        <CardTitle className="text-lg font-semibold mt-3 flex items-center gap-2 text-foreground">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          {location}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            <span className="font-medium text-foreground">When:</span> {date} at {time}
          </span>
        </div>

        <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-3 text-sm">
          <User className="w-4 h-4 text-primary" />
          <div>
            <span className="font-semibold text-foreground">{hostName}</span>{" "}
            <span className="text-xs text-muted-foreground">({hostRating}/5 ★)</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full rounded-xl font-semibold text-sm tracking-wide transition-colors duration-300"
          onClick={handleJoin}
          disabled={spotsAvailable <= 0}
        >
          {spotsAvailable > 0 ? "Join Event" : "Event Full"}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Badge variant based on sport type
function getSportBadgeVariant(
  sport: string
): "default" | "secondary" | "outline" | "destructive" {
  const sportMap: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    Basketball: "default",
    Football: "secondary",
    Tennis: "outline",
    Soccer: "destructive",
  };

  return sportMap[sport] || "default";
}

export default EventCard;
