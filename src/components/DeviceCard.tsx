/**
 * DeviceCard Component
 * Displays a single smart home device with controls
 */

import React from 'react';
import { 
  Lightbulb, 
  Fan, 
  Tv, 
  Thermometer, 
  DoorOpen, 
  Gauge,
  Power,
  Settings
} from 'lucide-react';

// Device type definition
interface Device {
  _id: string;
  name: string;
  type: string;
  room: string;
  status: boolean;
  acSettings?: {
    temperature: number;
    mode: string;
  };
}

// Props for DeviceCard
interface DeviceCardProps {
  device: Device;
  onToggle: (id: string) => void;
  onOpenACModal: (device: Device) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onToggle, onOpenACModal }) => {
  // Get icon based on device type
  const getDeviceIcon = () => {
    const iconClass = "w-8 h-8";
    switch (device.type.toLowerCase()) {
      case 'light':
        return <Lightbulb className={iconClass} />;
      case 'fan':
        return <Fan className={iconClass} />;
      case 'tv':
        return <Tv className={iconClass} />;
      case 'ac':
        return <Thermometer className={iconClass} />;
      case 'door':
        return <DoorOpen className={iconClass} />;
      case 'sensor':
        return <Gauge className={iconClass} />;
      default:
        return <Power className={iconClass} />;
    }
  };

  // Handle toggle button click
  const handleToggle = () => {
    onToggle(device._id);
  };

  // Handle AC settings button click
  const handleACSettings = () => {
    onOpenACModal(device);
  };

  return (
    <div className="card-hover group">
      {/* Device Header */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon with status indicator */}
        <div 
          className={`p-3 rounded-xl transition-colors duration-200 ${
            device.status 
              ? 'bg-primary/10 text-primary' 
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {getDeviceIcon()}
        </div>
        
        {/* Status Badge */}
        <span 
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            device.status 
              ? 'status-on' 
              : 'status-off'
          }`}
        >
          {device.status ? 'ON' : 'OFF'}
        </span>
      </div>

      {/* Device Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {device.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {device.room} • {device.type.charAt(0).toUpperCase() + device.type.slice(1)}
        </p>
      </div>

      {/* AC Settings Display (if AC and has settings) */}
      {device.type.toLowerCase() === 'ac' && device.acSettings && (
        <div className="mb-4 p-3 bg-secondary rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Temperature</span>
            <span className="font-medium text-foreground">{device.acSettings.temperature}°C</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">Mode</span>
            <span className="font-medium text-foreground capitalize">{device.acSettings.mode}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
            device.status
              ? 'bg-destructive/10 text-destructive hover:bg-destructive/20'
              : 'bg-success/10 text-success hover:bg-success/20'
          }`}
        >
          <Power className="w-4 h-4" />
          {device.status ? 'Turn Off' : 'Turn On'}
        </button>

        {/* AC Settings Button (only for AC devices) */}
        {device.type.toLowerCase() === 'ac' && (
          <button
            onClick={handleACSettings}
            className="px-4 py-3 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 transition-all duration-200"
            title="AC Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DeviceCard;
