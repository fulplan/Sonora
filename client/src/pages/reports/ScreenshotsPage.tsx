import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Camera, Image } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ScreenshotsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: evidenceData, isLoading } = useQuery({
    queryKey: ["evidence", "screenshots"],
    queryFn: async () => {
      const response = await fetch("/api/evidence?type=screenshot");
      if (!response.ok) throw new Error("Failed to fetch screenshots");
      return response.json();
    }
  });

  const screenshots = evidenceData?.data || [];

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-green-400">Screenshots</h1>
          <p className="text-muted-foreground">Captured screenshots and visual evidence</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Take Screenshot
        </Button>
      </div>

      <div className="text-center py-12">
        <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Screenshots</h3>
        <p className="text-muted-foreground mb-4">Screenshot management coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Take Screenshot
        </Button>
      </div>
    </div>
  );
}