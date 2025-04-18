import { BookOpen, Code, Award, Briefcase } from 'lucide-react';

export default function LearningJourney() {
  const steps = [
    {
      step: 'Learn',
      description: 'Master skills through hands-on, interactive coding labs and theoretical content.',
      icon: BookOpen,
      details: 'Our curated curriculum focuses on real-world applications with 24/7 lab access.',
    },
    {
      step: 'Build',
      description: 'Create comprehensive projects that can be added to your portfolio.',
      icon: Code,
      details: 'Each project is reviewed by industry experts, giving you valuable feedback and exposure.',
    },
    {
      step: 'Certify',
      description: 'Gain industry-recognized certifications through our LineupX assessments.',
      icon: Award,
      details: 'Assessments are designed to test your practical skills, ensuring you are job-ready.',
    },
    {
      step: 'Get Hired',
      description: 'Land your dream job with LineupX’s AI-powered job matching and personalized career coaching.',
      icon: Briefcase,
      details: 'We connect you with top companies, and our interview coaching prepares you for success.',
    },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl text-white font-bold mb-6 text-center">Your Learning Journey</h2>
        <p className="text-lg text-gray-400 mb-16 text-center max-w-2xl mx-auto">
          Follow our structured path to gain expert skills, create impactful projects, and land your dream job with expert guidance at every step.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-800 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <div className="flex mb-4">
                <div className="bg-blue-700 p-3 rounded-full">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.step}</h3>
              <p className="text-sm text-gray-400 mb-4">{step.description}</p>
              <p className="text-sm text-gray-300">{step.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
