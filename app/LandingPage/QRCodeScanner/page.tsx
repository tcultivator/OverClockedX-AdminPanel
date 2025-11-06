"use client";
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRCodeScanner = () => {
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isScanning) {
      const newScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      const onScanSuccess = (decodedText: string) => {
        console.log("✅ QR Code detected:", decodedText);
        setScannedCode(decodedText);
        setIsScanning(false); // hide scanner
        newScanner.clear();   // stop the camera
      };

      const onScanFailure = () => {}; // silence errors
      newScanner.render(onScanSuccess, onScanFailure);

      setScanner(newScanner);

      // cleanup
      return () => {
        newScanner.clear().catch(() => {});
      };
    }
  }, [isScanning]);

  const handleStartScan = () => {
    setScannedCode(null);
    setIsScanning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {!isScanning && (
        <>
          {scannedCode ? (
            <div className="text-center mb-4">
              <p className="mb-2">✅ Scanned Code:</p>
              <p className="font-mono bg-gray-100 p-2 rounded">
                {scannedCode}
              </p>
            </div>
          ) : (
            <p className="mb-4 text-gray-500">No code scanned yet</p>
          )}

          <button
            onClick={handleStartScan}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {scannedCode ? "Scan Again" : "Start Scanning"}
          </button>
        </>
      )}

      {/* Only show scanner when active */}
      {isScanning && <div id="reader" className="w-[600px] h-[600px]" />}
    </div>
  );
};

export default QRCodeScanner;
