
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Zap, Crown, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for personal use',
      price: 0,
      annualPrice: 0,
      icon: Users,
      color: 'from-gray-500 to-gray-600',
      features: [
        { text: '2GB file size limit', included: true },
        { text: '7 days file retention', included: true },
        { text: 'Basic file sharing', included: true },
        { text: '10 downloads per file', included: true },
        { text: 'Email support', included: true },
        { text: 'Password protection', included: false },
        { text: 'Custom expiry dates', included: false },
        { text: 'Analytics dashboard', included: false },
        { text: 'API access', included: false }
      ]
    },
    {
      name: 'Pro',
      description: 'For professionals and teams',
      price: 9.99,
      annualPrice: 99.99,
      icon: Crown,
      color: 'from-blue-500 to-purple-600',
      popular: true,
      features: [
        { text: '100GB file size limit', included: true },
        { text: '30 days file retention', included: true },
        { text: 'Advanced file sharing', included: true },
        { text: 'Unlimited downloads', included: true },
        { text: 'Priority support', included: true },
        { text: 'Password protection', included: true },
        { text: 'Custom expiry dates', included: true },
        { text: 'Analytics dashboard', included: true },
        { text: 'API access', included: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            FileShare
          </h1>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Start for free and upgrade when you need more power. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isAnnual ? plan.annualPrice : plan.price;
            const period = isAnnual ? 'year' : 'month';
            
            return (
              <Card
                key={plan.name}
                className={`relative p-8 animate-scale-in hover-scale ${
                  plan.popular ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-lg'
                } transition-all duration-300`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                    Most Popular
                  </Badge>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      ${price}
                    </span>
                    {price > 0 && (
                      <span className="text-gray-600">/{period}</span>
                    )}
                  </div>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => navigate(plan.name === 'Free' ? '/login' : '/login')}
                  >
                    {plan.name === 'Free' ? 'Get Started Free' : 'Start Pro Trial'}
                  </Button>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-500'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <div className="max-w-6xl mx-auto">
          <Card className="p-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-bold text-center mb-8">Why Choose FileShare Pro?</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Lightning Fast</h4>
                <p className="text-gray-600">
                  Upload and share files at incredible speeds with our optimized infrastructure.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Enterprise Security</h4>
                <p className="text-gray-600">
                  Bank-level encryption and security measures to keep your files safe and secure.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Team Collaboration</h4>
                <p className="text-gray-600">
                  Advanced sharing options and analytics to collaborate effectively with your team.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
          <p className="text-gray-600 mb-6">
            Have questions? We have answers. Contact our support team for more help.
          </p>
          <Button variant="outline" size="lg">
            View FAQ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
