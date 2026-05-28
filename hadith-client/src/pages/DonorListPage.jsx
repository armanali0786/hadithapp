import React from 'react';

const donorData = [
  { id: 1, name: "Aarav Sharma",    date: "Oct 26, 2023", amount: "₹500"   },
  { id: 2, name: "Olivia Chen",     date: "Nov 15, 2023", amount: "₹250"   },
  { id: 3, name: "David Smith",     date: "Jan 01, 2024", amount: "₹100"   },
  { id: 4, name: "Maria Rodriguez", date: "Jan 10, 2024", amount: "₹75"    },
  { id: 5, name: "Samantha Jones",  date: "Mar 05, 2024", amount: "₹1,000" },
  { id: 6, name: "Kenji Tanaka",    date: "Apr 12, 2024", amount: "₹300"   },
  { id: 7, name: "Isabble Nkrumah", date: "Jun 18, 2024", amount: "₹200"   },
  { id: 8, name: "Liam Gallagher",  date: "Jul 01, 2024", amount: "₹120"   },
  { id: 9, name: "Sofia Rossi",     date: "Sep 09, 2024", amount: "₹4400"  },
];

const lastUpdatedDate = "October 26, 2024";
const organizationName = "Qadri Jame Masjid";

const DonorListPage = () => {
  return (
    <div className="bg-isl-cream min-h-screen font-body">

      {/* Header Banner */}
      <div className="bg-isl-green text-center py-12 px-6">
        <div className="font-arabic text-isl-gold text-2xl mb-3">اَلأَحَادِيثُ النَّبَوِيَّة</div>
        <h1 className="text-white font-bold text-2xl md:text-3xl font-body tracking-wide">THANK YOU FOR YOUR GENEROSITY!</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-isl-green font-bold text-xl text-center mb-10 tracking-widest font-body uppercase">
          OUR VALUED DONORS
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Thank You Message */}
          <div className="lg:w-64 flex-shrink-0 text-center lg:text-left">
            <p className="font-arabic text-isl-gold text-4xl mb-3">Thank You</p>
            <p className="text-gray-600 text-sm leading-relaxed font-body">
              Every contribution makes a difference. We are profoundly grateful for your support, which enables us to continue our mission. Below is a list of individuals and organizations who have generously donated.
            </p>
          </div>

          {/* Donor Table */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-isl-green text-white">
                    <th className="px-5 py-3.5 text-left text-xs font-bold tracking-widest uppercase font-body">NAME</th>
                    <th className="px-5 py-3.5 text-left text-xs font-bold tracking-widest uppercase font-body">DONATION DATE</th>
                    <th className="px-5 py-3.5 text-right text-xs font-bold tracking-widest uppercase font-body">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {donorData.map((donor, i) => (
                    <tr
                      key={donor.id}
                      className={`border-b border-gray-50 hover:bg-isl-cream/50 transition-colors duration-150 ${
                        i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-5 py-3.5 font-medium text-gray-800 font-body">{donor.name}</td>
                      <td className="px-5 py-3.5 text-gray-500 font-body">{donor.date}</td>
                      <td className="px-5 py-3.5 text-right font-bold text-isl-green font-body">{donor.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-body">Last updated: {lastUpdatedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-isl-dark text-center py-6 px-4">
        <div className="flex justify-center gap-3 mb-3">
          {['●', '●', '●', '●'].map((dot, i) => (
            <span key={i} className="text-isl-gold/50 text-xs">{dot}</span>
          ))}
        </div>
        <p className="text-white/40 text-xs font-body">
          © 2024 {organizationName}, All Rights Reserved.
        </p>
      </div>

    </div>
  );
};

export default DonorListPage;
