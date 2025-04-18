import { HelpCircle, ChevronUp, ChevronDown } from 'lucide-react';
import React from 'react';

export default function FAQSection() {
  const [faqOpen, setFaqOpen] = React.useState(null);

  const faqs = [
    {
      question: 'What makes Be Practical’s courses unique?',
      answer: 'Powered by Fermion, we offer 5000+ interactive coding labs, hands-on projects, and multi-instructor collaboration. LineupX provides AI-driven job matching and personalized career paths.',
    },
    {
      question: 'How does LineupX help with placements?',
      answer: 'LineupX uses AI to match you with top employers like Wipro, TCS, and Infosys, offering internships, resume tools, and networking opportunities.',
    },
    {
      question: 'What types of courses are available?',
      answer: 'We offer recorded, cohort-based, and hybrid courses in MERN, MEAN, Java, Python, Cloud, DevOps, Data Science, AI, and Digital Marketing.',
    },
    {
      question: 'Is my course content secure?',
      answer: 'Fermion’s robust DRM protection ensures your course content is safeguarded against unauthorized access.',
    },
    {
      question: 'Can I collaborate with other instructors?',
      answer: 'Fermion’s platform supports multi-instructor collaboration, enabling richer, expert-led course content.',
    },
    {
      question: 'How do I track my learning progress?',
      answer: 'Fermion’s analytics dashboard provides detailed insights into your quiz scores, project progress, and skill development.',
    },
    {
      question: 'What kind of projects will I build?',
      answer: 'You’ll build real-world projects like e-commerce platforms, AI models, and CI/CD pipelines, guided by Fermion’s hands-on labs.',
    },
    {
      question: 'How does LineupX’s networking work?',
      answer: 'LineupX connects you with industry professionals, alumni, and mentors for career guidance and opportunities.',
    },
  ];

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-4 ">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl  border border-gray-200 "
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left border border-gray-900 text-gray-900"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  <span className="text-base font-semibold">{faq.question}</span>
                </div>
                {faqOpen === index ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {faqOpen === index && (
                <div className="p-5 text-sm text-gray-700  border border-gray-200">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
