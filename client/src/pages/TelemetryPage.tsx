import { TelemetryPanel } from "@/components/TelemetryPanel";

export default function TelemetryPage() {
  return (
    <div className="space-y-6 p-6" data-testid="telemetry-page">
      <div>
        <h1 className="text-2xl font-semibold">Security Telemetry</h1>
        <p className="text-muted-foreground">
          Monitor security events and system activities in real-time
        </p>
      </div>
      
      <TelemetryPanel />
    </div>
  );
}