import React, { useState } from 'react';
import QR_CODE_URL from '../assets/img/scanner.jpeg';

const TRUST_NAME = "QADRI JAME MASJID TRUST";
const UPI_ID = "abc@upi";

const DonationModal = ({ isVisible, onClose }) => {
  const [isHindi, setIsHindi] = useState(false);

  if (!isVisible) return null;

  const TEXT = {
    title:        isHindi ? `सहयोग करें कादरी जामे मस्जिद ट्रस्ट`       : `SUPPORT ${TRUST_NAME}`,
    subtitle:     isHindi ? "मस्जिद की देखभाल और सेवाओं के लिए आपका सहयोग ज़रूरी है।" : "Help us maintain and serve our community.",
    upiScanTitle: isHindi ? "अपने UPI ऐप से स्कैन करके भुगतान करें"      : "Scan & Pay using your UPI App",
    scanToDonate: isHindi ? "दान करने के लिए स्कैन करें"                   : "SCAN TO DONATE",
    note:         isHindi ? "नोट: भुगतान के बाद कृपया स्क्रीनशॉट भेजें।"  : "Note: Please send screenshot after payment to confirm transaction.",
    orDonate:     isHindi ? "या बैंक विवरण द्वारा दान करें"                : "OR Donate via Account Details",
    accHolder:    isHindi ? "खाता धारक"     : "Account Holder",
    beneficiary:  isHindi ? "लाभार्थी"      : "Beneficiary (Vice President)",
    accNumber:    isHindi ? "खाता संख्या"   : "Account Number",
    ifsc:         isHindi ? "IFSC कोड"      : "IFSC Code",
    upi:          isHindi ? "UPI ID"         : "UPI ID",
    fastNote:     isHindi ? "* UPI QR दान करने का सबसे तेज़ तरीका है।"    : "* UPI QR is the fastest method for donating.",
    footer:       isHindi
      ? `© ${new Date().getFullYear()} ${TRUST_NAME}. सर्वाधिकार सुरक्षित।`
      : `© ${new Date().getFullYear()} ${TRUST_NAME}. All Rights Reserved.`,
    langBtn: isHindi ? "English" : "हिंदी में देखें",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 flex items-center justify-center text-sm font-bold transition-all duration-200"
        >
          ✕
        </button>

        {/* Lang Toggle */}
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => setIsHindi(!isHindi)}
            className="px-3 py-1.5 bg-isl-green text-white text-xs font-semibold rounded-lg hover:bg-isl-green-light transition-colors duration-200"
          >
            {TEXT.langBtn}
          </button>
        </div>

        <div className="p-6 sm:p-8 pt-14">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 font-body">{TEXT.title}</h1>
            <p className="text-gray-500 mt-2 text-sm font-body">{TEXT.subtitle}</p>
          </div>

          {/* Two-column body */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left — QR */}
            <div className="flex flex-col items-center text-center">
              <h2 className="text-base font-semibold text-gray-700 mb-5 border-b-2 border-isl-gold pb-1 font-body">
                {TEXT.upiScanTitle}
              </h2>
              <div className="bg-amber-50 shadow-inner p-3 rounded-xl border-4 border-isl-gold w-full max-w-[260px] mx-auto">
                <img src={QR_CODE_URL} alt="UPI QR Code" className="w-full h-auto rounded-lg object-contain" />
              </div>
              <p className="mt-4 text-lg font-bold text-gray-800 font-body">{TEXT.scanToDonate}</p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">
                  {TEXT.upi}: {UPI_ID}
                </span>
              </p>
              <div className="mt-5 p-3 bg-red-50 border border-red-300 text-red-700 rounded-xl w-full max-w-sm">
                <p className="text-xs font-medium font-body">{TEXT.note}</p>
              </div>
            </div>

            {/* Right — Bank Details */}
            <div className="flex flex-col">
              <h2 className="text-base font-semibold text-gray-700 mb-5 border-b-2 border-isl-gold pb-1 font-body">
                {TEXT.orDonate}
              </h2>
              <div className="space-y-3">
                {[
                  [TEXT.accHolder,   "QADRI JAME MASJID TRUST"],
                  [TEXT.beneficiary, "Raju Ali"],
                  [TEXT.accNumber,   "XXXXXXXXXXXX"],
                  [TEXT.ifsc,        "XXXXX00000"],
                  [TEXT.upi,         UPI_ID],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b pb-2 border-gray-100">
                    <span className="font-medium text-gray-600 text-sm font-body">{label}:</span>
                    <span className="font-mono font-semibold text-gray-800 text-sm">{value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-gray-500 italic p-3 bg-amber-50 rounded-lg border-l-4 border-isl-gold font-body">
                {TEXT.fastNote}
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6 font-body">{TEXT.footer}</p>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
