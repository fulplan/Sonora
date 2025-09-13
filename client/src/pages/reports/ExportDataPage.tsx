import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, Download, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ExportDataPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: reportsData, isLoading } = useQuery({
    queryKey: ["reports", "export"],
    queryFn: async () => {
      const response = await fetch("/api/reports/kind/export");
      if (!response.ok) throw new Error("Failed to fetch export data");
      return response.json();
    }
  });

  const reports = reportsData?.data || [];

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-yellow-400">Export Data</h1>
          <p className="text-muted-foreground">Data export and archival functionality</p>
        </div>
        <Button className="bg-yellow-600 hover:bg-yellow-700">
          <Plus className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <div className="text-center py-12">
        <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Export Data</h3>
        <p className="text-muted-foreground mb-4">Data export functionality coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>
    </div>
  );
}