
import { Link } from "react-router-dom"
import HadithDetailsCard from "../components/HadithDetailsCard"
export default function HadithDetails() {

  const sentenceStyle = {
    backgroundColor: '#B6B6B6', // Grey background color
    borderRadius: '10px', // Border radius
    padding: '10px 5px', // Padding for better appearance
    margin: '5px 0', // Margin to space out the sentences
    color: 'black',
  };

  return (
    // max-w-6xl
    <div className="row grid md:grid-cols-2 items-start  px-4 mx-auto gap-6 lg:gap-12 py-6  bg-white">
      <div className="col-7">
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-2">
            <h3 className="text-2xl font-bold sm:text-3xl">Ultimate Collection of Hadith</h3>
            <p className="">
            Best Ramadan Planner 2024 [Free PDF]: Make Your Ramadan Fruitful
            </p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-2xl font-bold sm:text-3xl">Why Do You Need Ramadan Plans?</h3>
            <p>
            The blessed month of Ramadan is at our doorsteps. Surely you don’t want to miss out on its rewards, for there is one night in this month which is better than a thousand months. A Ramadan planner can help you a lot to get ready for the Ramadan.  
            </p>
          </div>
          <div className="">
            <h3 className="text-2xl font-bold sm:text-3xl">Ramadan Day Planner for Who?</h3>
              <span style={sentenceStyle}>Anyone can benefit from this 30-day Ramadan schedule and make his/her Ramadan fruitful.</span>
          </div>
          <div className="grid gap-2">
            <h3 className="text-2xl font-bold sm:text-3xl">Ramadan Planner Ideas to Maximise Your Ramadan</h3>
            <ul className="list-disc list-inside grid gap-2 text-black" >
              <li>Salah Checklist: Keep track of 5 daily prayers, Tarawih, Duha and more.</li>
              <li>Dhikr Checklist: Track your Istigfar, Send prayers to Prophet ﷺ, Morning and Evening Adhkars and more.</li>
              <li>Quran Tracker: Keep track of how many verses and pages you have recited from the holy Quran. It’ll help you see your progress.</li>
              <li>Other Ibadah Tracker: Keep track of your charity, Salah in the congregation and Tafsir reading progress.</li>
              <li>Dua of the Day: Learn a new dua each day.</li>
              <li>Take Notes: This section is for you. You can write down points, comments, extra ibadah etc.</li>
              <li>Laylatul Qadr and Itikaf: Learn about Laylatul Qadr and recommended deeds and duas.</li>
              <li>Eid-ul-Fitr: Learn how to prepare for Eid and the Sunnah on that joyous day.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-4">
        {/* <div className="flex flex-col gap-4 items-start">
            <div className="hidden md:flex items-start">
              <img
                alt="Course Image"
                className="aspect-video object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                height={225}
                src={Nodejs}
                width={400}
              />
              <div className="grid gap-4 md:gap-10 items-start">
                <h1 className="font-bold text-3xl lg:text-4xl">Introduction to Nodejs</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <div className="grid gap-2 md:gap-4">
                  <p className="text-sm sm:text-base">
                    Created by
                    <Link className="underline" href="#">
                      Infosec
                    </Link>
                  </p>
                  <p className="text-sm sm:text-base">Intermediate • 15-20h • 10 Modules</p>
                </div>
                <div className="grid gap-2 md:gap-4">
                  <p className="text-sm sm:text-base">
                    <button size="sm" variant="outline" className="btn btn-primary">
                      Enroll for Free 
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div className="md:hidden flex flex-col gap-4 items-start">
            </div>
          </div> */}
        <HadithDetailsCard />
      </div>

    </div>
  )
}

