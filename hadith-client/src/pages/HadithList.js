import { Link, useNavigate } from "react-router-dom";
import { HadithDb } from "../data/HadithDb";
export default function HadithList() {
  const navigate = useNavigate();

  const getFirstNWords = (text, n) => {
    const words = text.split(" ");
    return words.slice(0, n).join(" ");
  };

  const removeHtmlTags = (html) => {
    var doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleCourseDetails = () => {
    navigate("/hadith-details");
  };

  return (
    <>
      <div className="container">
        <div className="py-10">
          <p className="py-8 text-xl font-regular md:text-3xl d-flex justify-center">
            Discover latest Hadith and articles
          </p>
          <section className="max-w-4xl mx-auto p-6 bg-background rounded-lg shadow-lg ">
            <div className="bg-card rounded-lg overflow-hidden">
              <img
                className="w-full h-64 object-cover"
                src="https://images.pexels.com/photos/28823663/pexels-photo-28823663.jpeg"
                alt="GTAF’s Amazing Experience at Muslim Tech Fest 2024"
              />
              <div className="p-4">
                <span className="text-sm text-muted-foreground">FEATURED</span>
                <h3 className="text-xl font-semibold text-primary mt-2">
                  Reciting Quran and Hadith Blogs
                </h3>
                <p className="text-muted-foreground mt-1">Updated Now</p>
              </div>
            </div>
          </section>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-5">
            {HadithDb.map((hadith, index) => {
              const numWordsToShow =
                hadith.title.split(" ").length > 5 ? 5 : 10;
              const descriptionText = removeHtmlTags(hadith.title);
              return (
                <div key={index} className="rounded overflow-hidden shadow-lg">
                  <div className="relative">
                    <a href="#">
                      <img
                        className="w-full"
                        src={hadith.img}
                        alt="Hadith Image"
                        onClick={handleCourseDetails}
                      />
                      <div className="absolute inset-0 bg-gray-900 opacity-25 hover:bg-transparent transition duration-300"></div>
                    </a>
                    <div className="absolute top-0 right-0 bg-green-600 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3  hover:text-indigo-500 transition duration-500 ease-in-out">
                      <span className="font-bold">{hadith.Date}</span>
                    </div>
                  </div>
                  <div className="px-4 py-2">
                    <a
                      href="#"
                      className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out"
                    >
                      {getFirstNWords(descriptionText, numWordsToShow)}....
                    </a>
                    <p className="text-gray-500 text-sm">
                      The collection of best pizza images in New York City
                    </p>
                  </div>
                  <div className="px-4 py-2 flex items-center">
                    <span className="py-1 text-sm text-gray-900 flex items-center">
                      <svg
                        height="13px"
                        width="13px"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="mr-1"
                      >
                        <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                      </svg>
                      6 mins ago
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
