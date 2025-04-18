import { CheckCircle } from 'lucide-react';

export default function ProgressSection() {
  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://img.freepik.com/free-photo/digital-dashboard_23-2151957114.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid&w=740"
          alt="Analytics Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">Track Your Progress Like Never Before</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stay in control of your learning journey with real-time analytics, personalized insights, and clear feedback at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Feature List */}
          <div className="space-y-6">
            {[
              {
                title: 'Monitor Quiz and Project Performance',
                desc: 'Track scores, identify weak areas, and view detailed breakdowns of quiz attempts and project evaluations.'
              },
              {
                title: 'Visualize Skill Growth Over Time',
                desc: 'Understand how your technical and soft skills evolve with timeline-based graphs and progress indicators.'
              },
              {
                title: 'Personalized Learning Recommendations',
                desc: 'Get tailored content suggestions, revision modules, and extra practice based on your activity and results.'
              },
              {
                title: 'Time Spent per Module',
                desc: 'Analyze how much time you’re investing in each topic to optimize your study habits and productivity.'
              },
              {
                title: 'Module Completion Insights',
                desc: 'Check module-wise completion status, pending topics, and unlock levels to keep yourself on track.'
              },
              {
                title: 'Performance Comparison with Batchmates',
                desc: 'See where you stand among peers and get inspired to improve with healthy competition metrics.'
              },
              {
                title: 'Progress-Based Certification Readiness',
                desc: 'Know when you’re ready for certification exams based on smart analysis of your scores and progress.'
              },
              {
                title: 'Detailed Feedback from Instructors',
                desc: 'Get written and visual feedback on projects and quizzes to know exactly how to improve.'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-blue-500 mt-1 mr-4" />
                <div>
                  <h4 className="text-white font-semibold text-md mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Image Card */}
          <div className="rounded-xl shadow-xl overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/3d-graph-interface-background_23-2150323514.jpg?t=st=1713432532~exp=1713436132~hmac=84aa517be5b3a8931907ea464bf36f5941672e83d56d5874dfd2629b8c006e89&w=740"
              alt="Progress Analytics"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
