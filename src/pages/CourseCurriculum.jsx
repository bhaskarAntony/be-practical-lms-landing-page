import { Code, FileText, Rocket, Cloud } from 'lucide-react';

function CourseCurriculum() {
  const modules = [
    {
      title: 'MERN Full Stack Development',
      icon: Code,
      duration: '8 weeks',
      topics: ['MongoDB CRUD Operations', 'Express.js REST APIs', 'React Components & Hooks', 'Node.js Server Setup'],
    },
    {
      title: 'MEAN Stack Development',
      icon: Code,
      duration: '8 weeks',
      topics: ['Angular Components & Routing', 'Express.js Middleware', 'MongoDB Schema Design', 'Node.js Event Loop'],
    },
    {
      title: 'Python Full Stack',
      icon: Code,
      duration: '7 weeks',
      topics: ['Django Framework & ORM', 'Flask REST APIs', 'HTML/CSS/JavaScript', 'PostgreSQL Integration'],
    },
    {
      title: 'Java Full Stack',
      icon: Code,
      duration: '8 weeks',
      topics: ['Spring Boot Microservices', 'Hibernate ORM', 'React Front-End Integration', 'MySQL Database'],
    },
    {
      title: 'Digital Marketing',
      icon: FileText,
      duration: '6 weeks',
      topics: ['SEO Optimization Strategies', 'SEM Campaign Management', 'Social Media Advertising', 'Google Analytics & Reporting'],
    },
    {
      title: 'CloudOps & DevOps',
      icon: Rocket,
      duration: '7 weeks',
      topics: ['CI/CD Pipelines with Jenkins', 'Kubernetes Orchestration', 'Ansible Configuration', 'Docker Containerization'],
    },
    {
      title: 'Cloud Computing',
      icon: Cloud,
      duration: '7 weeks',
      topics: ['AWS EC2 & S3', 'Azure Functions', 'Google Cloud Storage', 'Serverless Architecture'],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Course Curriculum</h2>
        <p className="text-base mb-12 text-center text-gray-600">
          Our comprehensive curriculum covers all essential concepts and tools, designed to make you job-ready across Full Stack, Digital Marketing, and Cloud technologies.
        </p>
        {/* Mobile Layout: Stacked Cards */}
        <div className="md:hidden space-y-6">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-2 rounded-full mr-3">
                  <module.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{module.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">Duration: {module.duration}</p>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {module.topics.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Desktop Layout: Timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 h-full"></div>
          {modules.map((module, index) => (
            <div
              key={index}
              className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className="w-1/2 px-4">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-200">
                  <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Duration: {module.duration}</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {module.topics.map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-1/2 flex justify-center">
                <div className="bg-blue-500 p-3 rounded-full">
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

export default CourseCurriculum;