import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, Shield, Crown, User, Calendar, Mail } from 'lucide-react';
import { User as UserType, UserTier } from '@/types/user';

const AdminManageUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');

  const mockUsers: UserType[] = [
    {
      id: '1',
      email: 'john.doe@example.com',
      name: 'John Doe',
      tier: 'pro',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      tier: 'free',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '3',
      email: 'mike.wilson@premium.com',
      name: 'Mike Wilson',
      tier: 'premium',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-22')
    }
  ];

  const getTierBadgeVariant = (tier: UserTier) => {
    switch (tier) {
      case 'admin': return 'destructive';
      case 'premium': return 'default';
      case 'pro': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage user accounts, permissions, and subscriptions
          </p>
        </div>
        <Button variant="hero">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users ({mockUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-semibold">{user.name}</h3>
                      <Badge variant={getTierBadgeVariant(user.tier)}>
                        {user.tier}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span>{user.email}</span>
                      <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminManageUsersPage;