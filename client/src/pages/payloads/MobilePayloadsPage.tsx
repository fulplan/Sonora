import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Download, Smartphone, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function MobilePayloadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const { data: payloadsData, isLoading } = useQuery({
    queryKey: ["payloads", "mobile"],
    queryFn: async () => {
      const response = await fetch("/api/payloads/platform/mobile");
      if (!response.ok) throw new Error("Failed to fetch mobile payloads");
      return response.json();
    }
  });

  const payloads = payloadsData?.data || [];

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-cyan-400">Mobile Payloads</h1>
          <p className="text-muted-foreground">Android and iOS applications and exploits</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="h-4 w-4 mr-2" />
          Generate Payload
        </Button>
      </div>

      <div className="text-center py-12">
        <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Mobile Payloads</h3>
        <p className="text-muted-foreground mb-4">Mobile payload generation and management coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Generate Payload
        </Button>
      </div>
    </div>
  );
}