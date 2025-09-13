import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Globe, Play, Square } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function DNSListenersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: listenersData, isLoading } = useQuery({
    queryKey: ["listeners", "dns"],
    queryFn: async () => {
      const response = await fetch("/api/listeners/protocol/dns");
      if (!response.ok) throw new Error("Failed to fetch DNS listeners");
      return response.json();
    }
  });

  const listeners = listenersData?.data || [];

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyan-400">DNS Listeners</h1>
          <p className="text-muted-foreground">DNS protocol listeners and tunneling</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Listener
        </Button>
      </div>

      <div className="text-center py-12">
        <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">DNS Listeners</h3>
        <p className="text-muted-foreground mb-4">DNS listener management coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Create Listener
        </Button>
      </div>
    </div>
  );
}