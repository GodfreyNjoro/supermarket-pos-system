'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { SessionGuard } from '@/components/session-guard';
import { Navigation } from '@/components/navigation';
import { PageWrapper } from '@/components/page-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Shield } from 'lucide-react';
import { hasPermission, ROLE_PERMISSIONS } from '@/lib/permissions';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  storeId?: string;
  isActive: boolean;
  createdAt: string;
  store?: { name: string };
}

interface Store {
  id: string;
  name: string;
}

const ROLES = ['ADMIN', 'MANAGER', 'CASHIER', 'INVENTORY_CLERK'];

export default function UsersPage() {
  const { data: session } = useSession() || {};
  const [users, setUsers] = useState<User[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPermissions, setShowPermissions] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '', name: '', password: '', role: 'CASHIER', storeId: '', isActive: true
  });

  const userRole = (session?.user as { role?: string })?.role || '';
  const canManage = userRole && hasPermission(userRole, 'MANAGE_USERS');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [usersRes, storesRes] = await Promise.all([
      fetch('/api/users'),
      fetch('/api/stores')
    ]);
    if (usersRes.ok) setUsers(await usersRes.json());
    if (storesRes.ok) setStores(await storesRes.json());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingUser ? `/api/users/${editingUser.id}` : '/api/users';
    const method = editingUser ? 'PUT' : 'POST';

    const payload = { ...formData };
    if (editingUser && !formData.password) {
      delete (payload as Record<string, unknown>).password;
    }

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      toast.success(editingUser ? 'User updated' : 'User created');
      setIsOpen(false);
      setEditingUser(null);
      setFormData({ email: '', name: '', password: '', role: 'CASHIER', storeId: '', isActive: true });
      fetchData();
    } else {
      toast.error('Failed to save user');
    }
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      name: user.name || '',
      password: '',
      role: user.role,
      storeId: user.storeId || '',
      isActive: user.isActive
    });
    setIsOpen(true);
  };

  const toggleActive = async (user: User) => {
    const res = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...user, isActive: !user.isActive })
    });
    if (res.ok) {
      toast.success(`User ${!user.isActive ? 'activated' : 'deactivated'}`);
      fetchData();
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'destructive';
      case 'MANAGER': return 'default';
      case 'INVENTORY_CLERK': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <SessionGuard>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <PageWrapper>
          <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-bold">User Management</h1>
              <p className="text-sm text-muted-foreground">Manage users and their roles</p>
            </div>
        {canManage && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingUser(null); setFormData({ email: '', name: '', password: '', role: 'CASHIER', storeId: '', isActive: true }); }}>
                <Plus className="w-4 h-4 mr-2" /> Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Email*</Label>
                  <Input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div>
                  <Label>Name</Label>
                  <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <Label>{editingUser ? 'New Password (leave blank to keep)' : 'Password*'}</Label>
                  <Input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required={!editingUser} />
                </div>
                <div>
                  <Label>Role</Label>
                  <Select value={formData.role} onValueChange={v => setFormData({ ...formData, role: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ROLES.map(r => <SelectItem key={r} value={r}>{r.replace('_', ' ')}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Assigned Store</Label>
                  <Select value={formData.storeId || 'all'} onValueChange={v => setFormData({ ...formData, storeId: v === 'all' ? '' : v })}>
                    <SelectTrigger><SelectValue placeholder="All stores (Admin only)" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stores</SelectItem>
                      {stores.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                {editingUser && (
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.isActive} onCheckedChange={v => setFormData({ ...formData, isActive: v })} />
                    <Label>Active</Label>
                  </div>
                )}
                <Button type="submit" className="w-full">{editingUser ? 'Update' : 'Create'}</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {ROLES.map(role => (
          <Card key={role}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{role.replace('_', ' ')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter(u => u.role === role).length}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                {canManage && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name || 'No name'}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeColor(user.role) as 'default' | 'secondary' | 'destructive' | 'outline'}>
                      {user.role.replace('_', ' ')}
                    </Badge>
                    <Button variant="ghost" size="sm" className="ml-2" onClick={() => setShowPermissions(showPermissions === user.id ? null : user.id)}>
                      <Shield className="w-3 h-3" />
                    </Button>
                  </TableCell>
                  <TableCell>{user.store?.name || 'All Stores'}</TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? 'default' : 'secondary'}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  {canManage && (
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(user)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => toggleActive(user)}>
                          {user.isActive ? 'Disable' : 'Enable'}
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showPermissions && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Permissions for {users.find(u => u.id === showPermissions)?.role}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {ROLE_PERMISSIONS[users.find(u => u.id === showPermissions)?.role || '']?.map(perm => (
                <Badge key={perm} variant="outline">{perm.replace(/_/g, ' ')}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
          </div>
        </PageWrapper>
      </div>
    </SessionGuard>
  );
}
