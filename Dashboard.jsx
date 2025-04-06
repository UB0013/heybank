import ExpenditurePieChart from './ExpenditurePieChart';
import ExpenditureTrendChart from './ExpenditureTrendChart';
import SpendingLimits from './SpendingLimits';
import RecentTransactions from './RecentTransactions';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const data = JSON.parse(localStorage.getItem("user"));
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-[#0F172A] bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')] relative">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-800/90 to-gray-900/90 pointer-events-none" />
      
      {/* Content Container */}
      <div className="relative z-10 p-7 pt-20">
        {/* 👋 Welcome Message */}
        {data?.name && (
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 blur-3xl" />
            <h1 className="relative text-5xl font-bold text-green-400 text-center">
              Welcome, {data.name}
            </h1>
          </div>
        )}

        {/* Section Heading with Dropdown */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <div className="dropdown-container relative inline-block">
            <h2 
              className="text-2xl font-bold text-gray-200 cursor-pointer hover:text-green-400 transition-all duration-300 
                       flex items-center gap-3 whitespace-nowrap bg-gray-800/60 px-8 py-4 rounded-2xl border border-gray-700/50 shadow-lg
                       hover:scale-105 backdrop-blur-md group"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="group-hover:scale-110 transition-transform duration-300">
                {activeSection === "overview"
                  ? "📊"
                  : activeSection === "expenditure"
                  ? "💰"
                  : "🎯"
                }
              </span>
              <span>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''} text-green-400`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </h2>

            {showDropdown && (
              <div className="absolute left-0 right-0 mt-2 py-2 bg-gray-800/90 rounded-xl shadow-2xl z-20 border border-gray-700/50 backdrop-blur-xl
                           transform transition-all duration-300 origin-top">
                <button
                  onClick={() => {
                    setActiveSection("overview")
                    setShowDropdown(false)
                  }}
                  className="block w-full px-8 py-3 text-base text-gray-300 hover:bg-gray-700/70 hover:text-green-400 
                           transition-all duration-300 text-left whitespace-nowrap hover:pl-10"
                >
                  📊 Overview
                </button>
                <button
                  onClick={() => {
                    setActiveSection("expenditure")
                    setShowDropdown(false)
                  }}
                  className="block w-full px-8 py-3 text-base text-gray-300 hover:bg-gray-700/70 hover:text-green-400 
                           transition-all duration-300 text-left whitespace-nowrap hover:pl-10"
                >
                  💰 Expenditure
                </button>
                <button
                  onClick={() => {
                    setActiveSection("limits")
                    setShowDropdown(false)
                  }}
                  className="block w-full px-8 py-3 text-base text-gray-300 hover:bg-gray-700/70 hover:text-green-400 
                           transition-all duration-300 text-left whitespace-nowrap hover:pl-10"
                >
                  🎯 Spending Limits
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats Section - Always visible */}
        <div className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[
            { title: 'Total Balance', value: '$12,345', change: '+15%', icon: '💰', color: 'green' },
            { title: 'Monthly Spending', value: '$2,890', change: '-8%', icon: '💳', color: 'red' },
            { title: 'Savings Goal', value: '$20,000', change: '45%', icon: '🎯', color: 'blue' },
            { title: 'Active Loans', value: '$5,400', change: '-$350', icon: '📝', color: 'purple' }
          ].map((stat, index) => (
            <div key={index} 
                 className="transform transition-all duration-300 hover:scale-[1.02] group">
              <div className="bg-gray-800/40 backdrop-blur-md rounded-xl shadow-lg border border-gray-700/50 p-4 
                           relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r opacity-10
                              ${stat.color === 'green' ? 'from-green-500/10 via-green-600/10 to-green-500/10' :
                                stat.color === 'red' ? 'from-red-500/10 via-red-600/10 to-red-500/10' :
                                stat.color === 'blue' ? 'from-blue-500/10 via-blue-600/10 to-blue-500/10' :
                                'from-purple-500/10 via-purple-600/10 to-purple-500/10'}`} />
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full 
                                ${stat.change.startsWith('+') ? 'text-green-400 bg-green-500/10' :
                                  stat.change.startsWith('-') ? 'text-red-400 bg-red-500/10' :
                                  'text-blue-400 bg-blue-500/10'}`}>
                    {stat.change}
                  </span>
                </div>
                
                <h3 className="text-gray-400 text-xs mb-0.5">{stat.title}</h3>
                <p className={`text-xl font-bold
                            ${stat.color === 'green' ? 'text-green-400' :
                              stat.color === 'red' ? 'text-red-400' :
                              stat.color === 'blue' ? 'text-blue-400' :
                              'text-purple-400'}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Content */}
        <div className="max-w-6xl mx-auto">
          {activeSection === "overview" && (
            <div className="space-y-6">
              <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-600/5 to-blue-500/5" />
                <ExpenditureTrendChart />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-green-500/5" />
                  <RecentTransactions />
                </div>
                
                <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-600/5 to-purple-500/5" />
                  <SpendingLimits />
                </div>
              </div>
            </div>
          )}

          {activeSection === "expenditure" && (
            <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-green-500/5" />
              <ExpenditurePieChart />
            </div>
          )}

          {activeSection === "limits" && (
            <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-600/5 to-purple-500/5" />
              <SpendingLimits />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 