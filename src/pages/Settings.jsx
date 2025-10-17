import React, { useState } from 'react';
import Navbar from '../shared/Navbar';

export default function Settings(){
  const [ssid, setSsid] = useState('Nokia-Guest');
  const [pwd, setPwd] = useState('guestwifi123');

  const save = (e)=>{ e.preventDefault(); alert('Settings saved (demo)'); }

  return (
    <div className="app-shell p-4">
      <header className="mb-4">
        <h2 className="text-lg font-semibold">WiFi Settings</h2>
        <div className="text-xs text-gray-500">Change network name and password</div>
      </header>

      <form className="space-y-3" onSubmit={save}>
        <div className="mobile-card">
          <label className="text-sm text-gray-500">Network name (SSID)</label>
          <input value={ssid} onChange={e=>setSsid(e.target.value)} className="w-full border rounded mt-2 px-3 py-2" />
        </div>

        <div className="mobile-card">
          <label className="text-sm text-gray-500">Password</label>
          <input value={pwd} onChange={e=>setPwd(e.target.value)} className="w-full border rounded mt-2 px-3 py-2" />
        </div>

        <button className="w-full bg-nokia text-white py-2 rounded">Save</button>
      </form>

      <Navbar />
    </div>
  )
}
