import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Users, Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface LabEnvironment {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  participants: number;
  maxParticipants: number;
  techniques: string[];
  status: 'available' | 'in-progress' | 'completed';
}

export function LabEnvironmentSelector() {
  //todo: remove mock functionality
  const environments: LabEnvironment[] = [
    {
      id: 'windows-domain',
      name: 'Windows Domain Compromise',
      description: 'Learn lateral movement and persistence techniques in an Active Directory environment.',
      difficulty: 'intermediate',
      duration: '45-60 min',
      participants: 1,
      maxParticipants: 4,
      techniques: ['Lateral Movement', 'Credential Dumping', 'Domain Admin'],
      status: 'available'
    },
    {
      id: 'linux-privilege-esc',
      name: 'Linux Privilege Escalation',
      description: 'Explore various methods to escalate privileges from a low-privileged user account.',
      difficulty: 'beginner',
      duration: '30-45 min',
      participants: 2,
      maxParticipants: 3,
      techniques: ['SUID Binaries', 'Cron Jobs', 'Sudo Exploitation'],
      status: 'in-progress'
    },
    {
      id: 'web-app-pentest',
      name: 'Web Application Penetration',
      description: 'Advanced techniques for compromising web applications and maintaining access.',
      difficulty: 'advanced',
      duration: '60-90 min',
      participants: 0,
      maxParticipants: 2,
      techniques: ['SQL Injection', 'XSS', 'Command Injection', 'File Upload'],
      status: 'completed'
    },
    {
      id: 'network-pivoting',
      name: 'Network Pivoting & Tunneling',
      description: 'Master network pivoting techniques to access isolated network segments.',
      difficulty: 'advanced',
      duration: '75-90 min',
      participants: 0,
      maxParticipants: 3,
      techniques: ['Proxychains', 'SSH Tunneling', 'Meterpreter Pivoting'],
      status: 'available'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success text-success-foreground';
      case 'intermediate': return 'bg-warning text-warning-foreground';
      case 'advanced': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <Play className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-warning" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-success" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const handleStartLab = (envId: string) => {
    console.log(`Starting lab environment: ${envId}`);
  };

  return (
    <div className="space-y-4" data-testid="lab-environment-selector">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Lab Environments</h2>
          <p className="text-sm text-muted-foreground">Choose a scenario to practice post-exploitation techniques</p>
        </div>
        <Badge variant="outline" className="text-xs">
          {environments.filter(e => e.status === 'available').length} Available
        </Badge>
      </div>

      <div className="grid gap-4">
        {environments.map((env) => (
          <Card key={env.id} className="hover-elevate" data-testid={`lab-environment-${env.id}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(env.status)}
                    <CardTitle className="text-base">{env.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">{env.description}</CardDescription>
                </div>
                <Badge className={`${getDifficultyColor(env.difficulty)} text-xs`}>
                  {env.difficulty}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{env.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{env.participants}/{env.maxParticipants} participants</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {env.techniques.map((technique, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {technique}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Isolated Environment</span>
                </div>
                <Button 
                  size="sm"
                  variant={env.status === 'available' ? 'default' : 'secondary'}
                  disabled={env.status === 'in-progress'}
                  onClick={() => handleStartLab(env.id)}
                  data-testid={`button-start-${env.id}`}
                >
                  {env.status === 'available' ? 'Start Lab' : 
                   env.status === 'in-progress' ? 'In Progress' : 'Review'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}