import React, { useState } from 'react';
import '../assets/styles/donation_modal.css';
import QR_CODE_URL from '../assets/img/scanner.jpeg';

const TRUST_NAME = "QADRI JAME MASJID TRUST";
const UPI_ID = "abc@upi";

const DonationModal = ({ isVisible, onClose }) => {

    const [isHindi, setIsHindi] = useState(false);

    if (!isVisible) return null;

    // ENGLISH & HINDI TEXT OBJECTS
    const TEXT = {
        title: isHindi ? `सहयोग करें कादरी जामे मस्जिद ट्रस्ट` : `SUPPORT ${TRUST_NAME}`,
        subtitle: isHindi
            ? "मस्जिद की देखभाल और सेवाओं के लिए आपका सहयोग ज़रूरी है।"
            : "Help us maintain and serve our community.",
        upiScanTitle: isHindi
            ? "अपने UPI ऐप से स्कैन करके भुगतान करें"
            : "Scan & Pay using your UPI App",
        scanToDonate: isHindi ? "दान करने के लिए स्कैन करें" : "SCAN TO DONATE",
        note: isHindi
            ? "नोट: भुगतान के बाद कृपया स्क्रीनशॉट भेजें ताकि भुगतान की पुष्टि हो सके।"
            : "Note: Please send screenshot after payment to confirm transaction.",
        orDonate: isHindi
            ? "या बैंक विवरण द्वारा दान करें"
            : "OR Donate via Account Details",
        accHolder: isHindi ? "खाता धारक" : "Account Holder",
        beneficiary: isHindi ? "लाभार्थी (उपाध्यक्ष)" : "Beneficiary (Vice President)",
        accNumber: isHindi ? "खाता संख्या" : "Account Number",
        ifsc: isHindi ? "IFSC कोड" : "IFSC Code",
        upi: isHindi ? "UPI ID" : "UPI ID",
        fastNote: isHindi
            ? "* UPI QR दान करने का सबसे तेज़ तरीका है।"
            : "* UPI QR is the fastest method for donating.",
        footer: isHindi
            ? `© ${new Date().getFullYear()} ${TRUST_NAME}. सर्वाधिकार सुरक्षित।`
            : `© ${new Date().getFullYear()} ${TRUST_NAME}. All Rights Reserved.`,
        langBtn: isHindi ? "English" : "हिंदी में देखें"
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content modal-wide">

                {/* CLOSE BUTTON */}
                <button className="modal-close-btn cursor-pointer" onClick={onClose}>X</button>

                {/* LANGUAGE BUTTON */}
                <div className="w-full flex justify-end mb-3 relative z-10">
                    <button
                        onClick={() => setIsHindi(!isHindi)}
                        className="px-4 py-2 bg-black !bg-blue-600 text-white text-sm rounded-lg shadow-md"
                    >
                        {TEXT.langBtn}
                    </button>
                </div>


                <div className="bg-gray-50 flex flex-col items-center p-4 sm:p-8 font-['Inter']">

                    <header className="w-full text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                            {TEXT.title}
                        </h1>
                        <p className="text-lg text-gray-600 mt-2">{TEXT.subtitle}</p>
                    </header>

                    <main className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6 bg-white rounded-xl">

                        {/* LEFT SIDE */}
                        <div className="flex flex-col items-center text-center">

                            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6 border-b-2 border-yellow-500 pb-1">
                                {TEXT.upiScanTitle}
                            </h2>

                            <div className="bg-yellow-50 shadow-inner p-3 sm:p-4 rounded-xl border-4 border-yellow-500 w-full max-w-[260px] sm:max-w-[320px] mx-auto">
                                <img
                                    src={QR_CODE_URL}
                                    alt="UPI QR Code"
                                    className="w-full h-auto rounded-lg object-contain"
                                />
                            </div>

                            <p className="mt-4 text-xl font-bold text-gray-800">{TEXT.scanToDonate}</p>

                            <p className="text-sm sm:text-md text-gray-600 mt-1">
                                <span className="font-mono bg-gray-100 p-1 rounded">
                                    {TEXT.upi}: {UPI_ID}
                                </span>
                            </p>

                            <div className="mt-6 sm:mt-8 p-3 bg-red-100 border border-red-400 text-red-800 rounded-lg w-full max-w-sm">
                                <p className="text-xs sm:text-sm font-medium">
                                    {TEXT.note}
                                </p>
                            </div>

                        </div>

                        {/* RIGHT SIDE */}
                        <div className="flex flex-col mt-4 sm:mt-5">

                            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6 border-b-2 border-yellow-500 pb-1">
                                {TEXT.orDonate}
                            </h2>

                            <div className="space-y-3 sm:space-y-4 text-gray-700">
                                <AccountDetail label={TEXT.accHolder} value="QADRI JAME MASJID TRUST" />
                                <AccountDetail label={TEXT.beneficiary} value="Raju Ali" />
                                <AccountDetail label={TEXT.accNumber} value="XXXXXXXXXXXX" />
                                <AccountDetail label={TEXT.ifsc} value="XXXXX00000" />
                                <AccountDetail label={TEXT.upi} value={UPI_ID} />
                            </div>

                            <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 italic p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                                {TEXT.fastNote}
                            </p>
                        </div>
                    </main>

                    <footer className="text-sm text-gray-400 mt-4">
                        {TEXT.footer}
                    </footer>
                </div>
            </div>
        </div>
    );
};

// ACCOUNT DETAIL COMPONENT
const AccountDetail = ({ label, value }) => (
    <div className="flex justify-between border-b pb-2">
        <span className="font-medium text-gray-600">{label}:</span>
        <span className="font-mono font-semibold text-gray-800">{value}</span>
    </div>
);

export default DonationModal;
