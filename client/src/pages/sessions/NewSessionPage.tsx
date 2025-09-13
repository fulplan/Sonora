import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Terminal, Monitor, FolderOpen, Camera, Plus, Settings, Play } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const sessionTypes = [
  {
    id: "shell",
    name: "Shell Session",
    description: "Interactive command line access",
    icon: Terminal,
    features: ["Command execution", "File operations", "System monitoring"]
  },
  {
    id: "file_manager", 
    name: "File Manager",
    description: "Browse and manage remote files",
    icon: FolderOpen,
    features: ["File upload/download", "Directory browsing", "Permission management"]
  },
  {
    id: "remote_desktop",
    name: "Remote Desktop",
    description: "Visual desktop control",
    icon: Monitor,
    features: ["Screen sharing", "Mouse/keyboard control", "Multi-monitor support"]
  },
  {
    id: "surveillance",
    name: "Surveillance",
    description: "Monitoring and data collection",
    icon: Camera,
    features: ["Screenshot capture", "Audio recording", "Activity logging"]
  }
];

export default function NewSessionPage() {
  const [selectedType, setSelectedType] = useState("");
  const [clientId, setClientId] = useState("");
  const [customOptions, setCustomOptions] = useState("{}");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: clientsData } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await fetch("/api/clients");
      if (!response.ok) throw new Error("Failed to fetch clients");
      return response.json();
    }
  });

  const createSessionMutation = useMutation({
    mutationFn: async (sessionData: any) => {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionData)
      });
      if (!response.ok) throw new Error("Failed to create session");
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Session Created",
        description: "New session has been successfully established"
      });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      // Reset form
      setSelectedType("");
      setClientId("");
      setCustomOptions("{}");
      // Navigate to active sessions to see the new session
      setTimeout(() => {
        setLocation("/sessions/active");
      }, 1000);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create session",
        variant: "destructive"
      });
    }
  });

  const handleCreateSession = () => {
    if (!selectedType || !clientId) {
      toast({
        title: "Validation Error",
        description: "Please select a session type and client",
        variant: "destructive"
      });
      return;
    }

    let metadata;
    try {
      metadata = JSON.parse(customOptions);
    } catch {
      toast({
        title: "Invalid JSON",
        description: "Custom options must be valid JSON",
        variant: "destructive"
      });
      return;
    }

    createSessionMutation.mutate({
      clientId,
      sessionType: selectedType,
      status: "active",
      metadata
    });
  };

  const clients = clientsData?.data || [];
  const selectedTypeData = sessionTypes.find(t => t.id === selectedType);

  return (
    <>
      <SEO 
        title="Create New Session - C2 Command & Control"
        description="Establish new remote sessions including shell access, file management, remote desktop, and surveillance capabilities with connected clients"
        keywords="remote session, shell access, file manager, remote desktop, surveillance, c2"
      />
      <div className="container-responsive py-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-green-400">Create New Session</h1>
        <p className="text-muted-foreground">Establish a new connection with a remote client</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Type</CardTitle>
              <CardDescription>Choose the type of session to establish</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sessionTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedType === type.id
                        ? "border-green-500 bg-green-500/10"
                        : "border-border hover:border-green-500/50"
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 mt-0.5 ${
                        selectedType === type.id ? "text-green-400" : "text-muted-foreground"
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-medium">{type.name}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {type.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Selection</CardTitle>
              <CardDescription>Select the target client for this session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="client">Target Client</Label>
                  <Select value={clientId} onValueChange={setClientId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client..." />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client: any) => (
                        <SelectItem key={client.id} value={client.id}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs">{client.id.slice(0, 8)}</span>
                            <span>•</span>
                            <span>{client.hostname}</span>
                            <span className="text-muted-foreground">({client.ipAddress})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
              <CardDescription>Customize session parameters (JSON format)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="options">Custom Metadata</Label>
                  <Textarea
                    id="options"
                    value={customOptions}
                    onChange={(e) => setCustomOptions(e.target.value)}
                    placeholder='{"timeout": 300, "encoding": "utf-8"}'
                    className="font-mono text-sm"
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Preview</CardTitle>
              <CardDescription>Review your session configuration</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedTypeData ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <selectedTypeData.icon className="h-8 w-8 text-green-400" />
                    <div>
                      <h3 className="font-medium">{selectedTypeData.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedTypeData.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Session Type:</span>
                      <span className="font-mono">{selectedType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Target Client:</span>
                      <span className="font-mono">{clientId || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Active
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Features:</h4>
                    <ul className="space-y-1">
                      {selectedTypeData.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="h-1.5 w-1.5 bg-green-400 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="h-8 w-8 mx-auto mb-2" />
                  <p>Select a session type to see preview</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700" 
              onClick={handleCreateSession}
              disabled={!selectedType || !clientId || createSessionMutation.isPending}
            >
              <Play className="h-4 w-4 mr-2" />
              {createSessionMutation.isPending ? "Creating..." : "Create Session"}
            </Button>
            <Button variant="outline" onClick={() => {
              setSelectedType("");
              setClientId("");
              setCustomOptions("{}");
            }}>
              Reset
            </Button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}