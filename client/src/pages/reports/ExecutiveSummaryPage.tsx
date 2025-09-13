import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, FileText, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ExecutiveSummaryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: reportsData, isLoading } = useQuery({
    queryKey: ["reports", "executive"],
    queryFn: async () => {
      const response = await fetch("/api/reports/kind/executive");
      if (!response.ok) throw new Error("Failed to fetch executive reports");
      return response.json();
    }
  });

  const reports = reportsData?.data || [];

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-400">Executive Summary</h1>
          <p className="text-muted-foreground">High-level executive reports and summaries</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Report
        </Button>
      </div>

      <div className="text-center py-12">
        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Executive Summary Reports</h3>
        <p className="text-muted-foreground mb-4">Executive reporting coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Create Report
        </Button>
      </div>
    </div>
  );
}