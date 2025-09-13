import { Button } from "@/components/ui/button";
import { Plus, Rocket, Search } from "lucide-react";
import { useLocation } from "wouter";

export function GlobalQuickActions() {
  const [, navigate] = useLocation();

  const navigateToPanel = (panelId: string) => {
    navigate(`/?panel=${panelId}`);
  };

  const handleNewSession = () => {
    navigateToPanel("sessions.new");
  };

  const handleDeployPayload = () => {
    navigateToPanel("payloads.generator");
  };

  const handleQuickScan = () => {
    navigateToPanel("modules.reconnaissance");
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Quick Action Buttons */}
      <Button 
        size="sm" 
        variant="outline" 
        className="text-xs"
        onClick={handleNewSession}
        data-testid="button-new-session"
      >
        <Plus className="w-3 h-3 mr-1" />
        New Session
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="text-xs"
        onClick={handleDeployPayload}
        data-testid="button-deploy-payload"
      >
        <Rocket className="w-3 h-3 mr-1" />
        Deploy
      </Button>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="text-xs"
        onClick={handleQuickScan}
        data-testid="button-quick-scan"
      >
        <Search className="w-3 h-3 mr-1" />
        Scan
      </Button>

      {/* Status Indicator */}
      <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-md">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-green-400 font-medium">OPERATIONAL</span>
      </div>
    </div>
  );
}