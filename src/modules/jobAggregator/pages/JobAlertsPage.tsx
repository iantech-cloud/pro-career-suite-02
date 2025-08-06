import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Bell, Plus, Search, Settings, Trash2 } from 'lucide-react';

export default function JobAlertsPage() {
  const [alerts] = useState([
    {
      id: '1',
      name: 'React Developer Jobs',
      query: 'React Developer',
      location: 'Remote',
      frequency: 'daily',
      isActive: true,
      lastSent: new Date('2024-01-20'),
      jobsFound: 12
    },
    {
      id: '2',
      name: 'Frontend Engineer SF',
      query: 'Frontend Engineer',
      location: 'San Francisco',
      frequency: 'weekly',
      isActive: false,
      lastSent: new Date('2024-01-15'),
      jobsFound: 8
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Job Alerts</h1>
          <p className="text-muted-foreground mt-1">
            Get notified when new jobs match your criteria
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Job Alerts ({alerts.length})</CardTitle>
                <CardDescription>
                  Manage your automated job notifications
                </CardDescription>
              </div>
              <Button variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                Create Alert
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{alert.name}</h3>
                      <Badge variant={alert.isActive ? 'default' : 'outline'}>
                        {alert.isActive ? 'Active' : 'Paused'}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Search: "{alert.query}" in {alert.location}</p>
                      <p>Frequency: {alert.frequency}</p>
                      <p>Last sent: {alert.lastSent.toLocaleDateString()}</p>
                      <p>{alert.jobsFound} jobs found in last check</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Switch checked={alert.isActive} />
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}