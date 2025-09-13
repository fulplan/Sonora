import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Download, Monitor, Settings, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface WindowsPayload {
  id: string;
  name: string;
  type: string;
  description?: string;
  size?: number;
  config: any;
  isGenerated: boolean;
  createdAt: string;
}

function PayloadCard({ payload }: { payload: WindowsPayload }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "executable": return Monitor;
      case "dll": return FileText;
      case "script": return Settings;
      default: return Monitor;
    }
  };

  const formatSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const Icon = getTypeIcon(payload.type);

  return (
    <Card className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-blue-400" />
            <CardTitle className="text-sm">{payload.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={payload.isGenerated ? "default" : "secondary"}>
              {payload.type}
            </Badge>
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {payload.description || "Windows-specific payload"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-xs text-muted-foreground">
          <div>Size: {formatSize(payload.size)}</div>
          <div>Architecture: {payload.config?.architecture || "x64"}</div>
          <div>Created: {new Date(payload.createdAt).toLocaleDateString()}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
            <Download className="h-3 w-3 mr-1" />
            Download
          </Button>
          <Button size="sm" variant="secondary" className="h-7 text-xs">
            Configure
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-xs">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function WindowsPayloadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const { data: payloadsData, isLoading } = useQuery({
    queryKey: ["payloads", "windows"],
    queryFn: async () => {
      const response = await fetch("/api/payloads/platform/windows");
      if (!response.ok) throw new Error("Failed to fetch Windows payloads");
      return response.json();
    }
  });

  const payloads = payloadsData?.data || [];

  const filteredPayloads = payloads.filter((payload: WindowsPayload) => {
    const matchesSearch = payload.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payload.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || payload.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <SEO 
        title="Windows Payloads - C2 Command & Control"
        description="Browse and download Windows-specific executable payloads, DLLs, scripts and shellcode for penetration testing and red team operations"
        keywords="windows payloads, executable, dll, script, shellcode, pentesting, red team"
      />
      <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-400">Windows Payloads</h1>
          <p className="text-muted-foreground">Windows-specific executable payloads and implants</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Generate Payload
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Windows payloads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="executable">Executable</SelectItem>
              <SelectItem value="dll">DLL</SelectItem>
              <SelectItem value="script">Script</SelectItem>
              <SelectItem value="shellcode">Shellcode</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-card/50 border-border/50 animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-32"></div>
                <div className="h-3 bg-muted rounded w-24"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredPayloads.length > 0 ? (
          filteredPayloads.map((payload: WindowsPayload) => (
            <PayloadCard key={payload.id} payload={payload} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Monitor className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Windows payloads found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || typeFilter !== "all" 
                ? "No payloads match your current filters." 
                : "No Windows payloads are available."}
            </p>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Generate Payload
            </Button>
          </div>
        )}
      </div>

      {!isLoading && filteredPayloads.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Showing {filteredPayloads.length} Windows payloads
        </div>
      )}
      </div>
    </>
  );
}