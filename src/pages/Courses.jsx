import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Search,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  Briefcase,
  Clock,
  Code,
  Cloud,
  HelpCircle,
  User,
  FileText,
  Rocket,
  Database, // Added Database icon
  LinkIcon, // Replaced LinkIcon with Link
  BookOpen,
} from 'lucide-react';
import CourseCurriculum from './CourseCurriculum';
import StudentSuccessStories from './StudentSuccessStories';
import CommunitySection from './CommunitySection';
import AlumniSuccess from './AlumniSuccess';
import CareerServices from './CareerServices';
import FAQSection from './FAQSection';
import CurriculumOverview from './CurriculumOverview';
import InstructorsSection from './InstructorsSection';

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
        <div className="text-center py-16 text-white bg-gray-900">
          <h2 className="text-2xl font-bold mb-4">Something went wrong.</h2>
          <p className="text-base">Please try refreshing the page or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseIndex, setCourseIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [faqOpen, setFaqOpen] = useState(null);
  const [toolIndex, setToolIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [certIndex, setCertIndex] = useState(0);
  const coursesPerPage = 12;

  // Carousel refs
  const toolRef = useRef(null);
  const featuredRef = useRef(null);
  const reviewRef = useRef(null);
   const courseRef = useRef(null);
  const certRef = useRef(null);
  const autoScrollInterval = 5000;

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'fullstack', name: 'Full Stack Development' },
    { id: 'digital', name: 'Digital Marketing' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'devops', name: 'DevOps' },
  ];
  const coursesdata = [
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

  const featuredCourses = [
    {
      name: 'MERN Full Stack',
      description: 'Build dynamic web apps with MongoDB, Express.js, React, and Node.js.',
      image: 'https://via.placeholder.com/300x200?text=MERN',
      link: '/course/mern',
    },
    {
      name: 'MEAN Stack',
      description: 'Master Angular, Express.js, MongoDB, and Node.js for scalable apps.',
      image: 'https://via.placeholder.com/300x200?text=MEAN',
      link: '/course/mean',
    },
    {
      name: 'Python Full Stack',
      description: 'Develop web apps with Python, Django, Flask, and front-end tools.',
      image: 'https://via.placeholder.com/300x200?text=Python',
      link: '/course/python',
    },
    {
      name: 'Java Full Stack',
      description: 'Create robust apps with Java, Spring Boot, and modern front-end.',
      image: 'https://via.placeholder.com/300x200?text=Java',
      link: '/course/java',
    },
    {
      name: 'Digital Marketing',
      description: 'Learn SEO, SEM, social media, and analytics for digital success.',
      image: 'https://via.placeholder.com/300x200?text=Digital',
      link: '/course/digital',
    },
    {
      name: 'CloudOps',
      description: 'Master cloud operations with AWS, Azure, and DevOps practices.',
      image: 'https://via.placeholder.com/300x200?text=CloudOps',
      link: '/course/cloudops',
    },
    {
      name: 'Cloud Computing',
      description: 'Build and deploy apps on AWS, Azure, and Google Cloud platforms.',
      image: 'https://via.placeholder.com/300x200?text=Cloud',
      link: '/course/cloud',
    },
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
      review: 'The MERN course was a game-changer! I built a full app and landed a job.',
      rating: 5,
      image: 'https://via.placeholder.com/64?text=Anjali',
    },
    {
      name: 'Vikram Singh',
      course: 'Digital Marketing',
      review: 'Practical and insightful. The SEO and analytics modules were top-notch!',
      rating: 4.8,
      image: 'https://via.placeholder.com/64?text=Vikram',
    },
    {
      name: 'Priya Desai',
      course: 'Cloud Computing',
      review: 'Transitioned to a high-paying cloud role thanks to this course.',
      rating: 4.9,
      image: 'https://via.placeholder.com/64?text=Priya',
    },
    {
      name: 'Rahul Sharma',
      course: 'Java Full Stack',
      review: 'Hands-on projects and job support made all the difference.',
      rating: 4.7,
      image: 'https://via.placeholder.com/64?text=Rahul',
    },
    {
      name: 'Sneha Patel',
      course: 'MEAN Stack',
      review: 'Angular and Node.js were taught so well. Highly recommend!',
      rating: 4.8,
      image: 'https://via.placeholder.com/64?text=Sneha',
    },
    {
      name: 'Arjun Menon',
      course: 'CloudOps',
      review: 'Learned AWS and DevOps practices that got me hired quickly.',
      rating: 4.9,
      image: 'https://via.placeholder.com/64?text=Arjun',
    },
  ];

  const faqs = [
    {
      question: 'What is the duration of these courses?',
      answer: 'Each course spans 6-8 months, with live classes, projects, and flexible self-paced options.',
    },
    {
      question: 'Who is eligible for these training programs?',
      answer: 'Ideal for freshers, developers, IT professionals, and anyone interested in tech careers. Basic coding or marketing knowledge is beneficial.',
    },
    {
      question: 'What certifications will I receive?',
      answer: 'You’ll earn industry-recognized certifications for each course, validating your skills in Full Stack, Digital Marketing, or Cloud.',
    },
    {
      question: 'Do you offer job assistance?',
      answer: 'Yes, we provide 100% job assistance, including resume building, mock interviews, and placement with top companies.',
    },
    {
      question: 'Are there any prerequisites for these courses?',
      answer: 'Basic knowledge of programming (for tech courses) or marketing (for Digital Marketing) is recommended but not mandatory.',
    },
    {
      question: 'Can I switch between live and self-paced learning?',
      answer: 'Yes, our flexible learning model allows you to combine live classes with self-paced videos for convenience.',
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
      name: 'DevOps Certificate',
      image: 'https://via.placeholder.com/200?text=DevOps+Cert',
      description: 'Certified DevOps Engineer',
    },
  ];
  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const localResponse = await axios.get('https://school-backend-lms-2.onrender.com/api/courses');
        const localCourses = Array.isArray(localResponse.data) ? localResponse.data : [];

        const codedamnResponse = await axios.post('https://backend.codedamn.com/api/public/get-all-courses', {
          data: [{ data: { fermionSchoolId: '676a898cdfa6e90ee258d96d' } }],
        });

        const codedamnCourses = codedamnResponse.data?.[0]?.output?.data?.courses || [];

        const localCourseIds = localCourses.map((course) => course.fermionCourseId);
        const filteredCourses = codedamnCourses
          .filter((course) => localCourseIds.includes(course.fermionCourseId))
          .map((course) => ({
            ...course,
            localData: localCourses.find((lc) => lc.fermionCourseId === course.fermionCourseId) || {},
          }));

        setCourses(filteredCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Auto-scrolling for carousels
  useEffect(() => {
    const scrollTools = () => {
      setToolIndex((prev) => (prev + 1) % Math.ceil(tools.length / 4));
    };
    const scrollFeatured = () => {
      setFeaturedIndex((prev) => (prev + 1) % Math.ceil(featuredCourses.length / 3));
    };
    const scrollReviews = () => {
      setReviewIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
    };
    const scrollCerts = () => {
      setCertIndex((prev) => (prev + 1) % Math.ceil(certifications.length / 3));
    };

    const intervals = [
      setInterval(scrollTools, autoScrollInterval),
      setInterval(scrollFeatured, autoScrollInterval),
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

  const pauseCarousel = (ref) => {
    ref.current.classList.add('pause-animation');
  };

  const resumeCarousel = (ref) => {
    ref.current.classList.remove('pause-animation');
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.localData?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };
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
  
   

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900">
        {/* Hero Section */}
        <section className="bg-blue-950 py-10 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="">
              <div>
                <h1 className="text-5xl font-bold mb-6">
                  Master In-Demand Tech Courses
                </h1>
                <p className="text-lg mb-8">
                  Learn MERN, MEAN, Python, Java Full Stack, Digital Marketing, CloudOps, Cloud Computing, and DevOps with hands-on projects, expert-led training, and 100% job assistance.
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-lg font-semibold">4.9</span>
                    <span className="text-sm text-gray-200 ml-1">(5,678 reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-200 mr-1" />
                    <span className="text-sm text-gray-200">25,000+ students</span>
                  </div>
                </div>
                {/* <div className="relative max-w-md mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for courses..."
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div> */}
                <div className="flex space-x-4">
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition text-sm">
                    Enroll Now
                  </button>
                  <button className="bg-cyan-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition text-sm">
                    Download Brochure
                  </button>
                </div>
              </div>
            
            </div>
          </div>
        </section>
        <section className="bg-gray-100 text-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">Explore All Courses</h2>
            <div className="mb-6">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      selectedCategory === category.id
                        ? 'bg-blue-950 text-white'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    } transition`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 text-base">Loading courses...</p>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-base">No courses found.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedCourses.map((course) => (
                    <Link
                      to={`/course/${course.localData._id}`}
                      key={course.fermionCourseId}
                      state={course}
                      className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col relative"
                    >
                      <img
                        src={course.thumbnailUrl || 'https://via.placeholder.com/300x150'}
                        alt={course.courseName}
                        className="w-full h-48 object-cover rounded-t-xl"
                      />
                      <div className="p-5 flex-grow">
                        <h3 className="text-base font-semibold mb-2 line-clamp-2">
                          {course.courseName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {course.localData.instructorDetails?.name || 'Unknown Instructor'}
                        </p>
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-semibold mr-1">
                            {course.localData.rating || '4.0'}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.round(course.localData.rating || 4)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-1">
                            ({course.localData.courseReviews?.length || 0})
                          </span>
                        </div>
                        {/* <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>8 hours</span>
                        </div> */}
                        {/* <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{course.localData.learners || 0} students</span>
                        </div> */}
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Award className="h-4 w-4 mr-1" />
                          <span>{course.localData.level || 'Beginner'} | Adwanced</span>
                        </div>
                        <p className="text-lg font-semibold mb-4">
                          ₹{course.localData.coursePrice || 'N/A'}
                        </p>
                        <button className="w-full bg-blue-950 text-white py-2 rounded-lg hover:bg-cyan-700 transition text-sm font-medium">
                          View Course
                        </button>
                      </div>
                      {course.localData.rating >= 4.5 && (
                        <span className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded">
                          Bestseller
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 space-x-3">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          currentPage === i + 1
                            ? 'bg-cyan-600 text-white'
                            : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                        } transition`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
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
                       {coursesdata.map((course) => (
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

        {/* Course Overview */}
        <section className="bg-gray-100 text-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">Why Choose Our Courses?</h2>
            <p className="text-base mb-8 text-center">
              Our industry-aligned programs in MERN, MEAN, Python, Java Full Stack, Digital Marketing, CloudOps, Cloud Computing, and DevOps empower you to build production-grade applications, master in-demand skills, and secure top tech roles. Perfect for freshers, developers, and professionals seeking career growth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
                <div className="space-y-4">
                  {[
                    { text: '60+ hours of live instructor-led training', icon: Users },
                    { text: 'Self-paced videos for flexible learning', icon: Clock },
                    { text: '24/7 support for doubt resolution', icon: HelpCircle },
                    { text: 'Hands-on projects with real-world scenarios', icon: Code },
                    { text: '100% job assistance with top firms', icon: Briefcase },
                    { text: 'Industry-recognized certifications', icon: Award },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-white p-4 rounded-xl shadow-md transform hover:scale-105 transition-all"
                    >
                      <feature.icon className="h-6 w-6 text-blue-600 mr-3" />
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Skills You’ll Master</h3>
                <div className="space-y-4">
                  {[
                    { text: 'Full Stack Development (MERN, MEAN, Python, Java)', icon: Code },
                    { text: 'Digital Marketing (SEO, SEM, Analytics)', icon: FileText },
                    { text: 'Cloud Computing (AWS, Azure, Google Cloud)', icon: Cloud },
                    { text: 'DevOps & CloudOps (CI/CD, Kubernetes)', icon: Rocket },
                    { text: 'Database Management (MongoDB, SQL)', icon: Database },
                    { text: 'Front-End & Back-End Integration', icon: LinkIcon },
                  ].map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-white p-4 rounded-xl shadow-md transform hover:scale-105 transition-all"
                    >
                      <skill.icon className="h-6 w-6 text-blue-600 mr-3" />
                      <span className="text-sm">{skill.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {[
                { label: 'Students Enrolled', value: '25,000+', icon: Users },
                { label: 'Average Rating', value: '4.9/5', icon: Star },
                { label: 'Job Placements', value: '90%+', icon: Briefcase },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-900 to-gray-900  p-6 rounded-xl text-white"
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Covered Carousel */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">Tools Covered</h2>
            <div className="relative">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => handleCarouselPrev(setToolIndex, Math.ceil(tools.length / 4), toolRef)}
                  className="p-2 rounded-full bg-white mr-2"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-300" />
                </button>
                <button
                  onClick={() => handleCarouselNext(setToolIndex, Math.ceil(tools.length / 4), toolRef)}
                  className="p-2 rounded-full bg-blue-600 hover:bg-gray-600"
                >
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </button>
              </div>
              <div
                ref={toolRef}
                className="relative overflow-hidden"
                onMouseEnter={() => pauseCarousel(toolRef)}
                onMouseLeave={() => resumeCarousel(toolRef)}
              >
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${toolIndex * 100}%)` }}
                >
                  {tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="w-1/2 sm:w-1/3 lg:w-1/4 flex-shrink-0 px-2"
                    >
                      <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
                        <img
                          src={tool.image}
                          alt={tool.name}
                          className="w-16 h-16 object-contain mb-2"
                        />
                        <span className="text-sm font-semibold">{tool.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Curriculum (Timeline) */}
        {/* <section className="bg-gray-100 text-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">Course Curriculum</h2>
            <p className="text-base mb-12 text-center">
              Our comprehensive curriculum covers all essential concepts and tools, designed to make you job-ready across Full Stack, Digital Marketing, and Cloud technologies.
            </p>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-600 to-cyan-600 h-full"></div>
              {[
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
              ].map((module, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="w-1/2 px-4">
                    <div className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-all">
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
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-full">
                      <module.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        {/* <CourseCurriculum/> */}
        <CurriculumOverview/>

        {/* Instructors */}
        {/* <section className="bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">Meet Our Expert Instructors</h2>
            <p className="text-base text-gray-300 mb-12 text-center">
              Learn from industry leaders with years of experience in Full Stack, Cloud, and Digital Marketing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'John Doe',
                  expertise: 'AWS Certified Cloud Architect',
                  image: 'https://via.placeholder.com/150?text=John',
                },
                {
                  name: 'Jane Smith',
                  expertise: 'MERN Full Stack Developer',
                  image: 'https://via.placeholder.com/150?text=Jane',
                },
                {
                  name: 'Mike Johnson',
                  expertise: 'Digital Marketing Strategist',
                  image: 'https://via.placeholder.com/150?text=Mike',
                },
                {
                  name: 'Sarah Lee',
                  expertise: 'DevOps Engineer',
                  image: 'https://via.placeholder.com/150?text=Sarah',
                },
              ].map((instructor, index) => (
                <div
                  key={index}
                  className="bg-gray-900 backdrop-blur-sm border border-gray-700 p-6 rounded-xl shadow-md text-center"
                >
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold">{instructor.name}</h3>
                  <p className="text-sm text-gray-300">{instructor.expertise}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Projects Showcase */}
        {/* <section className="bg-gray-100 text-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">Real-World Projects</h2>
            <p className="text-base mb-12 text-center">
              Build production-grade applications to showcase your skills to employers.
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
                  title: 'Social Media App',
                  course: 'MEAN Stack',
                  description: 'A real-time app with posts, likes, and messaging features.',
                  image: 'https://via.placeholder.com/300x200?text=Social+App',
                },
                {
                  title: 'Stock Price Predictor',
                  course: 'Python Full Stack',
                  description: 'A machine learning app for stock market predictions.',
                  image: 'https://via.placeholder.com/300x200?text=Stock+App',
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md transform hover:scale-105 transition-all"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Course: {project.course}</p>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Student Reviews Carousel */}
        {/* <section className="bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">What Our Students Say</h2>
            <div className="relative">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => handleCarouselPrev(setReviewIndex, Math.ceil(reviews.length / 3), reviewRef)}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 mr-2"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-300" />
                </button>
                <button
                  onClick={() => handleCarouselNext(setReviewIndex, Math.ceil(reviews.length / 3), reviewRef)}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                >
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </button>
              </div>
              <div
                ref={reviewRef}
                className="relative overflow-hidden"
                onMouseEnter={() => pauseCarousel(reviewRef)}
                onMouseLeave={() => resumeCarousel(reviewRef)}
              >
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
                >
                  {reviews.map((review) => (
                    <div
                      key={review.name}
                      className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                    >
                      <div className="bg-gray-900 backdrop-blur-sm border border-gray-700 p-6 rounded-xl shadow-md">
                        <div className="flex items-center mb-3">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-12 h-12 rounded-full mr-3"
                          />
                          <div>
                            <p className="text-sm font-semibold">{review.name}</p>
                            <p className="text-xs text-gray-300">{review.course}</p>
                          </div>
                        </div>
                        <div className="flex mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.round(review.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-300">{review.review}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section> */}
      

        {/* Certifications Carousel */}
        <section className="bg-gray-100 text-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">Earn Industry-Recognized Certifications</h2>
            <p className="text-base mb-12 text-center">
              Boost your resume with certifications that validate your skills to top employers.
            </p>
            <div className="relative">
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => handleCarouselPrev(setCertIndex, Math.ceil(certifications.length / 3), certRef)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mr-2"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => handleCarouselNext(setCertIndex, Math.ceil(certifications.length / 3), certRef)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <div
                ref={certRef}
                className="relative overflow-hidden"
                onMouseEnter={() => pauseCarousel(certRef)}
                onMouseLeave={() => resumeCarousel(certRef)}
              >
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${certIndex * 100}%)` }}
                >
                  {certifications.map((cert) => (
                    <div
                      key={cert.name}
                      className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                    >
                      <div className="bg-white p-6 rounded-xl shadow-md text-center">
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

        {/* Learning Path */}
        {/* <section className="bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">Your Learning Journey</h2>
            <p className="text-base text-gray-300 mb-12 text-center">
              Follow our structured path to master skills and land your dream tech job.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: 'Learn',
                  description: 'Attend live classes and access self-paced videos.',
                  icon: BookOpen,
                },
                {
                  step: 'Build',
                  description: 'Create real-world projects to showcase your skills.',
                  icon: Code,
                },
                {
                  step: 'Certify',
                  description: 'Earn industry-recognized certifications.',
                  icon: Award,
                },
                {
                  step: 'Get Hired',
                  description: 'Leverage our job assistance to secure top roles.',
                  icon: Briefcase,
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-gray-900 backdrop-blur-sm border border-gray-700 p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-all"
                >
                  <step.icon className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{step.step}</h3>
                  <p className="text-sm text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <CommunitySection/>
        <AlumniSuccess/>
        <CareerServices/>
        <InstructorsSection/>
        <FAQSection/>

        <StudentSuccessStories/>

        {/* Career Support */}
        {/* <section className="bg-gray-100 text-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">Career Support</h2>
            <p className="text-base mb-12 text-center">
              Our 100% job assistance program helps you secure a rewarding career in tech.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Resume Building',
                  description: 'Craft a professional resume tailored to tech roles.',
                  icon: FileText,
                },
                {
                  title: 'Mock Interviews',
                  description: 'Practice with industry experts to ace interviews.',
                  icon: Users,
                },
                {
                  title: 'Job Placement',
                  description: 'Connect with top companies for job opportunities.',
                  icon: Briefcase,
                },
              ].map((support, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center transform hover:scale-105 transition-all"
                >
                  <support.icon className="h-8 w-8 text-cyan-600 mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{support.title}</h3>
                  <p className="text-sm text-gray-600">{support.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* FAQs */}
        {/* <section className="bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-900 backdrop-blur-sm border border-gray-700 rounded-xl shadow-md transform hover:shadow-lg transition-all"
                >
                  <button
                    className="w-full flex items-center justify-between p-5 text-left bg-gradient-to-r from-blue-600 to-cyan-600 rounded-t-xl"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center">
                      <HelpCircle className="h-5 w-5 text-white mr-2" />
                      <span className="text-base font-semibold text-white">{faq.question}</span>
                    </div>
                    {faqOpen === index ? (
                      <ChevronUp className="h-5 w-5 text-white" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white" />
                    )}
                  </button>
                  {faqOpen === index && (
                    <div className="p-5 text-sm text-gray-300">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* All Courses */}
      

        {/* CTA Banner */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Launch Your Tech Career?</h2>
            <p className="text-lg text-gray-900 mb-6">
              Enroll now and master in-demand skills with our expert-led courses.
            </p>
            <button className="bg-blue-950 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition text-base">
              Enroll Now
            </button>
          </div>
        </section>

        {/* CSS for Animations */}
        <style>
          {`
            .pause-animation {
              animation-play-state: paused;
            }
            .timeline-connector {
              background: linear-gradient(to bottom, #1e40af, #06b6d4);
            }
          `}
        </style>
      </div>
    </ErrorBoundary>
  );
}

export default Courses;