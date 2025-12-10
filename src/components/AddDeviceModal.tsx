/**
 * AddDeviceModal Component
 * Modal for adding a new smart home device
 */

import React, { useState } from 'react';
import { X, Plus, Lightbulb, Fan, Thermometer, Tv, Gauge, DoorOpen } from 'lucide-react';

// Props for AddDeviceModal
interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (device: { name: string; room: string; type: string }) => void;
}

// Device types with their icons
const deviceTypes = [
  { value: 'light', label: 'Light', icon: Lightbulb },
  { value: 'fan', label: 'Fan', icon: Fan },
  { value: 'ac', label: 'AC', icon: Thermometer },
  { value: 'tv', label: 'TV', icon: Tv },
  { value: 'sensor', label: 'Sensor', icon: Gauge },
  { value: 'door', label: 'Door', icon: DoorOpen },
];

const AddDeviceModal: React.FC<AddDeviceModalProps> = ({ isOpen, onClose, onAdd }) => {
  // Form state
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [type, setType] = useState('light');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');

  // Reset form
  const resetForm = () => {
    setName('');
    setRoom('');
    setType('light');
    setError('');
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!name.trim()) {
      setError('Device name is required');
      return;
    }
    if (!room.trim()) {
      setError('Room is required');
      return;
    }

    setIsAdding(true);
    try {
      await onAdd({ name: name.trim(), room: room.trim(), type });
      resetForm();
    } catch (err) {
      setError('Failed to add device. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  // Handle close
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Don't render if modal is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative bg-card rounded-2xl shadow-elevated w-full max-w-md mx-4 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 gradient-bg rounded-lg">
              <Plus className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Add New Device</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Device Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Device Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Living Room Light"
              className="input-base"
            />
          </div>

          {/* Room */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Room
            </label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g., Living Room"
              className="input-base"
            />
          </div>

          {/* Device Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Device Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {deviceTypes.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setType(value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 ${
                    type === value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAdding}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? 'Adding...' : 'Add Device'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeviceModal;
