import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Terminal, Monitor, Activity, Wifi, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface ActiveSession {
  id: string;
  clientId: string;
  sessionType: string;
  status: string;
  startedAt: string;
  lastActivity: string;
  metadata?: any;
}

function ActiveSessionCard({ session }: { session: ActiveSession }) {
  const getSessionIcon = (type: string) => {
    switch (type) {
      case "shell": return Terminal;
      case "file_manager": return Monitor;
      default: return Activity;
    }
  };

  const Icon = getSessionIcon(session.sessionType);

  const getActivityStatus = (lastActivity: string) => {
    const now = new Date().getTime();
    const lastSeen = new Date(lastActivity).getTime();
    const diffMinutes = Math.floor((now - lastSeen) / (1000 * 60));
    
    if (diffMinutes < 5) return { text: "Active now", color: "text-green-400" };
    if (diffMinutes < 30) return { text: `${diffMinutes}m ago`, color: "text-yellow-400" };
    return { text: `${diffMinutes}m ago`, color: "text-orange-400" };
  };

  const activityStatus = getActivityStatus(session.lastActivity);

  return (
    <Card className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-green-400" />
            <CardTitle className="text-sm font-mono">{session.id.slice(0, 8)}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Wifi className={`h-3 w-3 ${activityStatus.color}`} />
              <span className={`text-xs ${activityStatus.color}`}>
                {activityStatus.text}
              </span>
            </div>
          </div>
        </div>
        <CardDescription>
          Client: {session.clientId} • Type: {session.sessionType}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Started: {new Date(session.startedAt).toLocaleString()}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700">
            <Terminal className="h-3 w-3 mr-1" />
            Connect
          </Button>
          <Button size="sm" variant="secondary" className="h-7 text-xs">
            Monitor
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-xs">
            Stop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ActiveSessionsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: sessionsData, isLoading } = useQuery({
    queryKey: ["sessions", "active"],
    queryFn: async () => {
      const response = await fetch("/api/sessions/status/active");
      if (!response.ok) throw new Error("Failed to fetch active sessions");
      return response.json();
    },
    refetchInterval: 5000 // Auto-refresh every 5 seconds
  });

  const sessions = sessionsData?.data || [];

  const filteredSessions = sessions.filter((session: ActiveSession) => {
    return session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
           session.clientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
           session.sessionType.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <SEO 
        title="Active Sessions - C2 Command & Control"
        description="Monitor and manage currently active C2 sessions in real-time with session status, client information, and connection details"
        keywords="active sessions, c2 monitoring, remote sessions, session status, real time"
      />
      <div className="container-responsive py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-green-400">Active Sessions</h1>
          <p className="text-muted-foreground">Monitor and manage currently active sessions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
            {sessions.length} Active
          </Badge>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search active sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
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
          filteredSessions.map((session: ActiveSession) => (
            <ActiveSessionCard key={session.id} session={session} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No active sessions</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? "No active sessions match your search." 
                : "No sessions are currently active."}
            </p>
            <Button variant="outline">
              View All Sessions
            </Button>
          </div>
        )}
      </div>

      {!isLoading && filteredSessions.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Showing {filteredSessions.length} active sessions • Auto-refreshing every 5s
        </div>
      )}
      </div>
    </>
  );
}