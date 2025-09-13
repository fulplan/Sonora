import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, FolderOpen, Archive } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function EvidenceCollectionPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: evidenceData, isLoading } = useQuery({
    queryKey: ["evidence"],
    queryFn: async () => {
      const response = await fetch("/api/evidence");
      if (!response.ok) throw new Error("Failed to fetch evidence");
      return response.json();
    }
  });

  const evidence = evidenceData?.data || [];

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyan-400">Evidence Collection</h1>
          <p className="text-muted-foreground">Digital evidence and artifact collection</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Evidence
        </Button>
      </div>

      <div className="text-center py-12">
        <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Evidence Collection</h3>
        <p className="text-muted-foreground mb-4">Evidence management coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Evidence
        </Button>
      </div>
    </div>
  );
}