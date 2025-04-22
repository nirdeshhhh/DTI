
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import EditProfileDialog from "./EditProfileDialog";

interface UserProfileProps {
  isCurrentUser?: boolean;
}

const UserProfile = ({ isCurrentUser = true }: UserProfileProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("events");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [mockUser, setMockUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    joinedDate: "January 2023",
    verifications: ["email", "phone"],
    rating: 4.8,
    reviewCount: 12
  });
  
  const handleVerificationClick = () => {
    toast({
      title: "Verification Email Sent",
      description: "Please check your inbox to complete verification.",
    });
  };
  
  const handleSaveProfile = (userData: { name: string; email: string; phone: string }) => {
    setMockUser({
      ...mockUser,
      name: userData.name,
      email: userData.email,
      phone: userData.phone
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" alt={mockUser.name} />
              <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{mockUser.name}</CardTitle>
              <CardDescription>Member since {mockUser.joinedDate}</CardDescription>
              <div className="flex items-center mt-1">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{mockUser.rating}</span>
                <span className="text-muted-foreground text-sm ml-1">
                  ({mockUser.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-2">
            <h3 className="text-sm font-medium mb-2">Verifications</h3>
            <div className="flex flex-wrap gap-2">
              {mockUser.verifications.includes("email") ? (
                <Badge variant="outline" className="bg-green-50">Email Verified</Badge>
              ) : (
                <Button variant="outline" size="sm" onClick={handleVerificationClick}>
                  Verify Email
                </Button>
              )}
              
              {mockUser.verifications.includes("phone") ? (
                <Badge variant="outline" className="bg-green-50">Phone Verified</Badge>
              ) : (
                <Button variant="outline" size="sm" onClick={handleVerificationClick}>
                  Verify Phone
                </Button>
              )}
            </div>
          </div>
          
          {isCurrentUser && (
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => setIsEditDialogOpen(true)}
            >
              Edit Profile
            </Button>
          )}
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="events" className="flex-1">My Events</TabsTrigger>
          <TabsTrigger value="history" className="flex-1">Event History</TabsTrigger>
          {isCurrentUser && (
            <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Events you're hosting or participating in</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No upcoming events found.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Event History</CardTitle>
              <CardDescription>Past events you've participated in</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No past events found.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {isCurrentUser && (
          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings options will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
      
      {isCurrentUser && (
        <EditProfileDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          user={mockUser}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default UserProfile;
