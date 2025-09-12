import { TargetMachineCard } from "@/components/TargetMachineCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";
import { useState } from "react";

export default function TargetsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  //todo: remove mock functionality
  const targetMachines = [
    {
      id: "target-1",
      name: "Windows Server 2019",
      os: "Windows",
      ip: "192.168.1.10",
      status: "online" as const,
      vulnerabilities: 3,
      difficulty: "beginner" as const,
    },
    {
      id: "target-2",
      name: "Ubuntu 20.04", 
      os: "Linux",
      ip: "192.168.1.20",
      status: "compromised" as const,
      vulnerabilities: 5,
      difficulty: "intermediate" as const,
    },
    {
      id: "target-3",
      name: "macOS Monterey",
      os: "macOS",
      ip: "192.168.1.30", 
      status: "offline" as const,
      vulnerabilities: 2,
      difficulty: "advanced" as const,
    },
    {
      id: "target-4",
      name: "Windows 10 Pro",
      os: "Windows",
      ip: "192.168.1.40",
      status: "online" as const,
      vulnerabilities: 4,
      difficulty: "intermediate" as const,
    },
    {
      id: "target-5",
      name: "CentOS 8",
      os: "Linux",
      ip: "192.168.1.50",
      status: "online" as const,
      vulnerabilities: 2,
      difficulty: "advanced" as const,
    },
    {
      id: "target-6",
      name: "FreeBSD 13",
      os: "BSD",
      ip: "192.168.1.60",
      status: "offline" as const,
      vulnerabilities: 1,
      difficulty: "advanced" as const,
    },
  ];

  const filteredMachines = targetMachines.filter(machine =>
    machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    machine.os.toLowerCase().includes(searchQuery.toLowerCase()) ||
    machine.ip.includes(searchQuery)
  );

  const statusCounts = {
    online: targetMachines.filter(m => m.status === 'online').length,
    offline: targetMachines.filter(m => m.status === 'offline').length,
    compromised: targetMachines.filter(m => m.status === 'compromised').length,
  };

  return (
    <div className="space-y-6 p-6" data-testid="targets-page">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Target Machines</h1>
            <p className="text-muted-foreground">
              Manage and interact with lab target machines
            </p>
          </div>
          <Button data-testid="button-add-target">
            <Plus className="w-4 h-4 mr-2" />
            Add Target
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search targets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-targets"
            />
          </div>
          <Button variant="outline" size="sm" data-testid="button-filter-targets">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Status Overview */}
        <div className="flex gap-3">
          <Badge variant="secondary" className="text-success border-success">
            Online: {statusCounts.online}
          </Badge>
          <Badge variant="secondary" className="text-muted-foreground border-muted-foreground">
            Offline: {statusCounts.offline}  
          </Badge>
          <Badge variant="secondary" className="text-warning border-warning">
            Compromised: {statusCounts.compromised}
          </Badge>
        </div>
      </div>

      {/* Target Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMachines.map((machine) => (
          <TargetMachineCard key={machine.id} {...machine} />
        ))}
      </div>

      {filteredMachines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No targets found matching your search.</p>
        </div>
      )}
    </div>
  );
}