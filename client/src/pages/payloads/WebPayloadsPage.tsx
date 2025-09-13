import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Download, Globe, Code, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function WebPayloadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const { data: payloadsData, isLoading } = useQuery({
    queryKey: ["payloads", "web"],
    queryFn: async () => {
      const response = await fetch("/api/payloads/platform/web");
      if (!response.ok) throw new Error("Failed to fetch web payloads");
      return response.json();
    }
  });

  const payloads = payloadsData?.data || [];

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-purple-400">Web Payloads</h1>
          <p className="text-muted-foreground">Web-based exploits, scripts and malicious content</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Generate Payload
        </Button>
      </div>

      <div className="text-center py-12">
        <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Web Payloads</h3>
        <p className="text-muted-foreground mb-4">Web payload generation and management coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Generate Payload
        </Button>
      </div>
    </div>
  );
}