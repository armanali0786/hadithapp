import React from 'react';

/**
 * Reusable component for a single Hadith Card.
 * @param {object} props
 * @param {string} props.title - The title of the Hadith (e.g., "Actions are Judged by Intentions").
 * @param {string} props.narrator - The name of the narrator (e.g., "'Umar ibn al-Khattab (R.A)").
 * @param {string} props.grade - The grade of the Hadith (e.g., "Sahih", "Hasan").
 * @param {string} [props.imageSrc] - Optional source for the image/graphic.
 * @param {string} [props.imageAlt] - Optional alt text for the image.
 */
import BestDua from '../assets/img/Best-Dua-for-ramadan.avif'
import Charity from '../assets/img/Charity-in-Ramadan.avif'
import FinishQuran from '../assets/img/How-to-finish-Quran-in-Ramadan.avif'

const HadithCard = ({ title, narrator, grade, imageSrc, imageAlt }) => {
    // Function to determine the Tailwind classes based on the Hadith grade
    const getGradeClasses = (grade) => {
        switch (grade.toLowerCase()) {
            case 'sahih':
                return 'bg-green-600'; // Darker green for Sahih
            case 'hasan':
                return 'bg-blue-600'; // Blue for Hasan
            // Add more cases if needed, e.g., 'Da'if'
            default:
                return 'bg-gray-500'; // Default gray
        }
    };

    const gradeClasses = getGradeClasses(grade);

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden mb-4">
            <div className="flex items-center p-4 sm:p-6">

                {/* Image / Graphic Section (Left Side) */}
                <div className="flex-shrink-0 w-24 sm:w-28 rounded-lg overflow-hidden bg-gray-200 h-[120px]">
                    {imageSrc ? (
                        <img
                            className="w-full h-full object-cover"
                            src={imageSrc}
                            alt={imageAlt || title}
                            style={{height:"120px"}}
                        />
                    ) : (
                        // Placeholder for cards without an image
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            No Image
                        </div>
                    )}
                </div>

                {/* Text Content Section (Right Side) */}
                <div className="flex-grow ml-4 relative ml-5">
                    <span
                        className={`absolute top-0 right-0 px-3 py-1 text-xs font-semibold text-white rounded-full ${gradeClasses}`}
                        style={{ transform: 'translateY(-50%)' }} // Lift the badge slightly above the card edge if needed, or just position top-0 right-0
                    >
                        {grade}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 pr-12">
                        {title}
                    </h3>

                    {/* Narrator */}
                    <p className="mt-1 text-base text-gray-600">
                        Narrated by **{narrator}**
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- Example Usage Component ---
const HadithTest = () => {
    // You would use actual image URLs here instead of placeholders
    const hadithData = [
        {
            title: "Actions are Judged by Intentions",
            narrator: "'Umar ibn al-Khattab (R.A)",
            grade: "Sahih",
            imageSrc: FinishQuran, // Replace with your actual image path
        },
        {
            title: "The Best Among You",
            narrator: "'Abdoulah ibn 'Amr (R.A)",
            grade: "Hasan",
            imageSrc: Charity, // Replace with your actual image path
        },
        {
            title: "Modesty is part of Faith",
            narrator: "'Abu Hurayrah (R.A)",
            grade: "Sahih",
            // No imageSrc provided, simulating the third card's look
            imageSrc: BestDua,
        },
    ];

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-gray-900">
                Hadith Collection
            </h1>
            <div className="space-y-6">
                {hadithData.map((hadith, index) => (
                    <HadithCard
                        key={index}
                        title={hadith.title}
                        narrator={hadith.narrator}
                        grade={hadith.grade}
                        imageSrc={hadith.imageSrc}
                        // Note: For a real app, you should handle alt text properly
                        imageAlt={`Image for ${hadith.title}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HadithTest;