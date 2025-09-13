import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, FileText, Play, Square } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ListenerTemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: templatesData, isLoading } = useQuery({
    queryKey: ["listeners", "templates"],
    queryFn: async () => {
      const response = await fetch("/api/listeners/templates");
      if (!response.ok) throw new Error("Failed to fetch listener templates");
      return response.json();
    }
  });

  const templates = templatesData?.data || [];

  return (
    <>
      <SEO 
        title="Listener Templates - C2 Command & Control"
        description="Manage pre-configured listener templates and configurations for HTTP, HTTPS, TCP, UDP, DNS and SMB listeners in your C2 infrastructure"
        keywords="listener templates, c2 listeners, http listener, https listener, tcp, udp, dns, smb"
      />
      <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-green-400">Listener Templates</h1>
          <p className="text-muted-foreground">Pre-configured listener templates and configurations</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Listener Templates</h3>
        <p className="text-muted-foreground mb-4">Listener template management coming soon</p>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>
      </div>
    </>
  );
}