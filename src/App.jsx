import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const WifiQRCodeGenerator = () => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [authType, setAuthType] = useState('WPA');
  const [showQR, setShowQR] = useState(false);

  const generateQRCode = () => {
    setShowQR(true);
  };

  const wifiString = `WIFI:T:${authType};S:${ssid};P:${password};;`;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>🛜 Wi-Fi QR Code Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ssid">Wi-Fi Name (SSID)</Label>
          <Input
            id="ssid"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            placeholder="Enter Wi-Fi name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Wi-Fi password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="authType">Authentication Type</Label>
          <Select value={authType} onValueChange={setAuthType}>
            <SelectTrigger id="authType">
              <SelectValue placeholder="Select auth type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WPA">WPA/WPA2</SelectItem>
              <SelectItem value="WEP">WEP</SelectItem>
              <SelectItem value="nopass">No Password</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={generateQRCode} className="w-full">
          Generate QR Code
        </Button>
        {showQR && (
          <div className="flex justify-center mt-4">
            <QRCodeSVG value={wifiString} size={200} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WifiQRCodeGenerator;