'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Navigation } from '@/components/navigation';
import { PageWrapper } from '@/components/page-wrapper';
import { SessionGuard } from '@/components/session-guard';
import { RoleGuard } from '@/components/role-guard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Database, Server, Check, X, Loader2, Save, RefreshCw, Cloud, HardDrive } from 'lucide-react';

interface DbConfig {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
}

interface ConnectionStatus {
  connected: boolean;
  message: string;
  latency?: number;
}

export default function DatabaseSettingsPage() {
  const { data: session } = useSession() || {};
  const [isElectron, setIsElectron] = useState(false);
  const [config, setConfig] = useState<DbConfig>({
    host: 'localhost',
    port: '5432',
    database: 'supermarket_pos',
    username: 'postgres',
    password: ''
  });
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [useLocalDb, setUseLocalDb] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<ConnectionStatus | null>(null);

  useEffect(() => {
    // Check if running in Electron
    const checkElectron = typeof window !== 'undefined' && (window as any).electronAPI;
    setIsElectron(!!checkElectron);

    // Load saved config from Electron storage
    if (checkElectron) {
      loadSavedConfig();
    }

    // Test cloud connection
    testCloudConnection();
  }, []);

  const loadSavedConfig = async () => {
    try {
      const savedConfig = await (window as any).electronAPI.getDbConfig();
      if (savedConfig) {
        setConfig(savedConfig.config || config);
        setUseLocalDb(savedConfig.useLocalDb || false);
      }
    } catch (error) {
      console.error('Failed to load saved config:', error);
    }
  };

  const testCloudConnection = async () => {
    try {
      const start = Date.now();
      const res = await fetch('/api/settings/database/test-cloud');
      const latency = Date.now() - start;
      const data = await res.json();
      setCloudStatus({
        connected: data.connected,
        message: data.message,
        latency
      });
    } catch (error) {
      setCloudStatus({
        connected: false,
        message: 'Cloud server unreachable'
      });
    }
  };

  const testConnection = async () => {
    setTesting(true);
    setConnectionStatus(null);

    try {
      const start = Date.now();
      const res = await fetch('/api/settings/database/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const latency = Date.now() - start;
      const data = await res.json();

      setConnectionStatus({
        connected: data.success,
        message: data.message,
        latency
      });

      if (data.success) {
        toast.success('Connection successful!');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setConnectionStatus({
        connected: false,
        message: 'Failed to test connection'
      });
      toast.error('Failed to test connection');
    } finally {
      setTesting(false);
    }
  };

  const saveConfig = async () => {
    if (!isElectron) {
      toast.error('Database settings can only be saved in desktop app');
      return;
    }

    setSaving(true);
    try {
      await (window as any).electronAPI.saveDbConfig({
        config,
        useLocalDb
      });

      // Also initialize the database schema if using local
      if (useLocalDb && connectionStatus?.connected) {
        const res = await fetch('/api/settings/database/init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config)
        });
        const data = await res.json();
        if (!data.success) {
          toast.error('Failed to initialize database: ' + data.message);
          return;
        }
      }

      toast.success('Database configuration saved!');
    } catch (error) {
      toast.error('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SessionGuard>
      <RoleGuard allowedRoles={['ADMIN']}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navigation />
          <PageWrapper>
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              <div className="flex items-center gap-3">
                <Database className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">Database Settings</h1>
                  <p className="text-muted-foreground">Configure your database connection</p>
                </div>
              </div>

              {/* Connection Mode Selection */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card
                  className={`cursor-pointer transition-all ${
                    !useLocalDb ? 'ring-2 ring-primary' : 'hover:border-primary/50'
                  }`}
                  onClick={() => setUseLocalDb(false)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Cloud className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-lg">Cloud Database</CardTitle>
                    </div>
                    <CardDescription>Connect to central cloud server for multi-location sync</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      {cloudStatus?.connected ? (
                        <><Check className="h-4 w-4 text-green-500" /> Connected ({cloudStatus.latency}ms)</>
                      ) : (
                        <><X className="h-4 w-4 text-red-500" /> {cloudStatus?.message || 'Checking...'}</>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${
                    useLocalDb ? 'ring-2 ring-primary' : 'hover:border-primary/50'
                  } ${!isElectron ? 'opacity-50' : ''}`}
                  onClick={() => isElectron && setUseLocalDb(true)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-5 w-5 text-orange-500" />
                      <CardTitle className="text-lg">Local Database</CardTitle>
                    </div>
                    <CardDescription>
                      {isElectron
                        ? 'Connect to local PostgreSQL for offline operation'
                        : 'Only available in desktop app'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm">
                      {connectionStatus?.connected ? (
                        <><Check className="h-4 w-4 text-green-500" /> Connected ({connectionStatus.latency}ms)</>
                      ) : (
                        <><Server className="h-4 w-4 text-gray-400" /> Not configured</>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Local Database Configuration */}
              {useLocalDb && isElectron && (
                <Card>
                  <CardHeader>
                    <CardTitle>Local PostgreSQL Configuration</CardTitle>
                    <CardDescription>
                      Enter your local PostgreSQL server details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="host">Host</Label>
                        <Input
                          id="host"
                          value={config.host}
                          onChange={(e) => setConfig({ ...config, host: e.target.value })}
                          placeholder="localhost"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="port">Port</Label>
                        <Input
                          id="port"
                          value={config.port}
                          onChange={(e) => setConfig({ ...config, port: e.target.value })}
                          placeholder="5432"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="database">Database Name</Label>
                      <Input
                        id="database"
                        value={config.database}
                        onChange={(e) => setConfig({ ...config, database: e.target.value })}
                        placeholder="supermarket_pos"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={config.username}
                          onChange={(e) => setConfig({ ...config, username: e.target.value })}
                          placeholder="postgres"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={config.password}
                          onChange={(e) => setConfig({ ...config, password: e.target.value })}
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button onClick={testConnection} disabled={testing} variant="outline">
                        {testing ? (
                          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Testing...</>
                        ) : (
                          <><RefreshCw className="h-4 w-4 mr-2" /> Test Connection</>
                        )}
                      </Button>
                      <Button onClick={saveConfig} disabled={saving || !connectionStatus?.connected}>
                        {saving ? (
                          <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...</>
                        ) : (
                          <><Save className="h-4 w-4 mr-2" /> Save Configuration</>
                        )}
                      </Button>
                    </div>

                    {connectionStatus && (
                      <div
                        className={`p-3 rounded-lg ${
                          connectionStatus.connected
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {connectionStatus.connected ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                          {connectionStatus.message}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Cloud Sync Status */}
              {useLocalDb && isElectron && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cloud className="h-5 w-5" />
                      Cloud Sync
                    </CardTitle>
                    <CardDescription>
                      Synchronize local data with the central cloud server
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Sync Status</p>
                        <p className="text-sm text-muted-foreground">
                          {cloudStatus?.connected ? 'Cloud connected' : 'Cloud offline'}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={async () => {
                          toast.info('Sync started...');
                          try {
                            await (window as any).electronAPI.triggerSync();
                            toast.success('Sync completed!');
                          } catch {
                            toast.error('Sync failed');
                          }
                        }}
                        disabled={!cloudStatus?.connected}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Now
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      When online, local changes will automatically sync to the cloud server.
                      Changes from other locations will be pulled down to your local database.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Setup Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Setup Instructions</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <h4>Installing PostgreSQL Locally</h4>
                  <ol className="text-sm space-y-2">
                    <li>Download PostgreSQL from <a href="https://www.postgresql.org/download/" target="_blank" rel="noopener" className="text-primary hover:underline">postgresql.org</a></li>
                    <li>Run the installer and set a password for the postgres user</li>
                    <li>Create a new database named <code className="bg-muted px-1 rounded">supermarket_pos</code></li>
                    <li>Enter your connection details above and test the connection</li>
                    <li>Click Save to apply the configuration</li>
                  </ol>

                  <h4 className="mt-4">Quick Database Creation (Terminal)</h4>
                  <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`psql -U postgres
CREATE DATABASE supermarket_pos;
\\q`}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </PageWrapper>
        </div>
      </RoleGuard>
    </SessionGuard>
  );
}
