import React from 'react';
import Navbar from '../shared/Navbar';

export default function SpeedTest(){
  return (
    <div className="app-shell p-4">
      <header className="mb-4">
        <h2 className="text-lg font-semibold">Speed Test</h2>
        <div className="text-xs text-gray-500">Mock speed test results</div>
      </header>

      <div className="mobile-card">
        <div className="text-sm text-gray-500">Download</div>
        <div className="text-2xl font-semibold mt-2">120 Mbps</div>
        <div className="text-sm text-gray-500 mt-3">Upload: 20 Mbps • Latency: 16 ms</div>
      </div>

      <Navbar />
    </div>
  )
}
