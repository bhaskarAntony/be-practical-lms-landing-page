import { Code, FileText, Database } from 'lucide-react';

export default function CurriculumOverview() {
  const modules = [
    {
      title: 'MERN Full Stack Development',
      duration: '8 Weeks Intensive',
      icon: Code,
      description: 'Master the most in-demand stack for modern web development. Build scalable, full-stack applications with industry best practices.',
      topics: [
        'MongoDB: NoSQL & Aggregations',
        'Express.js RESTful APIs & Middleware',
        'React.js with Hooks, Context API & Routing',
        'Node.js Server & Deployment (Heroku, Vercel)',
        'Authentication with JWT & OAuth',
        'Final Project: Real-world MERN App',
      ],
    },
    {
      title: 'Digital Marketing Mastery',
      duration: '6 Weeks Fast-Track',
      icon: FileText,
      description: 'Learn to drive traffic, generate leads, and create powerful brand presence through practical marketing techniques.',
      topics: [
        'SEO: On-page, Off-page, Technical SEO',
        'Google Ads, SEM, & PPC Campaigns',
        'Social Media Marketing (Meta, LinkedIn)',
        'Email Automation & Funnel Design',
        'Analytics with Google Analytics & Tag Manager',
        'Capstone: Full Campaign Strategy',
      ],
    },
    {
      title: 'Data Science & ML with Python',
      duration: '7 Weeks Applied Track',
      icon: Database,
      description: 'Build a strong foundation in data science using Python. Learn to analyze, visualize, and model data for business insights.',
      topics: [
        'Data Analysis with Pandas & NumPy',
        'Data Visualization using Matplotlib & Seaborn',
        'Machine Learning with Scikit-learn',
        'Intro to Deep Learning with TensorFlow',
        'Statistics & Predictive Modeling',
        'Capstone: End-to-End ML Pipeline',
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-6">Curriculum Overview</h2>
        <p className="text-lg text-center text-gray-300 mb-16 max-w-3xl mx-auto">
          Be Practical’s expert-designed curriculum blends theory with deep hands-on learning. Explore full-stack development, data science, and digital marketing with real-world application.
        </p>

        {/* Mobile Version */}
        <div className="md:hidden space-y-10">
          {modules.map((module, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-2 rounded-full mr-4">
                  <module.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{module.title}</h3>
                  <p className="text-sm text-gray-400">{module.duration}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">{module.description}</p>
              <ul className="list-disc text-gray-400 text-sm pl-5 space-y-1">
                {module.topics.map((topic, j) => (
                  <li key={j}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Desktop Version */}
        <div className="hidden md:block relative mt-20">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 h-full z-0"></div>
          {modules.map((module, index) => (
            <div key={index} className={`flex items-center mb-16 relative z-10 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="w-1/2 px-6">
                <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
                  <h3 className="text-xl font-semibold mb-1">{module.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{module.duration}</p>
                  <p className="text-sm text-gray-300 mb-3">{module.description}</p>
                  <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                    {module.topics.map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-1/2 flex justify-center">
                <div className="bg-blue-600 p-4 rounded-full shadow-lg">
                  <module.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
