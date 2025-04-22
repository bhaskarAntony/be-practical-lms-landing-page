import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  Briefcase,
  Clock,
  Code,
  Cloud,
  HelpCircle,
  FileText,
  Rocket,
  Database,
  LinkIcon,
  BookOpen,
  User,
  Zap,
  Target,
  Network,
  BarChart,
  Shield,
  Building,
  Monitor,
  CheckCircle,
  Users as UsersIcon,
  Leaf,
  MessageSquare,
  Terminal,
  Video,
} from 'lucide-react';
import WhyChooseBePractical from './WhyChooseBePractical';
import ProgressSection from './ProgressSection';
import CommunitySection from './CommunitySection';
import InstructorsSection from './InstructorsSection';
import StudentSuccessStories from './StudentSuccessStories';
import PoweredLearningSection from './PoweredLearningSection';
import CareerServices from './CareerServices';
import CurriculumOverview from './CurriculumOverview';
import AlumniSuccess from './AlumniSuccess';
import LearningJourney from './LearningJourney';
import FAQSection from './FAQSection';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-16 text-white bg-blue-950">
          <h2 className="text-2xl font-bold mb-4">Something went wrong.</h2>
          <p className="text-base">Please try refreshing the page or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [toolIndex, setToolIndex] = useState(0);
  const [courseIndex, setCourseIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [certIndex, setCertIndex] = useState(0);
  const [faqOpen, setFaqOpen] = useState(null);

  // Carousel refs
  const toolRef = useRef(null);
  const courseRef = useRef(null);
  const reviewRef = useRef(null);
  const certRef = useRef(null);
  const autoScrollInterval = 5000;
  const companies = [
    { name: "Wipro", image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg", focus: "IT Services" },
    { name: "TCS", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTPAWYqoR1E-YMPwd869I0X2WuToOjTrPXgQ&s", focus: "Consulting & IT" },
    { name: "Infosys", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png", focus: "Software Solutions" },
    { name: "Mphasis", image: "https://www.mphasis.com/content/dam/mphasis-com/global/logo/mphasis-logo.png.thumb.468.468.png", focus: "Digital Transformation" },
    { name: "HCL", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM-qdGVHLR1SywCBY93xbZ18R9AM7mCt2gkA&s", focus: "Tech Innovation" },
    { name: "LG Soft", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTYPS7GrAuGf5AMvumCUvoXmL7D45V2XpSeQ&s", focus: "Software Development" },
    { name: "Polaris", image: "https://1000logos.net/wp-content/uploads/2021/05/Polaris-logo.png", focus: "Tech Solutions" },
    { name: "RedBus", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Redbus_logo.jpg/1200px-Redbus_logo.jpg", focus: "Travel Tech" },
    { name: "IBM", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPBss61ZSzmBM75JqdYCVqsfqJ4JijX0mt9g&s", focus: "AI & Cloud" },
  ];
  const courses = [
    {
      name: 'MERN Full Stack',
      description: 'Build scalable web apps with MongoDB, Express.js, React, and Node.js, including REST APIs and real-time features.',
      image: 'https://happenings.lpu.in/wp-content/uploads/2020/10/MERN-stack-is-the-first-.jpg',
      link: '/course/mern',
    },
    {
      name: 'MEAN Stack',
      description: 'Master Angular, Express.js, MongoDB, and Node.js for enterprise-grade applications with dynamic front-ends.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSzoOXzJUK8-Oypzj1fOt_ssHKTdCARLQMyA&s',
      link: '/course/mean',
    },
    {
      name: 'Python Full Stack',
      description: 'Develop web apps with Python, Django, Flask, and modern front-end frameworks, focusing on scalability.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF088y4834SrJoFXJdgAt9kV-P9DoUAaLJGQ&s',
      link: '/course/python',
    },
    {
      name: 'Java Full Stack',
      description: 'Create robust applications with Java, Spring Boot, Hibernate, and React for full-stack development.',
      image: 'https://techamdavad.com/web/image/product.template/42/image_1024?unique=8bd84e5',
      link: '/course/java',
    },
    {
      name: 'Digital Marketing',
      description: 'Master SEO, SEM, social media marketing, and Google Analytics to drive digital growth.',
      image: 'https://www.springboard.com/blog/wp-content/uploads/2022/06/why-is-digital-marketing-so-important-to-businesses.jpg',
      link: '/course/digital',
    },
    {
      name: 'CloudOps',
      description: 'Learn cloud operations with AWS, Azure, Docker, and Kubernetes for modern DevOps practices.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjoRb4NOu6tctXYtOPJe4XceB4KM7ZVaF2tw&s',
      link: '/course/cloudops',
    },
    {
      name: 'Cloud Computing',
      description: 'Build and deploy apps on AWS, Azure, and Google Cloud with serverless and microservices architectures.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfX2uP2oWlJn9ePl4Gyoy47pkn3Kn-3YYw4A&s',
      link: '/course/cloud',
    },
    {
      name: 'Data Science',
      description: 'Analyze data with Python, R, TensorFlow, and machine learning for predictive modeling.',
      image: 'https://ehuwt7zd2je.exactdn.com/wp-content/uploads/2023/12/data-science-course-benefits.jpg',
      link: '/course/data',
    },
    {
      name: 'DevOps',
      description: 'Master CI/CD pipelines, Ansible, and Jenkins for automated deployments and infrastructure management.',
      image: 'https://www.itrainu.in/wp-content/uploads/2021/03/DEVOPS-1.jpg',
      link: '/course/devops',
    }
  ];

  const tools = [
    { name: 'HTML', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png' },
    { name: 'CSS', image: 'https://cdn.worldvectorlogo.com/logos/css-3.svg' },
    { name: 'Javascript', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDsDPlMP28XkjCqyUoeVOw0fqxkd6UR_7XZw&s' },
    { name: 'Bootstrap', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg' },
    { name: 'Github', image: 'https://cdn-icons-png.flaticon.com/512/25/25231.png' },
    { name: 'Git', image: 'https://miro.medium.com/v2/resize:fit:512/1*doAg1_fMQKWFoub-6gwUiQ.png' },
    { name: 'Postman', image: 'https://cdn.iconscout.com/icon/free/png-256/free-postman-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-vol-5-pack-logos-icons-3030217.png?f=webp&w=256' },
    { name: 'Verecl', image: 'https://www.svgrepo.com/show/327408/logo-vercel.svg' },
    { name: 'Render', image: 'https://images.seeklogo.com/logo-png/45/2/render-logo-png_seeklogo-455460.png' },
    { name: 'MongoDB', image: 'https://miro.medium.com/v2/resize:fit:512/1*doAg1_fMQKWFoub-6gwUiQ.png' },
    { name: 'ExpressJS', image: 'https://www.borntodev.com/wp-content/uploads/2024/03/expressjs_logo-1024x729.png' },
    { name: 'ReactJS', image: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png' },
    { name: 'Node.js', image: 'https://cdn.iconscout.com/icon/free/png-256/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256' },
    { name: 'Angular', image: 'https://img.icons8.com/?size=512&id=71257&format=png' },
    { name: 'Django', image: 'https://static-00.iconduck.com/assets.00/django-icon-1606x2048-lwmw1z73.png' },
    { name: 'Spring Boot', image: 'https://cdn.worldvectorlogo.com/logos/spring-3.svg' },
    { name: 'Java', image: 'https://img.icons8.com/color/512/java-coffee-cup-logo.png' },
    { name: 'Python', image: 'https://img.icons8.com/color/512/java-coffee-cup-logo.png' },
    { name: 'AWS', image: 'https://cdn.iconscout.com/icon/free/png-256/free-aws-logo-icon-download-in-svg-png-gif-file-formats--cloud-computing-network-server-database-brand-pack-logos-icons-1583149.png?f=webp&w=256' },
    { name: 'Azure', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/1200px-Microsoft_Azure.svg.png' },
    { name: 'Google Analytics', image: 'https://images.icon-icons.com/2699/PNG/512/google_analytics_logo_icon_171061.png' },
    { name: 'TensorFlow', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1200px-Tensorflow_logo.svg.png' },
    { name: 'Kubernetes', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1200px-Kubernetes_logo_without_workmark.svg.png' },
  ];

  const reviews = [
    {
      name: 'Anjali Rao',
      course: 'MERN Full Stack',
      review: 'Fermion’s 5000+ coding labs helped me build a portfolio, and LineupX matched me with Wipro!',
      rating: 5,
      image: 'https://via.placeholder.com/64?text=Anjali',
    },
    {
      name: 'Vikram Singh',
      course: 'Digital Marketing',
      review: 'LineupX’s resume tools and Fermion’s practical modules landed me a role at a top agency.',
      rating: 4.8,
      image: 'https://via.placeholder.com/64?text=Vikram',
    },
    {
      name: 'Priya Desai',
      course: 'Cloud Computing',
      review: 'Fermion’s hands-on labs and LineupX’s internships got me a cloud engineer role.',
      rating: 4.9,
      image: 'https://via.placeholder.com/64?text=Priya',
    },
    {
      name: 'Rahul Sharma',
      course: 'Data Science',
      review: 'The analytics dashboard from Fermion was a game-changer for tracking my progress.',
      rating: 4.7,
      image: 'https://via.placeholder.com/64?text=Rahul',
    },
    {
      name: 'Sneha Patel',
      course: 'DevOps',
      review: 'LineupX’s AI job matching connected me with TCS, and Fermion’s projects were key.',
      rating: 4.8,
      image: 'https://via.placeholder.com/64?text=Sneha',
    },
    {
      name: 'Arjun Menon',
      course: 'AI & Machine Learning',
      review: 'Fermion’s deep learning labs and LineupX’s networking helped me join a startup.',
      rating: 4.9,
      image: 'https://via.placeholder.com/64?text=Arjun',
    },
  ];

  const certifications = [
    {
      name: 'MERN Full Stack Certificate',
      image: 'https://via.placeholder.com/200?text=MERN+Cert',
      description: 'Certified MERN Full Stack Developer',
    },
    {
      name: 'Digital Marketing Certificate',
      image: 'https://via.placeholder.com/200?text=Digital+Cert',
      description: 'Certified Digital Marketing Professional',
    },
    {
      name: 'Cloud Computing Certificate',
      image: 'https://via.placeholder.com/200?text=Cloud+Cert',
      description: 'Certified Cloud Computing Specialist',
    },
    {
      name: 'Data Science Certificate',
      image: 'https://via.placeholder.com/200?text=Data+Cert',
      description: 'Certified Data Scientist',
    },
  ];

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

  useEffect(() => {
    const scrollTools = () => setToolIndex((prev) => (prev + 1) % Math.ceil(tools.length / 4));
    const scrollCourses = () => setCourseIndex((prev) => (prev + 1) % Math.ceil(courses.length / 3));
    const scrollReviews = () => setReviewIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
    const scrollCerts = () => setCertIndex((prev) => (prev + 1) % Math.ceil(certifications.length / 3));

    const intervals = [
      setInterval(scrollTools, autoScrollInterval),
      setInterval(scrollCourses, autoScrollInterval),
      setInterval(scrollReviews, autoScrollInterval),
      setInterval(scrollCerts, autoScrollInterval),
    ];
    return () => intervals.forEach(clearInterval);
  }, []);

  const handleCarouselNext = (setIndex, maxIndex, ref) => {
    setIndex((prev) => (prev + 1) % maxIndex);
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCarouselPrev = (setIndex, maxIndex, ref) => {
    setIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-gray-900 font-inter">
        {/* Navigation */}
        {/* <nav className="bg-blue-950 text-white fixed w-full z-10 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Be Practical Tech Solutions</h1>
            <div className="flex space-x-6">
              <a href="#home" className="hover:text-blue-300 text-sm">Home</a>
              <a href="#courses" className="hover:text-blue-300 text-sm">Courses</a>
              <a href="#careers" className="hover:text-blue-300 text-sm">Careers</a>
              <a href="#about" className="hover:text-blue-300 text-sm">About</a>
              <a href="#contact" className="hover:text-blue-300 text-sm">Contact</a>
            </div>
          </div>
        </nav> */}

        {/* Hero Section */}
        <section id="home" className="bg-blue-950 text-white py-5 lg:py-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                  Launch Your Tech Career with Be Practical
                </h1>
                <p className="text-lg mb-3 text-gray-300">
                  Master in-demand skills with Fermion’s 5000+ coding labs and secure top jobs with LineupX’s AI-driven career tools.
                </p>
                <p className='text-md mb-10 text-yellow-100'>MERN Fullstack | MEAN Fullstack | Java Fullstack | Python Fullstack | Digital Marketing | Data Science | Cloudops | Cloud Computing | DevOps</p>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-lg font-semibold">4.9</span>
                    <span className="text-sm text-gray-300 ml-1">(7,890 reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-300 mr-1" />
                    <span className="text-sm text-gray-300">30,000+ students</span>
                  </div>
                
                </div>
             
                {/* <div className="relative max-w-md mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for courses..."
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div> */}
                 <div className="flex space-x-4 mt-5">
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition text-sm">
                    Enroll Now
                  </button>
                  <button className="bg-cyan-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition text-sm">
                    Download Brochure
                  </button>
                </div>
              </div>
              <div>
                <img
                  src="https://www.softlogicsys.in/wp-content/uploads/2024/02/cta-girl-laptop.webp"
                  alt="Be Practical Courses"
                  className="w-85"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Be Practical */}
        {/* <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Be Practical?</h2>
            <p className="text-base mb-12 text-center text-gray-600">
              Combining Fermion’s advanced learning platform with LineupX’s career services, we empower you to succeed in tech.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Hands-On Learning', description: '5000+ coding labs and projects via Fermion.', icon: Code },
                { title: 'AI-Powered Careers', description: 'LineupX matches you with top employers.', icon: Target },
                { title: 'Comprehensive Support', description: 'Resume building, internships, and networking.', icon: Briefcase },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <item.icon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <WhyChooseBePractical/>
        <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <BookOpen className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6 text-white">Comprehensive Learning Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-6 rounded-xl">
              <Video className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-white">Video Courses</h3>
              <p className="text-gray-400">HD quality tutorials with detailed explanations</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <Terminal className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-white">Code Labs</h3>
              <p className="text-gray-400">Interactive coding environments</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <MessageSquare className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-white">Discussion Forums</h3>
              <p className="text-gray-400">Community support and networking</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <BookOpen className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-white">Documentation</h3>
              <p className="text-gray-400">Comprehensive guides and references</p>
            </div>
          </div>
        </div>
      </section>

        {/* Featured Courses Carousel */}
        <section id="courses" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Courses</h2>
            <div className="relative">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => handleCarouselPrev(setCourseIndex, Math.ceil(courses.length / 3), courseRef)}
                  className="p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-600 ml-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleCarouselNext(setCourseIndex, Math.ceil(courses.length / 3), courseRef)}
                  className="p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-600 ml-2"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div ref={courseRef} className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${courseIndex * 100}%)` }}
                >
                  {courses.map((course) => (
                    <div key={course.name} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition">
                        <img
                          src={course.image}
                          alt={course.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                        <Link
                          to={course.link}
                          className="text-blue-900  px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition text-sm flex space-4 items-center"
                        >
                          Explore Course  <ChevronRight className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        

        {/* Tools Covered Carousel */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Tools Covered</h2>
            <div className="relative">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => handleCarouselPrev(setToolIndex, Math.ceil(tools.length / 4), toolRef)}
                  className="p-2 rounded-full hover:bg-blue-600 text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleCarouselNext(setToolIndex, Math.ceil(tools.length / 4), toolRef)}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white ml-2"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div ref={toolRef} className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${toolIndex * 100}%)` }}
                >
                  {tools.map((tool) => (
                    <div key={tool.name} className="w-1/2 sm:w-1/3 lg:w-1/4 flex-shrink-0 px-2">
                      <div className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <img
                          src={tool.image}
                          alt={tool.name}
                          className="w-16 h-16 object-contain mb-2"
                        />
                        <span className="text-sm font-semibold text-gray-600">{tool.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum Overview */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Curriculum Overview</h2>
            <p className="text-base mb-12 text-center text-gray-600">
              Our Fermion-powered curriculum delivers hands-on learning across all tech domains.
            </p>
            <div className="md:hidden space-y-6">
              {[
                { title: 'MERN Full Stack', duration: '8 weeks', topics: ['MongoDB CRUD', 'Express.js APIs', 'React Hooks', 'Node.js Servers'] },
                { title: 'Digital Marketing', duration: '6 weeks', topics: ['SEO Strategies', 'SEM Campaigns', 'Social Media Ads', 'Analytics'] },
                { title: 'Data Science', duration: '7 weeks', topics: ['Python Data Analysis', 'Machine Learning', 'R Programming', 'TensorFlow'] },
              ].map((module, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500 p-2 rounded-full mr-3">
                      <Code className="h-5 w-5 text-white" />
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
            <div className="hidden md:block relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 h-full"></div>
              {[
                { title: 'MERN Full Stack', duration: '8 weeks', topics: ['MongoDB CRUD', 'Express.js APIs', 'React Hooks', 'Node.js Servers'], icon: Code },
                { title: 'Digital Marketing', duration: '6 weeks', topics: ['SEO Strategies', 'SEM Campaigns', 'Social Media Ads', 'Analytics'], icon: FileText },
                { title: 'Data Science', duration: '7 weeks', topics: ['Python Data Analysis', 'Machine Learning', 'R Programming', 'TensorFlow'], icon: Database },
              ].map((module, index) => (
                <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
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
        </section> */}
        <CurriculumOverview/>

        {/* Hands-On Projects */}
        {/* <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Real-World Projects</h2>
            <p className="text-base mb-12 text-center text-gray-600">
              Build portfolio-worthy projects with Fermion’s hands-on coding labs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'E-Commerce Platform',
                  course: 'MERN Full Stack',
                  description: 'A full-featured online store with cart, payments, and admin dashboard.',
                  image: 'https://via.placeholder.com/300x200?text=E-Commerce',
                },
                {
                  title: 'Stock Price Predictor',
                  course: 'Data Science',
                  description: 'A machine learning app for stock market predictions using Python.',
                  image: 'https://via.placeholder.com/300x200?text=Stock+App',
                },
                {
                  title: 'CI/CD Pipeline Setup',
                  course: 'Cloud & DevOps',
                  description: 'Automate deployments with Jenkins, Docker, and Kubernetes.',
                  image: 'https://via.placeholder.com/300x200?text=CI-CD',
                },
                {
                  title: 'Social Media Dashboard',
                  course: 'Digital Marketing',
                  description: 'A tool to manage and analyze social media campaigns.',
                  image: 'https://via.placeholder.com/300x200?text=Social+Dashboard',
                },
                {
                  title: 'AI Chatbot',
                  course: 'AI & Machine Learning',
                  description: 'Build a conversational AI model with Python and PyTorch.',
                  image: 'https://via.placeholder.com/300x200?text=AI+Chatbot',
                },
              ].map((project, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Course: {project.course}</p>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Fermion Features */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Fermion-Powered Learning</h2>
            <p className="text-base mb-12 text-center text-gray-600">
              Experience cutting-edge education with Fermion’s all-in-one platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Interactive Coding Labs', description: '5000+ hands-on labs for real-world coding practice.', icon: Code },
                { title: 'Multi-Instructor Collaboration', description: 'Learn from multiple experts for diverse insights.', icon: Users },
                { title: 'Content Security', description: 'Robust DRM protection for course content.', icon: Shield },
                { title: 'Flexible Course Formats', description: 'Choose recorded, cohort-based, or hybrid learning.', icon: BookOpen },
                { title: 'Student Analytics', description: 'Track progress with detailed performance insights.', icon: BarChart },
                { title: 'Projects & Interview Kits', description: 'Build portfolios and prep for technical interviews.', icon: Briefcase },
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start">
                  <feature.icon className="h-8 w-8 text-blue-500 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <PoweredLearningSection/>

        {/* LineupX Career Services */}
        {/* <section id="careers" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">LineupX Career Services</h2>
            <p className="text-base mb-12 text-center text-gray-600">
              Achieve your career goals with LineupX’s AI-driven tools and personalized support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'AI Job Matching', description: 'Connect with top employers like Wipro and TCS.', icon: Target },
                { title: 'Personalized Career Paths', description: 'Get skill-based recommendations for your goals.', icon: Rocket },
                { title: 'Internships & Placements', description: 'Access opportunities with verified companies.', icon: Briefcase },
                { title: 'Networking', description: 'Connect with industry pros and alumni.', icon: Network },
                { title: 'Resume Tools', description: 'Build job-winning resumes with AI insights.', icon: FileText },
                { title: 'Mock Interviews', description: 'Practice with experts to ace technical interviews.', icon: Users },
                { title: 'Job Market Insights', description: 'Stay updated with real-time industry trends.', icon: BarChart },
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start">
                  <service.icon className="h-8 w-8 text-blue-500 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <CareerServices/>

        {/* Industry Partnerships */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Industry Partners</h2>
            <p className="text-base mb-12 text-center text-gray-600">
              Be Practical connects you with leading companies for internships and job placements.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {companies.map((partner, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img
                    src={partner.image}
                    alt={partner}
                    className="h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Analytics Dashboard */}
        {/* <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-2 text-center text-white">Track Your Progress</h2>
            <p className="text-base mb-12 text-center text-gray-100">
              Fermion’s analytics dashboard provides real-time insights into your learning journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
              <div>
                <img
                  src="https://img.freepik.com/free-photo/digital-dashboard_23-2151957114.jpg?ga=GA1.1.1538238808.1729515699&semt=ais_hybrid&w=740"
                  alt="Analytics Dashboard"
                  className="w-full h-100 object-cover rounded-lg shadow-md"
                />
              </div>
              <div>
                <ul className="space-y-4">
                  {[
                    'Monitor quiz and project performance.',
                    'Track skill development over time.',
                    'Receive personalized learning recommendations.',
                    'Analyze time spent on each module.',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section> */}
        <ProgressSection/>

        {/* Community & Networking */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Join Our Community</h2>
            <p className="text-base mb-12 text-center text-gray-600">
              LineupX connects you with a vibrant network of learners, alumni, and industry professionals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Alumni Network', description: 'Connect with successful graduates for mentorship.', icon: UsersIcon },
                { title: 'Industry Events', description: 'Attend webinars and workshops with top pros.', icon: Zap },
                { title: 'Career Forums', description: 'Engage in discussions on tech trends and jobs.', icon: Network },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <item.icon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <CommunitySection/>

        {/* Instructors */}
        {/* <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Expert Instructors</h2>
            <p className="text-base text-gray-600 mb-12 text-center">
              Learn from industry leaders with Fermion’s multi-instructor collaboration.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'John Doe', expertise: 'AWS Certified Architect', image: 'https://via.placeholder.com/150?text=John' },
                { name: 'Jane Smith', expertise: 'MERN Full Stack Developer', image: 'https://via.placeholder.com/150?text=Jane' },
                { name: 'Mike Johnson', expertise: 'Digital Marketing Strategist', image: 'https://via.placeholder.com/150?text=Mike' },
                { name: 'Sarah Lee', expertise: 'Data Scientist', image: 'https://via.placeholder.com/150?text=Sarah' },
              ].map((instructor, index) => (
                <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-center">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold">{instructor.name}</h3>
                  <p className="text-sm text-gray-600">{instructor.expertise}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <InstructorsSection/>

        {/* Student Success Stories */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Student Success Stories</h2>
            <div className="relative">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => handleCarouselPrev(setReviewIndex, Math.ceil(reviews.length / 3), reviewRef)}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleCarouselNext(setReviewIndex, Math.ceil(reviews.length / 3), reviewRef)}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white ml-2"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div ref={reviewRef} className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
                >
                  {reviews.map((review) => (
                    <div key={review.name} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
                        <div className="flex items-center mb-3">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-12 h-12 rounded-full mr-3"
                          />
                          <div>
                            <p className="text-sm font-semibold">{review.name}</p>
                            <p className="text-xs text-gray-600">{review.course}</p>
                          </div>
                        </div>
                        <div className="flex mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.round(review.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{review.review}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <StudentSuccessStories/>

        {/* Certifications */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Earn Industry-Recognized Certifications</h2>
            <p className="text-base mb-12 text-center text-gray-600">
              Validate your skills with certifications backed by LineupX’s assessments.
            </p>
            <div className="relative">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => handleCarouselPrev(setCertIndex, Math.ceil(certifications.length / 3), certRef)}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleCarouselNext(setCertIndex, Math.ceil(certifications.length / 3), certRef)}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white ml-2"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div ref={certRef} className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${certIndex * 100}%)` }}
                >
                  {certifications.map((cert) => (
                    <div key={cert.name} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-center">
                        <img
                          src={cert.image}
                          alt={cert.name}
                          className="w-32 h-32 mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">{cert.name}</h3>
                        <p className="text-sm text-gray-600">{cert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-3 text-white">Try Be-Practical’s Coding Labs</h2>
            <p className="text-base mb-12 text-gray-100">
              Experience our interactive learning platform with a free demo of our coding labs.
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold  transition text-base">
              Start Free Demo
            </button>
          </div>
        </section>

        {/* Alumni Success Metrics */}
        {/* <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Alumni Success</h2>
            <p className="text-base mb-12 text-center text-gray-600">
              Our students achieve remarkable outcomes with Fermion and LineupX.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Students Placed', value: '95%+', icon: Briefcase },
                { label: 'Average Salary', value: '₹8 LPA', icon: Award },
                { label: 'Top Companies', value: '50+', icon: Building },
                { label: 'Internships Secured', value: '2,500+', icon: Users },
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <stat.icon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <AlumniSuccess/>

        {/* Learning Path */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Your Learning Journey</h2>
            <p className="text-base text-gray-600 mb-12 text-center">
              Follow our structured path to master skills and land your dream job.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: 'Learn', description: 'Master skills with Fermion’s interactive labs.', icon: BookOpen },
                { step: 'Build', description: 'Create projects to showcase your expertise.', icon: Code },
                { step: 'Certify', description: 'Earn certifications via LineupX assessments.', icon: Award },
                { step: 'Get Hired', description: 'Land jobs with LineupX’s AI matching.', icon: Briefcase },
              ].map((step, index) => (
                <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                  <step.icon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{step.step}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <LearningJourney/>

        {/* FAQs */}
        {/* <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left bg-blue-500 text-white rounded-t-lg"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2" />
                      <span className="text-base font-semibold">{faq.question}</span>
                    </div>
                    {faqOpen === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                  {faqOpen === index && (
                    <div className="p-5 text-sm text-gray-600">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <FAQSection/>

        {/* CTA Banner */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="text-lg text-gray-300 mb-6">
              Join Be Practical's leverage <b>AI Powered</b> Learning and Placement Portal career tools.
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold text-base">
              Enroll Now
            </button>
          </div>
        </section>

        {/* Footer */}
        {/* <footer className="bg-blue-950 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Be Practical Tech Solutions</h3>
                <p className="text-sm text-gray-300">
                  Empowering careers with Fermion’s learning platform and LineupX’s career services.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#home" className="text-sm text-gray-300 hover:text-blue-300">Home</a></li>
                  <li><a href="#courses" className="text-sm text-gray-300 hover:text-blue-300">Courses</a></li>
                  <li><a href="#careers" className="text-sm text-gray-300 hover:text-blue-300">Careers</a></li>
                  <li><a href="#about" className="text-sm text-gray-300 hover:text-blue-300">About</a></li>
                  <li><a href="#contact" className="text-sm text-gray-300 hover:text-blue-300">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <p className="text-sm text-gray-300">Email: support@bepractical.com</p>
                <p className="text-sm text-gray-300">Phone: +91 123-456-7890</p>
              </div>
            </div>
            <p className="text-center text-sm text-gray-300 mt-8">
              © 2025 Be Practical Tech Solutions. All rights reserved.
            </p>
          </div>
        </footer> */}

        <style>
          {`
            .pause-animation { animation-play-state: paused; }
            @font-face { font-family: 'Inter'; src: url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); }
          `}
        </style>
      </div>
    </ErrorBoundary>
  );
}

export default Home;