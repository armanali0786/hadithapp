import HadithDetailsCard from "../components/HadithDetailsCard";

export default function HadithDetails() {
  return (
    <div className="bg-isl-cream min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Main Content */}
          <div className="flex-1 space-y-8">

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-isl-green font-body sm:text-3xl">
                Ultimate Collection of Hadith
              </h3>
              <p className="text-gray-600 font-body text-sm leading-relaxed">
                Best Ramadan Planner 2024 [Free PDF]: Make Your Ramadan Fruitful
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-isl-green font-body sm:text-2xl">
                Why Do You Need Ramadan Plans?
              </h3>
              <p className="text-gray-600 font-body text-sm leading-relaxed">
                The blessed month of Ramadan is at our doorsteps. Surely you don't want to miss out on its rewards,
                for there is one night in this month which is better than a thousand months. A Ramadan planner can
                help you a lot to get ready for the Ramadan.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-isl-green font-body sm:text-2xl">
                Ramadan Day Planner for Who?
              </h3>
              <div className="bg-gray-100 rounded-xl px-4 py-3 text-gray-700 font-body text-sm">
                Anyone can benefit from this 30-day Ramadan schedule and make his/her Ramadan fruitful.
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-isl-green font-body sm:text-2xl">
                Ramadan Planner Ideas to Maximise Your Ramadan
              </h3>
              <ul className="space-y-2">
                {[
                  "Salah Checklist: Keep track of 5 daily prayers, Tarawih, Duha and more.",
                  "Dhikr Checklist: Track your Istigfar, Send prayers to Prophet ﷺ, Morning and Evening Adhkars and more.",
                  "Quran Tracker: Keep track of how many verses and pages you have recited from the holy Quran. It'll help you see your progress.",
                  "Other Ibadah Tracker: Keep track of your charity, Salah in the congregation and Tafsir reading progress.",
                  "Dua of the Day: Learn a new dua each day.",
                  "Take Notes: This section is for you. You can write down points, comments, extra ibadah etc.",
                  "Laylatul Qadr and Itikaf: Learn about Laylatul Qadr and recommended deeds and duas.",
                  "Eid-ul-Fitr: Learn how to prepare for Eid and the Sunnah on that joyous day.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-body">
                    <span className="mt-1 w-2 h-2 rounded-full bg-isl-gold flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar Card */}
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <HadithDetailsCard />
          </div>

        </div>
      </div>
    </div>
  );
}
