import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Terminal, Monitor, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Session {
  id: string;
  clientId: string;
  sessionType: string;
  status: string;
  startedAt: string;
  lastActivity: string;
  metadata?: any;
}

function SessionCard({ session }: { session: Session }) {
  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-500/20 text-green-400 border-green-500/30",
      inactive: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", 
      terminated: "bg-red-500/20 text-red-400 border-red-500/30"
    };
    return variants[status as keyof typeof variants] || variants.inactive;
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case "shell": return Terminal;
      case "file_manager": return Monitor;
      default: return Activity;
    }
  };

  const Icon = getSessionIcon(session.sessionType);

  return (
    <Card className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-green-400" />
            <CardTitle className="text-sm font-mono">{session.id.slice(0, 8)}</CardTitle>
          </div>
          <Badge className={getStatusBadge(session.status)}>
            {session.status}
          </Badge>
        </div>
        <CardDescription>
          Client: {session.clientId} • Type: {session.sessionType}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-xs text-muted-foreground">
          <div>Started: {new Date(session.startedAt).toLocaleString()}</div>
          <div>Last Activity: {new Date(session.lastActivity).toLocaleString()}</div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="secondary" className="h-7 text-xs">
            <Terminal className="h-3 w-3 mr-1" />
            Connect
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-xs">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AllSessionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: sessionsData, isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const response = await fetch("/api/sessions");
      if (!response.ok) throw new Error("Failed to fetch sessions");
      return response.json();
    }
  });

  const sessions = sessionsData?.data || [];

  const filteredSessions = sessions.filter((session: Session) => {
    const matchesSearch = session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.sessionType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-green-400">All Sessions</h1>
          <p className="text-muted-foreground">Manage and monitor all active and historical sessions</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          New Session
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-card/50 border-border/50 animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-3 bg-muted rounded w-32"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredSessions.length > 0 ? (
          filteredSessions.map((session: Session) => (
            <SessionCard key={session.id} session={session} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No sessions found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== "all" 
                ? "No sessions match your current filters." 
                : "No sessions are currently available."}
            </p>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create Session
            </Button>
          </div>
        )}
      </div>

      {!isLoading && filteredSessions.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Showing {filteredSessions.length} of {sessions.length} sessions
        </div>
      )}
    </div>
  );
}