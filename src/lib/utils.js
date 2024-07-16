import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function GenPDF(qrcode, ssid) {
  const SaveFile = () => {
    const content = qrcode;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');

    link.href = url;
    link.download = `{ssid}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
}




export default GenPDF;