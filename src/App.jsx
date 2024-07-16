import { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PasswordInput } from './components/ui/passwordInput';
import { Button } from './components/ui/button';
import { jsPDF } from "jspdf";

const WifiQRCodeGenerator = () => {
  const [ssid, setSsid] = useState('');
  const [showQR, setShowQR] = useState(false);

  const generateQRCode = () => {
    setShowQR(true);
  };
  const [password, setPassword] = useState('');
  const [authType, setAuthType] = useState('WPA');

  const wifiString = `WIFI:T:${authType};S:${ssid};P:${password};;`;

  const qrRef = useRef(null);
  const [svgXml, setSvgXml] = useState('');

  useEffect(() => {
    if (qrRef.current) {
      const serializer = new XMLSerializer();
      const svgElement = qrRef.current.querySelector('svg');
      if (svgElement) {
        const xmlString = serializer.serializeToString(svgElement);
        setSvgXml(xmlString);
      }
    }
  }, []);

  const createPDF = () => {
    const doc = new jsPDF();

    // Add some text
    doc.text("This is a wifi network", 20, 20);

    // Add user input to PDF
    doc.setFontSize(16);
    doc.text(`SSID: ${ssid}`, 20, 40);
    doc.text(`password: ${password}`, 20, 50);


    doc.addSvgAsImage(svgXml, 20, 60, 50, 50)

    setTimeout(doc.save, 1000, `${ssid}.pdf`);
  };

  const downloadAsPNG = () => {
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;
    const resizeSVG = svg.cloneNode(true);
    resizeSVG.setAttribute('width', '1000');
    resizeSVG.setAttribute('height', '1000');
    
    const svgData = new XMLSerializer().serializeToString(resizeSVG);
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const img = new Image();
  
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
  
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
  
      downloadLink.download = `${ssid}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
  
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

    return (
      <div className="h-screen flex items-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>🛜 What's the Wi-Fi?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2" onChange={generateQRCode}>
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
              <PasswordInput
                id="password"
                type="password"
                value={password}
                onChange={setPassword}
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
                  <SelectItem value="WPA2-EAP">WPA2-EAP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {
              showQR && (
                <div ref={qrRef} className="flex justify-center mt-4">
                  <QRCodeSVG value={wifiString} size={200} />
                </div>
              )
            }
            {
              showQR && (
                <div className="flex justify-center mt-4 space-x-4">
                  <Button onClick={createPDF} className="w-full">
                    Download PDF
                  </Button>
                  <Button onClick={downloadAsPNG} className="w-full">
                    Download QR
                  </Button>
                </div>)
            }
          </CardContent>
        </Card>
      </div>
    );
  };

  export default WifiQRCodeGenerator;