import { ClientCard } from "@/components/ClientCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Filter, Plus, RefreshCw, Download, Upload, Zap, Globe,
  Users, Shield, AlertTriangle, CheckCircle, Activity, MapPin,
  Terminal, HardDrive, Eye, Trash2, PlayCircle, Settings, PauseCircle
} from "lucide-react";
import { useState, useMemo } from "react";
import { mockClients, getClientsByStatus, getClientsByOS, getClientsByCountry, getClientsByRiskLevel, getRecentActivity } from "@/data/mockClients";
import type { Client } from '@/../../shared/schema';

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [osFilter, setOSFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [privilegeFilter, setPrivilegeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("lastSeen");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const [bulkPanelOpen, setBulkPanelOpen] = useState(false);

  // Statistics calculations
  const statusCounts = getClientsByStatus(mockClients);
  const osCounts = getClientsByOS(mockClients);
  const countryCounts = getClientsByCountry(mockClients);
  const riskCounts = getClientsByRiskLevel(mockClients);
  const recentActivity = getRecentActivity(mockClients, 24);

  // Filtering and sorting logic
  const filteredClients = useMemo(() => {
    let filtered = mockClients.filter(client => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        client.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.ipAddress.includes(searchQuery) ||
        client.operatingSystem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.currentUser?.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === "all" || client.status === statusFilter;

      // OS filter
      const matchesOS = osFilter === "all" || client.operatingSystem.toLowerCase().includes(osFilter.toLowerCase());

      // Location filter
      const matchesLocation = locationFilter === "all" || client.country === locationFilter;

      // Risk filter
      const matchesRisk = riskFilter === "all" || client.riskLevel === riskFilter;

      // Privilege filter
      const matchesPrivilege = privilegeFilter === "all" || 
        (privilegeFilter === "elevated" && client.isElevated) ||
        (privilegeFilter === "standard" && !client.isElevated);

      return matchesSearch && matchesStatus && matchesOS && matchesLocation && matchesRisk && matchesPrivilege;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'hostname':
          aVal = a.hostname.toLowerCase();
          bVal = b.hostname.toLowerCase();
          break;
        case 'lastSeen':
          aVal = new Date(a.lastSeen || 0).getTime();
          bVal = new Date(b.lastSeen || 0).getTime();
          break;
        case 'status':
          aVal = a.status;
          bVal = b.status;
          break;
        case 'risk':
          const riskOrder = { low: 1, medium: 2, high: 3, critical: 4 };
          aVal = riskOrder[a.riskLevel as keyof typeof riskOrder] || 0;
          bVal = riskOrder[b.riskLevel as keyof typeof riskOrder] || 0;
          break;
        case 'vulnerabilities':
          aVal = a.vulnerabilityCount || 0;
          bVal = b.vulnerabilityCount || 0;
          break;
        default:
          aVal = a.hostname.toLowerCase();
          bVal = b.hostname.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

    return filtered;
  }, [searchQuery, statusFilter, osFilter, locationFilter, riskFilter, privilegeFilter, sortBy, sortOrder]);

  const handleClientSelect = (clientId: string, selected: boolean) => {
    const newSelection = new Set(selectedClients);
    if (selected) {
      newSelection.add(clientId);
    } else {
      newSelection.delete(clientId);
    }
    setSelectedClients(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedClients.size === filteredClients.length) {
      setSelectedClients(new Set());
    } else {
      setSelectedClients(new Set(filteredClients.map(c => c.id)));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Executing bulk action: ${action} on ${selectedClients.size} clients`);
    // Implement bulk actions here
  };

  const handleClientConnect = (clientId: string, connectionType: string) => {
    console.log(`Connecting to client ${clientId} with type: ${connectionType}`);
    // Implement connection logic
  };

  const handleViewDetails = (clientId: string) => {
    console.log(`Viewing details for client: ${clientId}`);
    // Implement details view
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setOSFilter("all");
    setLocationFilter("all");
    setRiskFilter("all");
    setPrivilegeFilter("all");
  };

  return (
    <div className="space-y-6 p-6" data-testid="clients-page">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold gov-header">Client Management</h1>
            <p className="text-muted-foreground">
              Comprehensive C2 client monitoring and management interface
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" data-testid="button-refresh">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button data-testid="button-add-client">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="gov-card">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wide">Total Clients</CardDescription>
              <CardTitle className="text-2xl font-bold">{mockClients.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {recentActivity.length} active in 24h
              </div>
            </CardContent>
          </Card>

          <Card className="gov-card">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wide flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Online
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
                {statusCounts.online || 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(statusCounts.online || 0) / mockClients.length * 100} 
                className="h-1.5"
              />
            </CardContent>
          </Card>

          <Card className="gov-card">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wide flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Compromised
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {statusCounts.compromised || 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(statusCounts.compromised || 0) / mockClients.length * 100} 
                className="h-1.5"
              />
            </CardContent>
          </Card>

          <Card className="gov-card">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wide flex items-center gap-1">
                <Shield className="w-3 h-3" />
                High Risk
              </CardDescription>
              <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-400">
                {(riskCounts.high || 0) + (riskCounts.critical || 0)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Requires immediate attention
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="text-base">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search clients by hostname, IP, OS, location, or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-clients"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger data-testid="select-status-filter">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="compromised">Compromised</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>

            <Select value={osFilter} onValueChange={setOSFilter}>
              <SelectTrigger data-testid="select-os-filter">
                <SelectValue placeholder="OS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All OS</SelectItem>
                <SelectItem value="windows">Windows</SelectItem>
                <SelectItem value="linux">Linux</SelectItem>
                <SelectItem value="macos">macOS</SelectItem>
                <SelectItem value="android">Android</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger data-testid="select-location-filter">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {Object.keys(countryCounts).map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger data-testid="select-risk-filter">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>

            <Select value={privilegeFilter} onValueChange={setPrivilegeFilter}>
              <SelectTrigger data-testid="select-privilege-filter">
                <SelectValue placeholder="Privileges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Privileges</SelectItem>
                <SelectItem value="elevated">Elevated</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
              const [sort, order] = value.split('-');
              setSortBy(sort);
              setSortOrder(order as "asc" | "desc");
            }}>
              <SelectTrigger data-testid="select-sort">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hostname-asc">Hostname A-Z</SelectItem>
                <SelectItem value="hostname-desc">Hostname Z-A</SelectItem>
                <SelectItem value="lastSeen-desc">Last Seen (Recent)</SelectItem>
                <SelectItem value="lastSeen-asc">Last Seen (Oldest)</SelectItem>
                <SelectItem value="status-asc">Status</SelectItem>
                <SelectItem value="risk-desc">Risk (High to Low)</SelectItem>
                <SelectItem value="vulnerabilities-desc">Most Vulnerable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Summary and Clear */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {filteredClients.length} of {mockClients.length} clients
              </span>
              {(searchQuery || statusFilter !== "all" || osFilter !== "all" || locationFilter !== "all" || riskFilter !== "all" || privilegeFilter !== "all") && (
                <Button variant="ghost" size="sm" onClick={clearFilters} data-testid="button-clear-filters">
                  Clear Filters
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedClients.size === filteredClients.length && filteredClients.length > 0}
                onCheckedChange={handleSelectAll}
                data-testid="checkbox-select-all"
              />
              <span className="text-sm text-muted-foreground">Select All</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Operations Panel */}
      {selectedClients.size > 0 && (
        <Card className="gov-card border-primary">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Bulk Operations ({selectedClients.size} clients selected)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={() => handleBulkAction('execute')} data-testid="button-bulk-execute">
                <Terminal className="w-3 h-3 mr-1" />
                Execute Command
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('upload')} data-testid="button-bulk-upload">
                <Upload className="w-3 h-3 mr-1" />
                Upload File
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('download')} data-testid="button-bulk-download">
                <Download className="w-3 h-3 mr-1" />
                Download Files
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('surveillance')} data-testid="button-bulk-surveillance">
                <Eye className="w-3 h-3 mr-1" />
                Start Surveillance
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('pause')} data-testid="button-bulk-pause">
                <PauseCircle className="w-3 h-3 mr-1" />
                Pause Sessions
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button size="sm" variant="destructive" onClick={() => handleBulkAction('remove')} data-testid="button-bulk-remove">
                <Trash2 className="w-3 h-3 mr-1" />
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Geographic Distribution */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Geographic Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(countryCounts).map(([country, count]) => (
              <div key={country} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <span className="text-sm font-medium">{country}</span>
                <Badge variant="secondary" className="text-xs">
                  {count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Client Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold gov-header">
            Active Clients ({filteredClients.length})
          </h2>
        </div>

        {filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No clients found matching your criteria.</p>
            <Button variant="ghost" className="mt-2" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                {...client}
                onConnect={handleClientConnect}
                onViewDetails={handleViewDetails}
                onSelect={handleClientSelect}
                isSelected={selectedClients.has(client.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}