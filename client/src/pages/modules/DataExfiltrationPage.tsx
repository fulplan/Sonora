import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Download, Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function DataExfiltrationPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: modulesData, isLoading } = useQuery({
    queryKey: ["modules", "exfil"],
    queryFn: async () => {
      const response = await fetch("/api/modules/category/exfil");
      if (!response.ok) throw new Error("Failed to fetch data exfiltration modules");
      return response.json();
    }
  });

  const modules = modulesData?.data || [];

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-purple-400">Data Exfiltration</h1>
          <p className="text-muted-foreground">Data extraction and exfiltration techniques</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>

      <div className="text-center py-12">
        <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Data Exfiltration Modules</h3>
        <p className="text-muted-foreground mb-4">Data exfiltration techniques coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>
    </div>
  );
}