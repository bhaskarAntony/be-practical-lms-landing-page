import React from 'react';
import { Code, Target, Briefcase, Users, BarChart, Shield, CheckCircle, ArrowRight, Zap } from 'lucide-react';

function WhyChooseBePractical() {
  const features = [
    {
      title: 'Hands-On Coding Labs',
      description: 'Fermion’s 5000+ interactive coding labs immerse you in real-world scenarios, supporting JavaScript, Python, Java, and more. Accessible on mobile and desktop, these labs replicate production environments for tools like React and AWS. With instant feedback and gamified challenges, 90% of students improve coding proficiency within 4 weeks. Build portfolio-worthy projects like e-commerce platforms to stand out to employers.',
      icon: Code,
      image: 'https://img.freepik.com/free-photo/close-up-image-programer-working-his-desk-office_1098-18707.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid&w=740',
      alt: 'Coding lab interface',
    },
    {
      title: 'AI-Powered Job Matching',
      description: 'LineupX’s AI analyzes your skills to match you with top employers like Wipro and Amazon from 50,000+ job listings. With a 95% placement rate, our platform offers real-time job alerts and personalized recommendations. Over 12,000 students have secured roles, with 80% earning ₹8 LPA or higher, thanks to integration with Fermion’s portfolio-building labs.',
      icon: Target,
      image: 'https://img.freepik.com/free-photo/face-recognition-personal-identification-collage_23-2150165591.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid&w=740',
      alt: 'Job matching dashboard',
    },
    {
      title: 'Comprehensive Career Support',
      description: 'LineupX provides AI-driven resume tools, 2,500+ internships, and mock interviews with experts from TCS and others. With 50,000+ resumes created and a 90% interview callback rate, our support includes networking with 20,000+ professionals. Paired with Fermion’s projects, 70% of internships convert to full-time roles, ensuring career success.',
      icon: Briefcase,
      image: 'https://img.freepik.com/free-photo/portrait-young-woman-smiling_23-2148461554.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid&w=740',
      alt: 'Career support tools',
    },
    {
      title: 'Expert-Led Instruction',
      description: 'Learn from industry leaders like AWS-certified architects and MERN developers through Fermion’s multi-instructor platform. With 85% of students reporting deeper understanding, our 4.9/5 rated courses stay current via real-time updates. Over 15,000 learners benefit from diverse perspectives, ensuring industry-relevant education across full-stack, AI, and more.',
      icon: Users,
      image: 'https://img.freepik.com/free-photo/portrait-teacher-work-educational-system_23-2151737330.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid&w=740',
      alt: 'Instructor collaboration',
    },
    {
      title: 'Real-Time Analytics',
      description: 'Fermion’s analytics dashboard tracks quiz scores, project progress, and skills in real-time. Personalized recommendations boost performance for 85% of users, accelerating skill acquisition by 30%. Compare results with peers and align learning with LineupX’s career paths. Trusted by 18,000+ students, our insights drive measurable growth.',
      icon: BarChart,
      image: 'https://img.freepik.com/free-photo/modern-workspace-with-computer_23-2151966696.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid&w=740',
      alt: 'Analytics dashboard',
    },
    {
      title: 'Secure Learning Environment',
      description: 'Fermion’s advanced DRM protects course content with encryption, ensuring zero unauthorized access. With 99.9% uptime and no reported breaches, our platform secures 10,000+ courses. Students access premium materials seamlessly, earning a 98% trust rating. Instructors focus on teaching, supported by a trusted environment for 25,000+ users.',
      icon: Shield,
      image: 'https://img.freepik.com/free-photo/3d-rendering-retro-computer_23-2151004370.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid&w=740',
      alt: 'Secure platform interface',
    },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-10">
        <h2 className="text-2xl font-bold mb-3 text-center flex items-center justify-center">
          <Zap className="h-6 w-6 mr-2 text-blue-500" />Why Choose Be Practical?
        </h2>
        <p className="text-sm mb-3 text-center text-gray-600">
          Fermion’s cutting-edge platform and LineupX’s AI-driven career services empower 30,000+ students to <br /> excel in tech with hands-on learning and top-tier job opportunities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <div className="flex items-center mb-2">
                <item.icon className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-base font-semibold">{item.title}</h3>
              </div>
              <p className="text-xs text-gray-600 mb-2">{item.description}</p>
              <ul className="space-y-1">
                {['Real-world skills', 'Industry-aligned', 'Proven results'].map((point, i) => (
                  <li key={i} className="flex items-center text-xs text-gray-600">
                    <CheckCircle className="h-3 w-3 text-blue-500 mr-1" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="flex items-center mx-auto bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition text-sm">
            <ArrowRight className="h-4 w-4 mr-1" />Discover More
          </button>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseBePractical;