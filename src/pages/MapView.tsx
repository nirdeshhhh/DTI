
import Navbar from "@/components/Navbar";
import MapView from "@/components/MapView";

const MapViewPage = () => {
  return (
    <>
      <Navbar />
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-2">Events Map</h1>
        <p className="text-muted-foreground mb-6">
          Find sports events near you on the map
        </p>
        
        <MapView />
      </main>
    </>
  );
};

export default MapViewPage;
