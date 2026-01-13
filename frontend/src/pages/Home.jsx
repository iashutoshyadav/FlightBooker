import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plane, Search, Wallet, Ticket, Shield, Clock, Award } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home = () => {
  const { token } = useSelector((state) => state.auth);

  const features = [
    {
      icon: Search,
      title: 'Easy Search',
      description: 'Find flights from 15+ Indian cities with our simple search interface',
    },
    {
      icon: Wallet,
      title: 'Wallet Payment',
      description: 'Quick and secure payments with your in-app wallet (₹50,000 initial balance)',
    },
    {
      icon: Ticket,
      title: 'Instant E-Tickets',
      description: 'Get your boarding pass instantly as a downloadable PDF',
    },
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your bookings and payments are protected with bank-level security',
    },
    {
      icon: Clock,
      title: 'Real-time Pricing',
      description: 'Dynamic pricing based on demand - book early for best rates',
    },
    {
      icon: Award,
      title: 'Best Airlines',
      description: 'Choose from Air India, IndiGo, Vistara, and SpiceJet',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-23">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full mb-6">
              <Plane className="w-5 h-5" />
              <span className="text-sm font-medium">India's Fastest Flight Booking</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Book Your Next Adventure
              <br />
              <span className="text-primary-200">Fast, Easy & Affordable</span>
            </h1>

            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Search from 15 flights across major Indian cities. Get instant confirmations and e-tickets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {token ? (
                <Link to="/search">
                  <Button size="lg" variant="secondary" className="text-primary-600">
                    <Search className="w-5 h-5" />
                    Search Flights Now
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" variant="secondary" className="text-primary-600">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div>
                <p className="text-4xl font-bold mb-1">15+</p>
                <p className="text-primary-200 text-sm">Available Flights</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-1">11</p>
                <p className="text-primary-200 text-sm">Major Cities</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-1">4</p>
                <p className="text-primary-200 text-sm">Top Airlines</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="relative">
          <svg className="w-full h-12 md:h-24" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FlightBooker?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the fastest and most reliable flight booking platform in India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} hover className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Book in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              Your journey starts here
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Search Flights',
                description: 'Enter your departure and arrival cities to find available flights',
              },
              {
                step: '02',
                title: 'Choose & Book',
                description: 'Select your preferred flight and complete passenger details',
              },
              {
                step: '03',
                title: 'Get E-Ticket',
                description: 'Receive instant confirmation and download your boarding pass',
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {item.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary-200 -z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Flight?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of travelers who trust FlightBooker for their journey
          </p>
          {token ? (
            <Link to="/search">
              <Button size="lg" variant="secondary" className="text-primary-600">
                <Search className="w-5 h-5" />
                Start Searching
              </Button>
            </Link>
          ) : (
            <Link to="/register">
              <div className="flex justify-center">
                <Button size="lg" variant="secondary" className="text-primary-600">
                  Sign Up Now – It's Free
                </Button>
              </div>

            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;