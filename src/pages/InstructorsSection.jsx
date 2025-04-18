import { Linkedin, Mail } from 'lucide-react';

export default function InstructorsSection() {
  const instructors = [
    {
      name: 'Ganesh',
      expertise: 'Fullstack development in MERN',
      experience: '10+ Years in MERN Fullstak',
      description: 'Ganesh has led cloud infrastructure projects at top-tier firms and has mentored 2,000+ learners globally.',
      image: 'https://via.placeholder.com/300x300?text=John',
      linkedin: '#',
      email: 'mailto:ganesh@gmail.com',
    },
    {
      name: 'Atul Yadhav',
      expertise: 'Full Stack Java Developer',
      experience: '8+ Years in Web Development',
      description: 'Atul Yadhav specializes in scalable web apps and has helped build startups from scratch across fintech and edtech domains.',
      image: 'https://via.placeholder.com/300x300?text=Jane',
      linkedin: '#',
      email: 'mailto:jane@example.com',
    },
    {
      name: 'Bhaskar',
      expertise: 'MERN fullstack developer',
      experience: '4+ Years in MERN Fullstack',
      description: 'Bhaskar has specializes in scalable web apps and has helped build startups from scratch across fintech and edtech domains.',
      image: 'https://via.placeholder.com/300x300?text=Mike',
      linkedin: '#',
      email: 'mailto:bhaskar@example.com',
    },
    {
      name: 'Hemanth',
      expertise: 'Cloud Computing and networking',
      experience: '7+ Years in Machine Learning',
      description: 'Hemanth has worked on predictive modeling and AI deployment at enterprise level and guides learners with hands-on projects.',
      image: 'https://via.placeholder.com/300x300?text=Sarah',
      linkedin: '#',
      email: 'mailto:sarah@example.com',
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Instructors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn directly from industry leaders who bring real-world knowledge and hands-on experience to the classroom.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {instructors.map((inst, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center group border border-gray-200"
            >
              <img
                src='https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='
                alt={inst.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className="text-xl font-semibold text-gray-800">{inst.name}</h3>
              <p className="text-blue-600 text-sm font-medium">{inst.expertise}</p>
              <p className="text-gray-500 text-xs mb-2">{inst.experience}</p>
              <p className="text-gray-600 text-sm mb-4">{inst.description}</p>
              <div className="flex justify-center gap-4">
                <a href={inst.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={inst.email} className="text-gray-500 hover:text-blue-700">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
