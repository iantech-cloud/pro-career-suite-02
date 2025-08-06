import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram,
  Plus,
  Unlink,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { SocialAccount } from '@/types/api';

export default function ConnectionsPage() {
  const { toast } = useToast();

  const [accounts, setAccounts] = useState<SocialAccount[]>([
    {
      id: '1',
      platform: 'twitter',
      username: '@johndoe_dev',
      isConnected: true,
      lastSync: new Date('2024-01-20T10:00:00')
    },
    {
      id: '2',
      platform: 'linkedin',
      username: 'John Doe',
      isConnected: true,
      lastSync: new Date('2024-01-20T09:30:00')
    },
    {
      id: '3',
      platform: 'facebook',
      username: 'John Doe',
      isConnected: false,
      lastSync: new Date('2024-01-15T14:00:00')
    },
    {
      id: '4',
      platform: 'instagram',
      username: 'johndoe_photos',
      isConnected: false,
      lastSync: new Date('2024-01-10T16:00:00')
    }
  ]);

  const platformConfig = {
    twitter: {
      name: 'Twitter',
      icon: Twitter,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      description: 'Share quick updates and engage with your professional network'
    },
    linkedin: {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Connect with professionals and share career insights'
    },
    facebook: {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      description: 'Reach a broader audience with your personal brand'
    },
    instagram: {
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      description: 'Share visual content and behind-the-scenes moments'
    }
  };

  const handleConnect = (platformId: string) => {
    // In a real app, this would open OAuth flow
    setAccounts(prev => 
      prev.map(account => 
        account.platform === platformId 
          ? { ...account, isConnected: true, lastSync: new Date() }
          : account
      )
    );
    
    toast({
      title: "Account connected!",
      description: `Your ${platformConfig[platformId as keyof typeof platformConfig].name} account has been connected successfully.`
    });
  };

  const handleDisconnect = (platformId: string) => {
    setAccounts(prev => 
      prev.map(account => 
        account.platform === platformId 
          ? { ...account, isConnected: false }
          : account
      )
    );
    
    toast({
      title: "Account disconnected",
      description: `Your ${platformConfig[platformId as keyof typeof platformConfig].name} account has been disconnected.`
    });
  };

  const handleRefresh = (platformId: string) => {
    setAccounts(prev => 
      prev.map(account => 
        account.platform === platformId 
          ? { ...account, lastSync: new Date() }
          : account
      )
    );
    
    toast({
      title: "Account refreshed",
      description: "Account information has been updated successfully."
    });
  };

  const connectedCount = accounts.filter(account => account.isConnected).length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Social Connections</h1>
          <p className="text-muted-foreground mt-1">
            Connect your social media accounts to publish content across platforms
          </p>
        </div>

        {/* Overview Card */}
        <Card className="shadow-card mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Connected Accounts</h3>
                <p className="text-muted-foreground">
                  {connectedCount} of {accounts.length} platforms connected
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{connectedCount}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
            </div>
            <div className="mt-4 bg-muted rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${(connectedCount / accounts.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {accounts.map((account) => {
            const config = platformConfig[account.platform as keyof typeof platformConfig];
            const IconComponent = config.icon;
            
            return (
              <Card key={account.id} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{config.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {account.username}
                        </CardDescription>
                      </div>
                    </div>
                    
                    {account.isConnected ? (
                      <Badge className="bg-success/10 text-success border-success/20">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Disconnected
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {config.description}
                  </p>
                  
                  {account.isConnected && (
                    <div className="text-xs text-muted-foreground">
                      Last synced: {account.lastSync.toLocaleString()}
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    {account.isConnected ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRefresh(account.platform)}
                          className="flex-1"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Refresh
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisconnect(account.platform)}
                          className="flex-1 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Unlink className="w-4 h-4 mr-2" />
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="hero"
                        size="sm"
                        onClick={() => handleConnect(account.platform)}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Connect Account
                      </Button>
                    )}
                  </div>
                  
                  {account.isConnected && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => window.open(`https://${account.platform}.com`, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      View on {config.name}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Help Section */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Having trouble connecting your accounts?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• Make sure you have the necessary permissions for each platform</p>
              <p>• Some platforms may require business accounts for API access</p>
              <p>• If connection fails, try refreshing the page and connecting again</p>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Documentation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}