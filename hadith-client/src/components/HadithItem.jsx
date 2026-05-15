import React, { useState } from 'react';

const HadithItem = ({ hadith }) => {
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);  // To toggle details visibility

    // Directly using the imported image object as 'HadithImage'
    const imagePath = hadith.HadithImage;  // Image path
    const hadithTitle = hadith.HadithTitle;  // Title of the Hadith
    const itemDate = new Date(hadith.Date).toLocaleDateString();  // Format Date

    // Toggle the visibility of details
    const handleClick = () => {
        setShowDetails(!showDetails);
        // You can also use history.push here if you want to navigate to another page
        // history.push(`/hadith-detail/${hadith.id}`);
    };

    console.log("ImagePath", imagePath);  // Debugging the image path

    return (
        <div
            onClick={handleClick}  // Toggle or navigate on card click
            className="flex rounded-lg overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-lg"
        >
            {/* Content Section */}
            <div className="p-4 sm:p-5 w-full">
                <div className="flex flex-col sm:flex-row w-full rounded-lg overflow-hidden bg-white shadow p-3 gap-4">

                    {/* Left Side - Image (50%) */}
                    <div className="w-full sm:w-1/2 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 h-[150px] sm:h-[180px]">
                        {imagePath ? (
                            <img
                                className="w-full h-full object-cover"
                                src={imagePath}
                                alt={hadithTitle}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* Right Side - Content (50%) */}
                    <div className="w-full sm:w-1/2 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-2">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                {itemDate}
                            </span>
                        </div>

                        {/* Hadith Title */}
                        <h3 className="text-lg font-bold text-gray-900 truncate mb-1" title={hadithTitle}>
                            {hadithTitle}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-sm text-gray-600 truncate italic">
                            {hadith.HadithName}
                        </p>
                        {showDetails && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600">{hadith.HadithDescription}</p>
                            </div>
                        )}
                    </div>
                </div>


                {/* Toggleable Description Section */}

            </div>
        </div>
    );
};

export default HadithItem;
