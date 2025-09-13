import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, FileCode, Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function TechnicalReportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: reportsData, isLoading } = useQuery({
    queryKey: ["reports", "technical"],
    queryFn: async () => {
      const response = await fetch("/api/reports/kind/technical");
      if (!response.ok) throw new Error("Failed to fetch technical reports");
      return response.json();
    }
  });

  const reports = reportsData?.data || [];

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-orange-400">Technical Report</h1>
          <p className="text-muted-foreground">Detailed technical analysis and findings</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Report
        </Button>
      </div>

      <div className="text-center py-12">
        <FileCode className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Technical Reports</h3>
        <p className="text-muted-foreground mb-4">Technical reporting coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Create Report
        </Button>
      </div>
    </div>
  );
}