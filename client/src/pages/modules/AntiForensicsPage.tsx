import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, EyeOff, Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function AntiForensicsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: modulesData, isLoading } = useQuery({
    queryKey: ["modules", "anti-forensics"],
    queryFn: async () => {
      const response = await fetch("/api/modules/category/anti-forensics");
      if (!response.ok) throw new Error("Failed to fetch anti-forensics modules");
      return response.json();
    }
  });

  const modules = modulesData?.data || [];

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-400">Anti-Forensics</h1>
          <p className="text-muted-foreground">Evidence deletion and anti-forensics techniques</p>
        </div>
        <Button className="bg-gray-600 hover:bg-gray-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>

      <div className="text-center py-12">
        <EyeOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Anti-Forensics Modules</h3>
        <p className="text-muted-foreground mb-4">Anti-forensics techniques coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>
    </div>
  );
}