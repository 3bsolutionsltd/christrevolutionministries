"use client";
import { useState, useEffect } from 'react';

interface GivingOption {
  title: string;
  description: string;
  icon: string;
  color: string;
  suggestedAmount: number;
  category: string;
}

interface MobileMoneyAccount {
  provider: string;
  number: string;
  name: string;
}

interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
  branch: string;
}

interface PaymentMethod {
  name: string;
  icon: string;
  description: string;
  accounts?: (MobileMoneyAccount | BankAccount)[];
  details?: string[];
}

const givingOptions: GivingOption[] = [
  {
    title: 'Love Campaign',
    description: 'Supporting Love Campaign initiatives to spread God\'s love in communities',
    icon: '❤️',
    color: 'from-red-500 to-pink-600',
    suggestedAmount: 50000,
    category: 'campaign'
  },
  {
    title: 'General Giving',
    description: 'Supporting the overall ministry and church operations',
    icon: '🏛️',
    color: 'from-blue-500 to-blue-700',
    suggestedAmount: 25000,
    category: 'general'
  },
  {
    title: 'Missions & Evangelism',
    description: 'Funding outreach programs and mission trips',
    icon: '🌍',
    color: 'from-green-500 to-green-700',
    suggestedAmount: 100000,
    category: 'missions'
  },
  {
    title: 'Building Fund',
    description: 'Contributing to church construction and facility improvements',
    icon: '🏗️',
    color: 'from-yellow-500 to-orange-600',
    suggestedAmount: 200000,
    category: 'building'
  },
  {
    title: 'Youth Ministry',
    description: 'Supporting youth programs, camps, and activities',
    icon: '👥',
    color: 'from-purple-500 to-purple-700',
    suggestedAmount: 75000,
    category: 'youth'
  },
  {
    title: 'Benevolence Fund',
    description: 'Helping those in need within our community',
    icon: '🤝',
    color: 'from-teal-500 to-cyan-600',
    suggestedAmount: 30000,
    category: 'benevolence'
  }
];

const paymentMethods: PaymentMethod[] = [
  {
    name: 'Mobile Money',
    icon: '📱',
    description: 'MTN Mobile Money & Airtel Money',
    accounts: [
      { provider: 'MTN Mobile Money', number: '+256-772-245292', name: 'Samuel Isiko' },
      { provider: 'Airtel Money', number: '+256-701-234567', name: 'Samuel Isiko' }
    ]
  },
  {
    name: 'Bank Transfer',
    icon: '🏦',
    description: 'Bank transfers and deposits',
    accounts: [
      { 
        bank: 'Stanbic Bank Uganda', 
        accountNumber: '9030006789123', 
        accountName: 'Christ Revolution Ministries',
        branch: 'Kampala Main Branch'
      },
      { 
        bank: 'Centenary Bank', 
        accountNumber: '3210054321098', 
        accountName: 'Christ Revolution Ministries',
        branch: 'Ntinda Branch'
      }
    ]
  },
  {
    name: 'Cash Offering',
    icon: '💰',
    description: 'During church services',
    details: [
      'Sunday Service: 9:00 AM - 12:00 PM',
      'Wednesday Service: 7:00 PM - 9:00 PM',
      'Special offerings during events'
    ]
  }
];

export default function GivePage() {
  const [selectedOption, setSelectedOption] = useState<GivingOption | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleGive = () => {
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-white/90 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <img src="/logo-100X100.png" alt="CRM Logo" className="relative w-12 h-12 rounded-full shadow-lg border-2 border-blue-200 group-hover:border-blue-300 transition-all duration-300" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-600 transition-all duration-300">
                Christ Revolution Ministries
              </h1>
              <p className="text-xs text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                Blessed to be a blessing
              </p>
            </div>
          </div>
          
          {/* Enhanced Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-2">
            <li>
              <a 
                href="/" 
                className="relative px-4 py-2 font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 group"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className="relative px-4 py-2 font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 group"
              >
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
            </li>
            <li>
              <a 
                href="/ministries" 
                className="relative px-4 py-2 font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 group"
              >
                <span className="relative z-10">Ministries</span>
                <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
            </li>
            <li>
              <a 
                href="/sermons" 
                className="relative px-4 py-2 font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 group"
              >
                <span className="relative z-10">Sermons</span>
                <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
            </li>
            <li>
              <a 
                href="/events" 
                className="relative px-4 py-2 font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 group"
              >
                <span className="relative z-10">Events</span>
                <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
            </li>
            <li>
              <a 
                href="/give" 
                className="relative px-4 py-2 font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">Give</span>
              </a>
            </li>
            <li>
              <a 
                href="/contact" 
                className="relative px-4 py-2 font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 group"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
            </li>
          </ul>

          {/* Enhanced Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative p-3 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span className={`block h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`md:hidden bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-500 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden border-t border-blue-100`}>
          <div className="px-6 py-6 space-y-3">
            <a href="/" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:translate-x-2 group">
              <span className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300">🏠</span>
              <span>Home</span>
            </a>
            <a href="/about" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:translate-x-2 group">
              <span className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300">ℹ️</span>
              <span>About</span>
            </a>
            <a href="/ministries" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:translate-x-2 group">
              <span className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300">⛪</span>
              <span>Ministries</span>
            </a>
            <a href="/sermons" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:translate-x-2 group">
              <span className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300">📖</span>
              <span>Sermons</span>
            </a>
            <a href="/events" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:translate-x-2 group">
              <span className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300">📅</span>
              <span>Events</span>
            </a>
            <a href="/give" className="flex items-center space-x-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 rounded-lg font-medium shadow-md">
              <span className="text-white">💝</span>
              <span>Give</span>
            </a>
            <a href="/contact" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:translate-x-2 group">
              <span className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300">📞</span>
              <span>Contact</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-green-900 via-green-800 to-teal-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <img 
            src="/hope-370x230.jpg" 
            alt="Give" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Give with <span className="text-yellow-400">Purpose</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-200 max-w-4xl mx-auto leading-relaxed mb-8">
            Your generous giving helps us spread God's love, support our community, and advance His kingdom through the Love Campaign and ministry programs.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <p className="text-lg text-yellow-200 italic font-medium">
              "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap." - Luke 6:38
            </p>
          </div>
        </div>
      </section>

      {/* Giving Options */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Choose Your Giving</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select from our ministry areas where your heart is led to give
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {givingOptions.map((option, index) => (
              <div 
                key={option.title}
                className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer ${
                  selectedOption?.title === option.title ? 'ring-4 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedOption(option)}
              >
                <div className={`h-32 bg-gradient-to-br ${option.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-4 right-4 text-4xl">
                    {option.icon}
                  </div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl font-bold text-white">{option.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {option.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-green-600">
                      Suggested: {formatAmount(option.suggestedAmount)}
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                      selectedOption?.title === option.title 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedOption?.title === option.title && (
                        <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Amount */}
          {selectedOption && (
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Give to: {selectedOption.title}
                </h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (UGX)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">UGX</span>
                    <input
                      type="number"
                      value={customAmount || selectedOption.suggestedAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {[25000, 50000, 100000, 200000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setCustomAmount(amount.toString())}
                      className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      {formatAmount(amount)}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedPayment(true)}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Payment Methods Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Payment Methods</h2>
                <button 
                  onClick={() => setSelectedPayment(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${selectedOption?.color || 'from-blue-500 to-blue-700'} rounded-full flex items-center justify-center text-2xl`}>
                    {selectedOption?.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedOption?.title}</h3>
                    <p className="text-lg font-bold text-green-600">
                      {formatAmount(parseInt(customAmount) || selectedOption?.suggestedAmount || 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {paymentMethods.map((method, index) => (
                  <div key={method.name} className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-3xl">{method.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{method.name}</h3>
                        <p className="text-gray-600">{method.description}</p>
                      </div>
                    </div>

                    {method.accounts && (
                      <div className="space-y-3">
                        {method.accounts.map((account, accountIndex) => (
                          <div key={accountIndex} className="bg-white p-4 rounded-lg border">
                            {'provider' in account && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <p><span className="font-medium">Provider:</span> {account.provider}</p>
                                <p><span className="font-medium">Number:</span> {account.number}</p>
                                <p><span className="font-medium">Name:</span> {account.name}</p>
                              </div>
                            )}
                            {'bank' in account && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                <p><span className="font-medium">Bank:</span> {account.bank}</p>
                                <p><span className="font-medium">Account:</span> {account.accountNumber}</p>
                                <p><span className="font-medium">Name:</span> {account.accountName}</p>
                                <p><span className="font-medium">Branch:</span> {account.branch}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {method.details && (
                      <div className="space-y-2">
                        {method.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-yellow-50 rounded-2xl">
                <h3 className="font-bold text-gray-900 mb-3">Important Notes:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Please include your name and "CRM Giving" in the payment reference</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>For tax receipts, contact our finance team with payment confirmation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>All gifts are used according to your designation and our ministry guidelines</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-4">
                <button
                  onClick={handleGive}
                  className="flex-1 px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  I Have Made My Gift
                </button>
                <a
                  href="/contact"
                  className="flex-1 px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center"
                >
                  Need Help?
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Message */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Your generous gift helps us continue spreading God's love and advancing His kingdom. May God bless you abundantly!
            </p>
            <p className="text-sm text-gray-500">
              You will receive a confirmation message shortly.
            </p>
          </div>
        </div>
      )}

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Your Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how your generous giving is transforming lives and communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-2xl">
              <div className="text-4xl font-black text-blue-600 mb-2">500+</div>
              <div className="text-lg font-bold text-gray-900 mb-2">Lives Transformed</div>
              <div className="text-sm text-gray-600">Through our ministry programs</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-2xl">
              <div className="text-4xl font-black text-green-600 mb-2">50+</div>
              <div className="text-lg font-bold text-gray-900 mb-2">Families Helped</div>
              <div className="text-sm text-gray-600">Through Love Campaign initiatives</div>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-2xl">
              <div className="text-4xl font-black text-yellow-600 mb-2">10</div>
              <div className="text-lg font-bold text-gray-900 mb-2">Communities Reached</div>
              <div className="text-sm text-gray-600">Through evangelism programs</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-2xl">
              <div className="text-4xl font-black text-purple-600 mb-2">100+</div>
              <div className="text-lg font-bold text-gray-900 mb-2">Youth Mentored</div>
              <div className="text-sm text-gray-600">Through youth ministry programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo & About */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img src="/logo-100X100.png" alt="CRM Logo" className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold">Christ Revolution Ministries</h3>
                  <p className="text-blue-300 text-sm">Blessed to be a blessing</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                A dynamic, life-transforming ministry taking this generation back to God and making His voice heard in the nations.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Ministries', href: '/ministries' },
                  { name: 'Events', href: '/events' },
                  { name: 'Sermons', href: '/sermons' },
                  { name: 'Contact', href: '/contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact</h4>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-start space-x-2">
                  <svg className="w-5 h-5 mt-0.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Bulaga, Nakabugo Zion Estate, Doctor's Drive, Kampala, Uganda</span>
                </p>
                <p className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-sm">+256-772-245292</span>
                </p>
                <p className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm">info@christrevolutionministries.org</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Christ Revolution Ministries. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
