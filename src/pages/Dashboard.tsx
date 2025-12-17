/**
 * Dashboard Page for SmartHome Hub
 * Displays all devices with controls
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDevices, toggleDevice, updateACSettings, addDevice, deleteDevice } from '../api/api';
import Navbar from '../components/Navbar';
import DeviceCard from '../components/DeviceCard';
import ACModal from '../components/ACModal';
import AddDeviceModal from '../components/AddDeviceModal';
import { Plus, RefreshCw, LayoutGrid, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// Device type definition
interface Device {
  _id: string;
  name: string;
  type: string;
  room: string;
  status: string; // "on" or "off" from backend
  temperature?: number; // For AC devices
  mode?: string; // For AC devices
  acSettings?: {
    temperature: number;
    mode: string;
  };
}

const Dashboard: React.FC = () => {
  // State
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal states
  const [isACModalOpen, setIsACModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { user } = useAuth();

  // Fetch devices on mount
  useEffect(() => {
    fetchDevices();
  }, []);

  // Fetch all devices from API
  const fetchDevices = async () => {
    try {
      setError('');
      console.log('🔄 Fetching devices from API...');
      const data = await getDevices();
      console.log('✅ API Response received:', data);
      console.log('📦 Response type:', typeof data);
      console.log('📦 Response keys:', Object.keys(data || {}));
      console.log('📋 Devices array:', data.devices);
      console.log('📋 Devices array type:', typeof data.devices);
      console.log('📋 Is array?:', Array.isArray(data.devices));

      if (data.devices && Array.isArray(data.devices)) {
        console.log('📋 Number of devices:', data.devices.length);
        if (data.devices.length > 0) {
          console.log('📋 First device:', data.devices[0]);
        }
      }

      setDevices(data.devices || []);
    } catch (err: any) {
      setError('Failed to load devices. Please try again.');
      console.error('❌ Error fetching devices:', err);
      console.error('❌ Error details:', err.response?.data);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Handle refresh button click
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchDevices();
  };

  // Handle device toggle
  const handleToggle = async (deviceId: string) => {
    try {
      const response = await toggleDevice(deviceId);
      console.log('Toggle response:', response);

      // Update local state with the new device data from response
      setDevices(prev =>
        prev.map(device =>
          device._id === deviceId
            ? { ...device, status: response.device?.status || (device.status === "on" ? "off" : "on") }
            : device
        )
      );
      toast.success('Device status updated!');
    } catch (err) {
      toast.error('Failed to toggle device');
      console.error('Error toggling device:', err);
    }
  };

  // Handle opening AC modal
  const handleOpenACModal = (device: Device) => {
    setSelectedDevice(device);
    setIsACModalOpen(true);
  };

  // Handle saving AC settings
  const handleSaveACSettings = async (deviceId: string, settings: { temperature: number; mode: string }) => {
    try {
      await updateACSettings(deviceId, settings);
      // Update local state
      setDevices(prev =>
        prev.map(device =>
          device._id === deviceId
            ? { ...device, acSettings: settings }
            : device
        )
      );
      setIsACModalOpen(false);
      toast.success('AC settings updated!');
    } catch (err) {
      toast.error('Failed to update AC settings');
      console.error('Error updating AC settings:', err);
    }
  };

  // Handle adding new device
  const handleAddDevice = async (deviceData: { name: string; room: string; type: string }) => {
    try {
      const newDevice = await addDevice(deviceData);
      setDevices(prev => [...prev, newDevice]);
      setIsAddModalOpen(false);
      toast.success('Device added successfully!');
    } catch (err) {
      toast.error('Failed to add device');
      console.error('Error adding device:', err);
      throw err; // Re-throw to let modal handle it
    }
  };

  // Handle deleting a device
  const handleDeleteDevice = async (deviceId: string) => {
    if (!window.confirm('Are you sure you want to delete this device? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteDevice(deviceId);
      // Update local state to remove the deleted device
      setDevices(prev => prev.filter(device => device._id !== deviceId));
      toast.success('Device deleted successfully');
    } catch (err) {
      toast.error('Failed to delete device');
      console.error('Error deleting device:', err);
    }
  };

  // Count devices by status
  // Count devices by status
  const onlineCount = (devices || []).filter(d => d.status === "on").length;
  // Calculate offline as total minus online to ensure numbers match, regardless of underlying status value
  const offlineCount = (devices || []).length - onlineCount;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Device Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back{user ? `, ${user}` : ''}! Manage your smart devices.
            </p>
          </div>

          <div className="flex gap-3">
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="btn-secondary flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            {/* Add Device Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Device
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="card-base">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <LayoutGrid className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{devices.length}</p>
                <p className="text-sm text-muted-foreground">Total Devices</p>
              </div>
            </div>
          </div>

          <div className="card-base">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <div className="w-5 h-5 rounded-full bg-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{onlineCount}</p>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </div>
          </div>

          <div className="card-base col-span-2 sm:col-span-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <div className="w-5 h-5 rounded-full bg-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{offlineCount}</p>
                <p className="text-sm text-muted-foreground">Offline</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground">Loading devices...</p>
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
        {!isLoading && !error && devices.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
              <LayoutGrid className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No devices yet</h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              Start by adding your first smart device to control it from anywhere.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Your First Device
            </button>
          </div>
        )}

        {/* Device Grid */}
        {!isLoading && !error && devices.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {devices.map((device) => (
              <DeviceCard
                key={device._id}
                device={device}
                onToggle={handleToggle}
                onOpenACModal={handleOpenACModal}
                onDelete={handleDeleteDevice}
              />
            ))}
          </div>
        )}
      </main>

      {/* AC Settings Modal */}
      <ACModal
        device={selectedDevice}
        isOpen={isACModalOpen}
        onClose={() => setIsACModalOpen(false)}
        onSave={handleSaveACSettings}
      />

      {/* Add Device Modal */}
      <AddDeviceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDevice}
      />
    </div>
  );
};

export default Dashboard;
