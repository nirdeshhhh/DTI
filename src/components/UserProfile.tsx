
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
  <Card className="shadow-md rounded-2xl p-4">
    <CardHeader className="pb-4 border-b">
      <div className="flex items-center space-x-6">
        <Avatar className="h-20 w-20 border shadow-sm">
          <AvatarImage src="" alt={mockUser.name} />
          <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl font-semibold">{mockUser.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Member since {mockUser.joinedDate}
          </CardDescription>
          <div className="flex items-center mt-2 space-x-1 text-sm">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{mockUser.rating}</span>
            <span className="text-muted-foreground">({mockUser.reviewCount} reviews)</span>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-4">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">Verifications</h3>
      <div className="flex flex-wrap gap-3">
        {mockUser.verifications.includes("email") ? (
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
            ✅ Email Verified
          </Badge>
        ) : (
          <Button variant="outline" size="sm" onClick={handleVerificationClick}>
            Verify Email
          </Button>
        )}
        {mockUser.verifications.includes("phone") ? (
          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
            ✅ Phone Verified
          </Badge>
        ) : (
          <Button variant="outline" size="sm" onClick={handleVerificationClick}>
            Verify Phone
          </Button>
        )}
      </div>

      {isCurrentUser && (
        <Button
          variant="outline"
          className="mt-6 transition hover:shadow-sm"
          onClick={() => setIsEditDialogOpen(true)}
        >
          Edit Profile
        </Button>
      )}
    </CardContent>
  </Card>

  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
    <TabsList className="grid grid-cols-3 gap-2 bg-muted rounded-lg p-1">
      <TabsTrigger value="events" className="data-[state=active]:bg-white data-[state=active]:shadow">
        My Events
      </TabsTrigger>
      <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:shadow">
        Event History
      </TabsTrigger>
      {isCurrentUser && (
        <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:shadow">
          Settings
        </TabsTrigger>
      )}
    </TabsList>

    <TabsContent value="events" className="mt-4">
      <Card className="rounded-2xl">
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
      <Card className="rounded-2xl">
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
        <Card className="rounded-2xl">
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
