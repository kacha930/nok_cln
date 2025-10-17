import React from 'react';
import Navbar from '../shared/Navbar';

const devices = [
  { name: 'Phone-1', ip: '192.168.1.101', type: 'Mobile' },
  { name: 'Laptop-Work', ip: '192.168.1.102', type: 'Laptop' },
  { name: 'SmartTV', ip: '192.168.1.120', type: 'TV' },
];

export default function Devices(){
  return (
    <div className="app-shell p-4">
      <header className="mb-4">
        <h2 className="text-lg font-semibold">Connected Devices</h2>
        <div className="text-xs text-gray-500">{devices.length} devices currently connected</div>
      </header>

      <div className="space-y-2">
        {devices.map((d,i)=>(
          <div key={i} className="mobile-card flex items-center justify-between">
            <div>
              <div className="font-medium">{d.name}</div>
              <div className="text-xs text-gray-500">{d.type} • {d.ip}</div>
            </div>
            <div className="text-sm text-gray-400">•</div>
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  )
}
