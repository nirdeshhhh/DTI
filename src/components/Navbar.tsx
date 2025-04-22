
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useToast } from "./ui/use-toast";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const { toast } = useToast();

  const handleNotificationClick = () => {
    toast({
      title: "No new notifications",
      description: "You'll be notified when there are updates to your events.",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="font-bold text-xl text-primary">SportMeet</div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link to="/create-event" className="text-sm font-medium hover:text-primary">
            Create Event
          </Link>
          <Link to="/map" className="text-sm font-medium hover:text-primary">
            Map View
          </Link>
          <Link to="/profile" className="text-sm font-medium hover:text-primary">
            Profile
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleNotificationClick}
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <ModeToggle />

          <Link to="/profile">
            <Avatar>
              <AvatarImage src="" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
