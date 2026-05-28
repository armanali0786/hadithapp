import React from 'react';
import QR_CODE_URL from '../assets/img/scanner.jpeg';

const TRUST_NAME = "QADRI JAME MASJID TRUST";
const UPI_ID = "abc@upi";

const DonationModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const TEXT = {
    title:        `SUPPORT ${TRUST_NAME}`,
    subtitle:     "Help us maintain and serve our community.",
    upiScanTitle: "Scan & Pay using your UPI App",
    scanToDonate: "SCAN TO DONATE",
    note:         "Note: Please send screenshot after payment to confirm transaction.",
    orDonate:     "OR Donate via Account Details",
    accHolder:    "Account Holder",
    beneficiary:  "Beneficiary (Vice President)",
    accNumber:    "Account Number",
    ifsc:         "IFSC Code",
    upi:          "UPI ID",
    fastNote:     "* UPI QR is the fastest method for donating.",
    footer:       `© ${new Date().getFullYear()} ${TRUST_NAME}. All Rights Reserved.`,
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
