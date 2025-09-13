import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, Plus, Download, Globe, Code, FileText, Info, Cog } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";

interface WebPayload {
  id: string;
  name: string;
  type: string;
  description?: string;
  size?: number;
  config: any;
  isGenerated: boolean;
  createdAt: string;
}

function PayloadCard({ payload }: { payload: WebPayload }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const { toast } = useToast();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "webshell": return Globe;
      case "script": return Code;
      case "inject": return FileText;
      default: return Globe;
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
      link.download = `${payload.name}.${payload.type === 'webshell' ? 'php' : 'js'}`;
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
            <Icon className="h-4 w-4 text-purple-400" />
            <CardTitle className="text-sm">{payload.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={payload.isGenerated ? "default" : "secondary"}>
              {payload.type}
            </Badge>
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {payload.description || "Web-based payload"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-xs text-muted-foreground">
          <div>Size: {formatSize(payload.size)}</div>
          <div>Language: {payload.config?.language || "JavaScript"}</div>
          <div>Created: {new Date(payload.createdAt).toLocaleDateString()}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button 
            size="sm" 
            className="h-7 text-xs bg-purple-600 hover:bg-purple-700"
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
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue={(payload.config?.language && payload.config.language.trim() !== '') ? payload.config.language : "JavaScript"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JavaScript">JavaScript</SelectItem>
                      <SelectItem value="PHP">PHP</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="ASP">ASP.NET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host">Callback Host</Label>
                  <Input id="host" defaultValue={payload.config?.host || "127.0.0.1"} placeholder="Callback host" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Callback Port</Label>
                  <Input id="port" type="number" defaultValue={payload.config?.port || "8080"} placeholder="Callback port" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="method">Injection Method</Label>
                  <Select defaultValue={(payload.config?.method && payload.config.method.trim() !== '') ? payload.config.method : "POST"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="Cookie">Cookie</SelectItem>
                      <SelectItem value="Header">Header</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obfuscation">Obfuscation</Label>
                  <Select defaultValue={(payload.config?.obfuscation && payload.config.obfuscation.trim() !== '') ? payload.config.obfuscation : "none"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select obfuscation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="base64">Base64</SelectItem>
                      <SelectItem value="minify">Minification</SelectItem>
                      <SelectItem value="unicode">Unicode Escape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setConfigOpen(false)}>Cancel</Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Save Configuration</Button>
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
                  <Icon className="h-5 w-5 text-purple-400" />
                  {payload.name}
                </DialogTitle>
                <DialogDescription>
                  Detailed information about this web payload
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
                    <Label className="text-sm font-semibold">Language</Label>
                    <p className="text-sm text-muted-foreground">{payload.config?.language || "JavaScript"}</p>
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
                    {payload.description || "Web-based payload for browser exploitation and client-side attacks."}
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

  const filteredPayloads = payloads.filter((payload: WebPayload) => {
    const matchesSearch = payload.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payload.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || payload.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-purple-400">Web Payloads</h1>
          <p className="text-muted-foreground">Web-based exploits, scripts and malicious content</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" data-testid="button-generate-payload">
          <Plus className="h-4 w-4 mr-2" />
          Generate Payload
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search web payloads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-payloads"
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
              <SelectItem value="webshell">Webshell</SelectItem>
              <SelectItem value="script">Script</SelectItem>
              <SelectItem value="inject">Injection</SelectItem>
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
          filteredPayloads.map((payload: WebPayload) => (
            <PayloadCard key={payload.id} payload={payload} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No web payloads found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || typeFilter !== "all" 
                ? "No payloads match your current filters." 
                : "No web payloads are available."}
            </p>
            <Button variant="outline" data-testid="button-generate-payload-empty">
              <Plus className="h-4 w-4 mr-2" />
              Generate Payload
            </Button>
          </div>
        )}
      </div>

      {!isLoading && filteredPayloads.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Showing {filteredPayloads.length} web payloads
        </div>
      )}
    </div>
  );
}