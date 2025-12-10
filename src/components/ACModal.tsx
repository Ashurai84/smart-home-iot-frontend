/**
 * ACModal Component
 * Modal for updating AC device settings (temperature and mode)
 */

import React, { useState, useEffect } from 'react';
import { X, Thermometer, Wind } from 'lucide-react';

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

// Props for ACModal
interface ACModalProps {
  device: Device | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (deviceId: string, settings: { temperature: number; mode: string }) => void;
}

const ACModal: React.FC<ACModalProps> = ({ device, isOpen, onClose, onSave }) => {
  // State for form fields
  const [temperature, setTemperature] = useState<number>(24);
  const [mode, setMode] = useState<string>('cool');
  const [isSaving, setIsSaving] = useState(false);

  // Available AC modes
  const modes = ['cool', 'auto', 'fan', 'dry'];

  // Update form when device changes
  useEffect(() => {
    if (device?.acSettings) {
      setTemperature(device.acSettings.temperature);
      setMode(device.acSettings.mode);
    } else {
      // Default values
      setTemperature(24);
      setMode('cool');
    }
  }, [device]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!device) return;

    setIsSaving(true);
    try {
      await onSave(device._id, { temperature, mode });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle temperature input
  const handleTemperatureChange = (value: number) => {
    // Clamp temperature between 16 and 30
    const clampedValue = Math.min(30, Math.max(16, value));
    setTemperature(clampedValue);
  };

  // Don't render if modal is closed
  if (!isOpen || !device) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-card rounded-2xl shadow-elevated w-full max-w-md mx-4 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Thermometer className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">AC Settings</h2>
              <p className="text-sm text-muted-foreground">{device.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Temperature Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Temperature (°C)
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleTemperatureChange(temperature - 1)}
                className="w-12 h-12 rounded-xl bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={temperature}
                onChange={(e) => handleTemperatureChange(parseInt(e.target.value) || 24)}
                min={16}
                max={30}
                className="flex-1 input-base text-center text-2xl font-bold"
              />
              <button
                type="button"
                onClick={() => handleTemperatureChange(temperature + 1)}
                className="w-12 h-12 rounded-xl bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Range: 16°C - 30°C
            </p>
          </div>

          {/* Mode Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              <span className="flex items-center gap-2">
                <Wind className="w-4 h-4" />
                Mode
              </span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {modes.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`px-4 py-3 rounded-xl font-medium capitalize transition-all duration-200 ${
                    mode === m
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ACModal;
