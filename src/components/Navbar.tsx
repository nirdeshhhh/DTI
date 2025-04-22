import { Link, useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useToast } from "./ui/use-toast";
import { ModeToggle } from "./ModeToggle";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { toast } = useToast();
  const location = useLocation();

  const handleNotificationClick = () => {
    toast({
      title: "No new notifications",
      description: "You'll be notified when there are updates to your events.",
    });
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/create-event", label: "Create Event" },
    { path: "/map", label: "Map View" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="container flex h-20 items-center justify-between gap-8">
        {/* Left Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="font-bold text-2xl text-primary bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
            SportMeet
          </div>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-all",
                "hover:text-primary hover:bg-accent/50 rounded-lg",
                location.pathname === link.path
                  ? "text-primary font-semibold"
                  : "text-foreground/80"
              )}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute inset-x-1 -bottom-px h-px bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 text-sm rounded-full bg-background border focus:border-primary focus:ring-1 focus:ring-primary transition-all w-64"
            />
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={handleNotificationClick}
            className="relative hover:bg-accent/50 rounded-full w-10 h-10"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          </Button>

          <ModeToggle />

          <Link to="/profile">
            <Avatar className="hover:ring-2 ring-primary transition-all cursor-pointer w-9 h-9">
              <AvatarImage src="/path/to/user-avatar.jpg" />
              <AvatarFallback className="bg-gradient-to-r from-primary to-emerald-500 text-white">
                U
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur">
        <nav className="container grid grid-cols-4 gap-4 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-all",
                "hover:bg-accent/50 text-sm font-medium",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/80"
              )}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="w-1/2 h-px bg-primary" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
