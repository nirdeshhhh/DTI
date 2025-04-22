
import Navbar from "@/components/Navbar";
import EventCreationForm from "@/components/EventCreationForm";

const CreateEvent = () => {
  return (
    <>
      <Navbar />
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-2">Create a Sports Event</h1>
        <p className="text-muted-foreground mb-6">
          Fill out the form below to create and host a new sports event
        </p>
        
        <div className="max-w-2xl mx-auto">
          <EventCreationForm />
        </div>
      </main>
    </>
  );
};

export default CreateEvent;
