/**
 * Logs Page for SmartHome Hub
 * Displays activity logs for all devices
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api, { getLogs, getDevices } from '../api/api';
import Navbar from '../components/Navbar';
import { ScrollText, RefreshCw, AlertCircle, Clock, Info } from 'lucide-react';

// Log entry type definition
interface LogEntry {
  _id: string;
  deviceName?: string;
  device?: any; // Could be object or string ID
  deviceId?: string; // Potential field
  action: string;
  timestamp: string;
  createdAt?: string; // Potential backend field name
  date?: string; // Potential backend field name
  time?: string; // Potential backend field name
  details?: any;
}

const Logs: React.FC = () => {
  // State
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [deviceMap, setDeviceMap] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { deviceId } = useParams();

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch devices to create a name map (in case logs only have IDs)
        const devicesData = await getDevices().catch(() => ({ devices: [] }));
        const map: Record<string, string> = {};
        if (devicesData.devices && Array.isArray(devicesData.devices)) {
          devicesData.devices.forEach((d: any) => {
            map[d._id] = d.name;
          });
        }
        setDeviceMap(map);

        // Fetch Logs
        await fetchLogs(false);
      } catch (err) {
        console.error('Error loading initial data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [deviceId]);

  // Fetch logs from API
  const fetchLogs = async (shouldSetLoading = true) => {
    try {
      setError('');
      if (shouldSetLoading) setIsLoading(true);
      const data = deviceId
        ? await api.get(`/logs/${deviceId}`).then(res => res.data.logs)
        : await getLogs().then(res => res.logs || res); // Handle potential response structure difference

      setLogs(Array.isArray(data) ? data : (data.logs || []));
    } catch (err: any) {
      setError('Failed to load logs. Please try again.');
      console.error('Error fetching logs:', err);
    } finally {
      if (shouldSetLoading) setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Handle refresh button click
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchLogs(false); // Don't trigger full loading spinner, just refresh icon
  };

  // Format timestamp to readable format
  const formatTimestamp = (timestamp: string | undefined, logEntry?: any) => {
    // Try to find a valid timestamp field
    const timeValue = timestamp || logEntry?.createdAt || logEntry?.date || logEntry?.time;

    if (!timeValue) return 'Unknown Time';

    const date = new Date(timeValue);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      // console.warn('Invalid timestamp received:', timeValue); // Suppress warning to clean console
      return 'Invalid Date';
    }

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  // Format details object to string
  const formatDetails = (details: any) => {
    if (!details) return '-';
    if (typeof details === 'string') return details;
    try {
      return JSON.stringify(details, null, 2);
    } catch {
      return String(details);
    }
  };

  // Get device name from log entry or fallback to ID mapping
  const getDeviceName = (log: LogEntry) => {
    // 1. Try direct name field
    if (log.deviceName) return log.deviceName;

    // 2. Try nested device object name
    if (log.device && typeof log.device === 'object' && log.device.name) {
      return log.device.name;
    }

    // 3. Try to map from device ID (which could be in log.device or log.deviceId)
    const idToLookup = typeof log.device === 'string' ? log.device : log.deviceId;

    if (idToLookup && deviceMap[idToLookup]) {
      return deviceMap[idToLookup];
    }

    return 'Unknown Device';
  };

  // Get action badge color
  const getActionColor = (action: string) => {
    const lowerAction = action.toLowerCase();
    if (lowerAction.includes('on') || lowerAction.includes('add') || lowerAction.includes('create')) {
      return 'bg-success/10 text-success';
    }
    if (lowerAction.includes('off') || lowerAction.includes('delete') || lowerAction.includes('remove')) {
      return 'bg-destructive/10 text-destructive';
    }
    if (lowerAction.includes('update') || lowerAction.includes('change') || lowerAction.includes('setting')) {
      return 'bg-primary/10 text-primary';
    }
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Activity Logs
            </h1>
            <p className="text-muted-foreground mt-1">
              Track all device activities and changes
            </p>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn-secondary flex items-center gap-2 self-start sm:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground">Loading activity logs...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <p className="text-foreground font-medium mb-2">Something went wrong</p>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button onClick={handleRefresh} className="btn-primary">
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && logs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
              <ScrollText className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No activity yet</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Activity logs will appear here when you interact with your devices.
            </p>
          </div>
        )}

        {/* Logs Table - Desktop */}
        {!isLoading && !error && logs.length > 0 && (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block card-base overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Device
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Action
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Time
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {logs.map((log) => (
                      <tr key={log._id} className="hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-medium text-foreground">
                            {getDeviceName(log)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getActionColor(log.action)}`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-muted-foreground text-sm">
                            {formatTimestamp(log.timestamp, log)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-muted-foreground font-mono">
                            {log.details ? (
                              <code className="bg-secondary px-2 py-1 rounded text-xs">
                                {formatDetails(log.details)}
                              </code>
                            ) : (
                              '-'
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {logs.map((log) => (
                <div key={log._id} className="card-base">
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-medium text-foreground">
                      {getDeviceName(log)}
                    </span>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="w-4 h-4" />
                    {formatTimestamp(log.timestamp, log)}
                  </div>

                  {log.details && (
                    <div className="flex items-start gap-2 text-sm">
                      <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <code className="bg-secondary px-2 py-1 rounded text-xs text-muted-foreground flex-1 overflow-auto">
                        {formatDetails(log.details)}
                      </code>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Log Count */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Showing {logs.length} log {logs.length === 1 ? 'entry' : 'entries'}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Logs;
