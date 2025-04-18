import {
    Target,
    Rocket,
    Briefcase,
    Network,
    FileText,
    Users,
    BarChart,
  } from 'lucide-react';
  
  export default function CareerServices() {
    const services = [
      {
        title: 'AI Job Matching',
        description: 'Automatically match your skills and preferences with hiring companies like Wipro, TCS, Infosys, and more using advanced AI algorithms.',
        icon: Target,
        color: 'bg-blue-600/10 text-blue-400',
      },
      {
        title: 'Personalized Career Paths',
        description: 'Based on your course performance and career goals, we recommend a tailored roadmap including skills, certifications, and roles to pursue.',
        icon: Rocket,
        color: 'bg-pink-600/10 text-pink-400',
      },
      {
        title: 'Internships & Placements',
        description: 'Get access to internships and full-time roles at verified companies with real-time placement tracking and recruiter interactions.',
        icon: Briefcase,
        color: 'bg-yellow-600/10 text-yellow-400',
      },
      {
        title: 'Networking',
        description: 'Join alumni groups, attend career webinars, and grow your connections with HRs, hiring partners, and mentors in your domain.',
        icon: Network,
        color: 'bg-indigo-600/10 text-indigo-400',
      },
      {
        title: 'Resume Tools',
        description: 'Use our resume builder with AI scoring and keyword optimization to get past ATS filters and impress recruiters.',
        icon: FileText,
        color: 'bg-teal-600/10 text-teal-400',
      },
      {
        title: 'Mock Interviews',
        description: 'Get real interview experience with personalized feedback from experts across roles like full-stack, data, cloud, and marketing.',
        icon: Users,
        color: 'bg-orange-600/10 text-orange-400',
      },
      {
        title: 'Job Market Insights',
        description: 'Access a live dashboard that shares which skills are trending, what roles are hot, and where companies are hiring the most.',
        icon: BarChart,
        color: 'bg-purple-600/10 text-purple-400',
      },
    ];
  
    return (
      <section id="careers" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6 text-center">Be Practical Career Services</h2>
          <p className="text-lg text-gray-300 mb-14 text-center max-w-3xl mx-auto">
            Unlock career growth with LineupX’s AI-powered career assistance, personalized support, and real opportunities from hiring partners.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300 p-6 rounded-2xl shadow-md border border-gray-700"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  