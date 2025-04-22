
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { joinEvent } from "@/services/eventsService";

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
          title: "Request Sent!",
          description: `You've requested to join the ${sport} event. The host will review your request.`,
        });
      } else {
        toast({
          title: "Error",
          description: "This event is either full or no longer available.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error joining event:", error);
      toast({
        title: "Error",
        description: "There was an error joining this event. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant={getSportBadgeVariant(sport)}>{sport}</Badge>
          <span className="text-sm text-muted-foreground">
            {spotsAvailable} of {totalSpots} spots left
          </span>
        </div>
        <CardTitle className="text-lg font-bold mt-2">{location}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col gap-2">
          <div className="text-sm">
            <span className="font-medium">When: </span>
            {date} at {time}
          </div>
          <div className="text-sm">
            <span className="font-medium">Host: </span>
            {hostName} ({hostRating}/5 ★)
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleJoin}
          disabled={spotsAvailable <= 0}
        >
          {spotsAvailable > 0 ? 'Join Event' : 'Event Full'}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper function to determine badge style based on sport
function getSportBadgeVariant(sport: string): "default" | "secondary" | "outline" | "destructive" {
  const sportMap: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    Basketball: "default",
    Football: "secondary",
    Tennis: "outline",
    Soccer: "destructive",
  };
  
  return sportMap[sport] || "default";
}

export default EventCard;
