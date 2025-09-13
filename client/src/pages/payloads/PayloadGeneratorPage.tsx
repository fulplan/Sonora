import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Wand2, Download, Settings, Play, Code, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const platforms = [
  { id: "windows", name: "Windows", color: "text-blue-400" },
  { id: "linux", name: "Linux", color: "text-orange-400" },
  { id: "macos", name: "macOS", color: "text-gray-400" },
  { id: "web", name: "Web", color: "text-purple-400" },
  { id: "mobile", name: "Mobile", color: "text-cyan-400" }
];

const payloadTypes = {
  windows: ["executable", "dll", "script", "shellcode"],
  linux: ["executable", "script", "shellcode"],
  macos: ["application", "script"],
  web: ["webshell", "script"],
  mobile: ["apk", "ipa"]
};

export default function PayloadGeneratorPage() {
  const [platform, setPlatform] = useState("");
  const [payloadType, setPayloadType] = useState("");
  const [payloadName, setPayloadName] = useState("");
  const [lhost, setLhost] = useState("192.168.1.100");
  const [lport, setLport] = useState("4444");
  const [architecture, setArchitecture] = useState("x64");
  const [encoder, setEncoder] = useState("none");
  const [iterations, setIterations] = useState("1");
  const [obfuscation, setObfuscation] = useState(false);
  const [persistence, setPersistence] = useState(false);
  const [antiVirus, setAntiVirus] = useState(false);
  const [customCode, setCustomCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!platform || !payloadType || !payloadName) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate payload generation
    setTimeout(() => {
      toast({
        title: "Payload Generated",
        description: `${payloadName} has been successfully generated`,
      });
      setIsGenerating(false);
    }, 3000);
  };

  const selectedPlatform = platforms.find(p => p.id === platform);
  const availableTypes = platform ? payloadTypes[platform as keyof typeof payloadTypes] : [];

  return (
    <>
      <SEO 
        title="Payload Generator - C2 Command & Control"
        description="Generate custom payloads for different platforms including Windows, Linux, macOS, web and mobile with advanced evasion features"
        keywords="payload generator, pentesting, red team, c2, command control"
      />
      <div className="container-responsive py-6 max-w-6xl">
        <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-green-400">Payload Generator</h1>
        <p className="text-muted-foreground">Generate custom payloads for different platforms and scenarios</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Configuration</CardTitle>
              <CardDescription>Select platform and payload type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="platform">Target Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform..." />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          <span className={p.color}>{p.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="type">Payload Type</Label>
                  <Select value={payloadType} onValueChange={setPayloadType} disabled={!platform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="name">Payload Name</Label>
                <Input
                  id="name"
                  value={payloadName}
                  onChange={(e) => setPayloadName(e.target.value)}
                  placeholder="Enter payload name..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Network Configuration</CardTitle>
              <CardDescription>Configure connection parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="lhost">Listen Host (LHOST)</Label>
                  <Input
                    id="lhost"
                    value={lhost}
                    onChange={(e) => setLhost(e.target.value)}
                    placeholder="192.168.1.100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="lport">Listen Port (LPORT)</Label>
                  <Input
                    id="lport"
                    type="number"
                    value={lport}
                    onChange={(e) => setLport(e.target.value)}
                    placeholder="4444"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="architecture">Architecture</Label>
                  <Select value={architecture} onValueChange={setArchitecture}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="x86">x86 (32-bit)</SelectItem>
                      <SelectItem value="x64">x64 (64-bit)</SelectItem>
                      <SelectItem value="arm">ARM</SelectItem>
                      <SelectItem value="arm64">ARM64</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="encoder">Encoder</Label>
                  <Select value={encoder} onValueChange={setEncoder}>
                    <SelectTrigger>
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="shikata_ga_nai">Shikata Ga Nai</SelectItem>
                      <SelectItem value="alpha_mixed">Alpha Mixed</SelectItem>
                      <SelectItem value="xor">XOR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {encoder && encoder !== "none" && (
                <div>
                  <Label htmlFor="iterations">Encoding Iterations</Label>
                  <Input
                    id="iterations"
                    type="number"
                    value={iterations}
                    onChange={(e) => setIterations(e.target.value)}
                    min="1"
                    max="10"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
              <CardDescription>Configure evasion and persistence features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Code Obfuscation</Label>
                  <p className="text-sm text-muted-foreground">
                    Apply code obfuscation techniques
                  </p>
                </div>
                <Switch checked={obfuscation} onCheckedChange={setObfuscation} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Persistence Mechanism</Label>
                  <p className="text-sm text-muted-foreground">
                    Add persistence to maintain access
                  </p>
                </div>
                <Switch checked={persistence} onCheckedChange={setPersistence} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anti-Virus Evasion</Label>
                  <p className="text-sm text-muted-foreground">
                    Apply AV evasion techniques
                  </p>
                </div>
                <Switch checked={antiVirus} onCheckedChange={setAntiVirus} />
              </div>

              <Separator />

              <div>
                <Label htmlFor="custom">Custom Code</Label>
                <Textarea
                  id="custom"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="Add custom code or modifications..."
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generation Preview</CardTitle>
              <CardDescription>Review payload configuration</CardDescription>
            </CardHeader>
            <CardContent>
              {platform && payloadType ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-medium mb-2">Configuration Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform:</span>
                        <span className={selectedPlatform?.color}>{selectedPlatform?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-mono">{payloadType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-mono">{payloadName || "Unnamed"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Target:</span>
                        <span className="font-mono">{lhost}:{lport}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Arch:</span>
                        <span className="font-mono">{architecture}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {encoder && encoder !== "none" && <Badge variant="secondary">Encoded</Badge>}
                      {obfuscation && <Badge variant="secondary">Obfuscated</Badge>}
                      {persistence && <Badge variant="secondary">Persistent</Badge>}
                      {antiVirus && <Badge variant="secondary">AV Evasion</Badge>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="h-8 w-8 mx-auto mb-2" />
                  <p>Configure payload to see preview</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleGenerate}
              disabled={!platform || !payloadType || !payloadName || isGenerating}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Payload"}
            </Button>
            
            <Button variant="outline" className="w-full" disabled={!payloadName}>
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Security Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-yellow-400 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Generated payloads are for authorized testing only. 
                  Ensure you have proper authorization before deployment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
}