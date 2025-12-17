
import React, { useEffect, useState } from 'react';
import { getHealth } from '../api/api';
import { Activity } from 'lucide-react';

const ServerStatus: React.FC = () => {
    const [isOnline, setIsOnline] = useState<boolean | null>(null);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                await getHealth();
                setIsOnline(true);
            } catch (error) {
                console.error('Health check failed:', error);
                setIsOnline(false);
            }
        };

        checkHealth();
        // Check every 30 seconds
        const interval = setInterval(checkHealth, 30000);
        return () => clearInterval(interval);
    }, []);

    if (isOnline === null) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm transition-all duration-300
        ${isOnline
                    ? 'bg-success/10 text-success border border-success/20'
                    : 'bg-destructive/10 text-destructive border border-destructive/20'}
      `}>
                <div className={`relative flex h-2 w-2`}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-success' : 'bg-destructive'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isOnline ? 'bg-success' : 'bg-destructive'}`}></span>
                </div>
                <span>{isOnline ? 'System Online' : 'System Offline'}</span>
            </div>
        </div>
    );
};

export default ServerStatus;
