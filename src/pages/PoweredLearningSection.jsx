import {
    Code,
    Users,
    Shield,
    BookOpen,
    BarChart,
    Briefcase,
  } from 'lucide-react';
  
  export default function PoweredLearningSection() {
    const features = [
      {
        title: 'Interactive Coding Labs',
        description: '5000+ hands-on labs designed for practical, real-world coding scenarios.',
        icon: Code,
        color: 'bg-blue-100 text-blue-600',
      },
      {
        title: 'Multi-Instructor Collaboration',
        description: 'Gain insights from multiple industry experts across each course.',
        icon: Users,
        color: 'bg-green-100 text-green-600',
      },
      {
        title: 'Content Security',
        description: 'Your learning material is protected with enterprise-grade DRM.',
        icon: Shield,
        color: 'bg-red-100 text-red-600',
      },
      {
        title: 'Flexible Course Formats',
        description: 'Choose from recorded, live cohort, or hybrid classes that suit your style.',
        icon: BookOpen,
        color: 'bg-purple-100 text-purple-600',
      },
      {
        title: 'Student Analytics',
        description: 'Stay on track with smart dashboards and real-time performance tracking.',
        icon: BarChart,
        color: 'bg-yellow-100 text-yellow-600',
      },
      {
        title: 'Projects & Interview Kits',
        description: 'Work on real projects and prepare with curated interview-ready content.',
        icon: Briefcase,
        color: 'bg-indigo-100 text-indigo-600',
      },
    ];
  
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Be Practical-Powered Learning</h2>
          <p className="text-lg text-gray-600 mb-14 text-center max-w-3xl mx-auto">
            Experience cutting-edge education with Be Practical’s all-in-one learning ecosystem designed to make you job-ready.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  