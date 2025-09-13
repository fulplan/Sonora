import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Plus, Download, Monitor, Settings, FileText, Info, Cog } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const { toast } = useToast();

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

  const downloadMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/payloads/${payload.id}/download`, {
        method: "POST"
      });
      if (!response.ok) throw new Error("Download failed");
      return response;
    },
    onSuccess: () => {
      // Simulate file download
      const link = document.createElement('a');
      link.href = `/api/payloads/${payload.id}/download`;
      link.download = `${payload.name}.exe`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Download Started",
        description: `${payload.name} download initiated successfully.`
      });
    },
    onError: () => {
      toast({
        title: "Download Failed",
        description: "Failed to download payload. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleDownload = () => {
    downloadMutation.mutate();
  };

  const handleConfigure = () => {
    setConfigOpen(true);
  };

  const handleDetails = () => {
    setDetailsOpen(true);
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
          <Button 
            size="sm" 
            className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
            onClick={handleDownload}
            disabled={downloadMutation.isPending}
            data-testid={`button-download-${payload.id}`}
          >
            <Download className="h-3 w-3 mr-1" />
            {downloadMutation.isPending ? 'Downloading...' : 'Download'}
          </Button>
          <Dialog open={configOpen} onOpenChange={setConfigOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary" className="h-7 text-xs" data-testid={`button-configure-${payload.id}`}>
                <Cog className="h-3 w-3 mr-1" />
                Configure
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Configure {payload.name}</DialogTitle>
                <DialogDescription>
                  Modify payload configuration and settings
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="architecture">Architecture</Label>
                  <Select defaultValue={(payload.config?.architecture && payload.config.architecture.trim() !== '') ? payload.config.architecture : "x64"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select architecture" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="x86">x86 (32-bit)</SelectItem>
                      <SelectItem value="x64">x64 (64-bit)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host">LHOST</Label>
                  <Input id="host" defaultValue={payload.config?.host || "127.0.0.1"} placeholder="Listener host" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">LPORT</Label>
                  <Input id="port" type="number" defaultValue={payload.config?.port || "4444"} placeholder="Listener port" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="encoder">Encoder</Label>
                  <Select defaultValue={(payload.config?.encoder && payload.config.encoder.trim() !== '') ? payload.config.encoder : "none"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select encoder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="base64">Base64</SelectItem>
                      <SelectItem value="xor">XOR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setConfigOpen(false)}>Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Save Configuration</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="h-7 text-xs" data-testid={`button-details-${payload.id}`}>
                <Info className="h-3 w-3 mr-1" />
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-blue-400" />
                  {payload.name}
                </DialogTitle>
                <DialogDescription>
                  Detailed information about this Windows payload
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold">Type</Label>
                    <p className="text-sm text-muted-foreground">{payload.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Size</Label>
                    <p className="text-sm text-muted-foreground">{formatSize(payload.size)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Architecture</Label>
                    <p className="text-sm text-muted-foreground">{payload.config?.architecture || "x64"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Status</Label>
                    <Badge variant={payload.isGenerated ? "default" : "secondary"}>
                      {payload.isGenerated ? "Generated" : "Template"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {payload.description || "Windows-specific payload for penetration testing and red team operations."}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Configuration</Label>
                  <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                    <pre className="text-xs">{JSON.stringify(payload.config, null, 2)}</pre>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Created</Label>
                  <p className="text-sm text-muted-foreground">{new Date(payload.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default function WindowsPayloadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [, navigate] = useLocation();

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
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate("/payloads/generator?platform=windows")}
          data-testid="button-generate-payload"
        >
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