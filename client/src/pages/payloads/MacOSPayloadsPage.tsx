import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Download, Apple, FileText, Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function MacOSPayloadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const { data: payloadsData, isLoading } = useQuery({
    queryKey: ["payloads", "macos"],
    queryFn: async () => {
      const response = await fetch("/api/payloads/platform/macos");
      if (!response.ok) throw new Error("Failed to fetch macOS payloads");
      return response.json();
    }
  });

  const payloads = payloadsData?.data || [];

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-300">macOS Payloads</h1>
          <p className="text-muted-foreground">macOS-specific applications and scripts</p>
        </div>
        <Button className="bg-gray-600 hover:bg-gray-700">
          <Plus className="h-4 w-4 mr-2" />
          Generate Payload
        </Button>
      </div>

      <div className="text-center py-12">
        <Apple className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">macOS Payloads</h3>
        <p className="text-muted-foreground mb-4">macOS payload generation and management coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Generate Payload
        </Button>
      </div>
    </div>
  );
}