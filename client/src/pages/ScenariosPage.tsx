import { LabEnvironmentSelector } from "@/components/LabEnvironmentSelector";

export default function ScenariosPage() {
  return (
    <div className="space-y-6 p-6" data-testid="scenarios-page">
      <div>
        <h1 className="text-2xl font-semibold">Lab Scenarios</h1>
        <p className="text-muted-foreground">
          Choose from various post-exploitation training scenarios
        </p>
      </div>
      
      <LabEnvironmentSelector />
    </div>
  );
}