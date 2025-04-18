import { Briefcase, Award, Building, Users, TrendingUp, ShieldCheck } from 'lucide-react';

export default function AlumniSuccess() {
  const stats = [
    {
      label: 'Placement Success Rate',
      value: '95%+',
      icon: Briefcase,
      description: 'Our graduates consistently land roles at top tech firms across India.',
    },
    {
      label: 'Average Starting Salary',
      value: '₹8 LPA',
      icon: Award,
      description: 'Many students report significant hikes and high starting CTCs.',
    },
    {
      label: 'Hiring Partners',
      value: '50+',
      icon: Building,
      description: 'Top companies like TCS, Wipro, Infosys, AI Fermion, and more.',
    },
    {
      label: 'Internships Secured',
      value: '2,500+',
      icon: Users,
      description: 'Internships across domains like MERN, AI/ML, DevOps, and marketing.',
    },
    {
      label: 'Career Growth Rate',
      value: '3x Faster',
      icon: TrendingUp,
      description: 'Our alumni get promoted faster than peers, thanks to real-world training.',
    },
    {
      label: 'Student Trust',
      value: '4.9/5 Rating',
      icon: ShieldCheck,
      description: 'Thousands of student reviews across platforms trust Be Practical.',
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Alumni Success Stories</h2>
        <p className="text-lg text-center text-gray-600 mb-14 max-w-2xl mx-auto">
          Be Practical’s placement programs drive powerful career transformations. Here’s a glimpse of the impact we make.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-gray-500 mb-2">{stat.label}</p>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
