import { Users, Zap, Network, Briefcase, GraduationCap, MessageCircle, Star } from 'lucide-react';

export default function CommunitySection() {
  const features = [
    {
      title: 'Alumni Network',
      description: 'Connect with successful graduates working at top companies. Get inspired and mentored.',
      icon: Users,
    },
    {
      title: 'Industry Events',
      description: 'Exclusive invites to webinars, conferences, and workshops led by global tech leaders.',
      icon: Zap,
    },
    {
      title: 'Career Forums',
      description: 'Engage in expert-led discussions on tech trends, job roles, and career paths.',
      icon: Network,
    },
    {
      title: 'Job & Internship Portal',
      description: 'Access handpicked job and internship opportunities shared directly by hiring partners.',
      icon: Briefcase,
    },
    {
      title: 'Student-Led Communities',
      description: 'Join clubs, coding groups, and hackathon squads with your peers and seniors.',
      icon: GraduationCap,
    },
    {
      title: '1-on-1 Career Guidance',
      description: 'Book personal sessions with mentors to fine-tune your resume and interview skills.',
      icon: MessageCircle,
    },
    {
      title: 'Recognition & Rewards',
      description: 'Earn badges, certificates, and exclusive rewards as you contribute and grow.',
      icon: Star,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Vibrant Community</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Be Practical connects you with learners, alumni, mentors, and industry leaders across the tech world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-blue-100 text-blue-600 mx-auto">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-center text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 text-center">
          <p className="text-md text-gray-700 mb-4">Ready to grow your network and elevate your career?</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow hover:bg-blue-700 transition">
            Become a Member
          </button>
        </div> */}
      </div>
    </section>
  );
}
