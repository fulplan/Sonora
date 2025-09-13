import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, History, Terminal, Monitor, Activity, Clock, CalendarDays } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface HistoricalSession {
  id: string;
  clientId: string;
  sessionType: string;
  status: string;
  startedAt: string;
  lastActivity: string;
  endedAt?: string;
  metadata?: any;
}

function HistorySessionCard({ session }: { session: HistoricalSession }) {
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

  const getDuration = () => {
    const start = new Date(session.startedAt).getTime();
    const end = session.endedAt ? new Date(session.endedAt).getTime() : new Date(session.lastActivity).getTime();
    const duration = Math.floor((end - start) / (1000 * 60)); // minutes
    
    if (duration < 60) return `${duration}m`;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
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
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            Started: {new Date(session.startedAt).toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Duration: {getDuration()}
          </div>
          {session.endedAt && (
            <div className="text-red-400">
              Ended: {new Date(session.endedAt).toLocaleString()}
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="secondary" className="h-7 text-xs">
            <History className="h-3 w-3 mr-1" />
            View Logs
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-xs">
            Details
          </Button>
          {session.status === "terminated" && (
            <Button size="sm" variant="outline" className="h-7 text-xs text-red-400 border-red-500/30">
              Archive
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function SessionHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const { data: sessionsData, isLoading } = useQuery({
    queryKey: ["sessions", "history"],
    queryFn: async () => {
      const response = await fetch("/api/sessions");
      if (!response.ok) throw new Error("Failed to fetch session history");
      return response.json();
    }
  });

  const sessions = sessionsData?.data || [];

  const filteredSessions = sessions.filter((session: HistoricalSession) => {
    const matchesSearch = session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.clientId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || session.status === statusFilter;
    const matchesType = typeFilter === "all" || session.sessionType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort by start time (most recent first)
  const sortedSessions = filteredSessions.sort((a: HistoricalSession, b: HistoricalSession) => 
    new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  );

  return (
    <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-green-400">Session History</h1>
          <p className="text-muted-foreground">Browse and analyze historical session data</p>
        </div>
        <Button variant="outline">
          <History className="h-4 w-4 mr-2" />
          Export History
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search session history..."
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
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="shell">Shell</SelectItem>
              <SelectItem value="file_manager">File Manager</SelectItem>
              <SelectItem value="remote_desktop">Remote Desktop</SelectItem>
              <SelectItem value="surveillance">Surveillance</SelectItem>
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
        ) : sortedSessions.length > 0 ? (
          sortedSessions.map((session: HistoricalSession) => (
            <HistorySessionCard key={session.id} session={session} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No session history</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                ? "No sessions match your current filters." 
                : "No session history is available."}
            </p>
            <Button variant="outline">
              View Active Sessions
            </Button>
          </div>
        )}
      </div>

      {!isLoading && sortedSessions.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Showing {sortedSessions.length} of {sessions.length} sessions
        </div>
      )}
    </div>
  );
}