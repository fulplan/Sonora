import { NetworkTopology } from "@/components/NetworkTopology";

export default function NetworkPage() {
  return (
    <div className="space-y-6 p-6" data-testid="network-page">
      <div>
        <h1 className="text-2xl font-semibold">Network Map</h1>
        <p className="text-muted-foreground">
          Visualize the lab network topology and device relationships
        </p>
      </div>
      
      <NetworkTopology />
    </div>
  );
}