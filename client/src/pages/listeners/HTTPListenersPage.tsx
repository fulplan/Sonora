import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Wifi, Play, Square } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function HTTPListenersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: listenersData, isLoading } = useQuery({
    queryKey: ["listeners", "http"],
    queryFn: async () => {
      const response = await fetch("/api/listeners/protocol/http");
      if (!response.ok) throw new Error("Failed to fetch HTTP listeners");
      return response.json();
    }
  });

  const listeners = listenersData?.data || [];

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-400">HTTP Listeners</h1>
          <p className="text-muted-foreground">HTTP protocol listeners and handlers</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Listener
        </Button>
      </div>

      <div className="text-center py-12">
        <Wifi className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">HTTP Listeners</h3>
        <p className="text-muted-foreground mb-4">HTTP listener management coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Create Listener
        </Button>
      </div>
    </div>
  );
}