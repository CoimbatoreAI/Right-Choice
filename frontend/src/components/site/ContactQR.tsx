import QRCode from "react-qr-code";

export function ContactQR({ className = "" }: { className?: string }) {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Arjun;;;;
FN:Arjun
TEL;TYPE=CELL:9710123454
EMAIL:Chennaitravelcare@gmail.com
ADR;TYPE=WORK:;;Branches _ chennai & Coimbatore;;;;
ORG:Right Choice
END:VCARD`;

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="bg-white p-3 rounded-xl shadow-sm inline-block">
        <QRCode value={vCardData} size={140} level="M" />
      </div>
    </div>
  );
}
