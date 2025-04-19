import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  Video,
  FileText,
  HelpCircle,
  PlayCircle,
  Award,
  User,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react';
import FAQSection from './FAQSection';

function CourseDetails() {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [activeSidebarTab, setActiveSidebarTab] = useState('preview'); // State for sidebar tabs
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // State for description toggle

  // Refs for scrolling to sections
  const overviewRef = useRef(null);
  const curriculumRef = useRef(null);
  const instructorRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);

  const sections = [
    { id: 'overview', name: 'Overview', ref: overviewRef },
    { id: 'curriculum', name: 'Curriculum', ref: curriculumRef },
    { id: 'instructor', name: 'Instructor', ref: instructorRef },
    { id: 'reviews', name: 'Reviews', ref: reviewsRef },
    { id: 'faq', name: 'FAQ', ref: faqRef },
  ];

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch course details
        const courseResponse = await axios.get(`https://school-backend-lms-2.onrender.com/api/courses/${id}`);
        const courseData = courseResponse.data;
        setCourseDetails(courseData);

        // Fetch syllabus
        const syllabusResponse = await axios.post(
          'https://backend.codedamn.com/api/public/get-published-course-information',
          {
            data: [
              {
                data: {
                  fermionCourseId: courseData.fermionCourseId,
                  fermionSchoolId: courseData.fermionSchoolId,
                },
              },
            ],
          }
        );

        if (
          syllabusResponse.data &&
          Array.isArray(syllabusResponse.data) &&
          syllabusResponse.data[0]?.output?.data?.response?.courseItems
        ) {
          setSyllabus(syllabusResponse.data[0].output.data.response.courseItems);
        } else {
          console.error('Invalid syllabus API response structure:', syllabusResponse.data);
          setSyllabus([]);
        }
      } catch (error) {
        console.error('Error fetching course details or syllabus:', error);
        setCourseDetails(null);
        setSyllabus([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 text-base">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!courseDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-base">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="">
      {/* Hero Section */}
      <section className="bg-blue-950 text-white pt-8 pb-12 py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <h1 style={{textTransform:'uppercase'}} className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {courseDetails.courseName}
              </h1>
              <p
                className="text-base text-gray-300 mb-4 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: courseDetails.courseDescription.split('</p>')[0].replace('<p>', '') }}
              />
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 font-semibold text-base mr-1">{courseDetails.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.round(courseDetails.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <a
                    href="#reviews"
                    onClick={() => scrollToSection(reviewsRef)}
                    className="text-blue-400 text-sm ml-2 hover:underline"
                  >
                    ({courseDetails.courseReviews?.length || 0} ratings)
                  </a>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-300 mr-1" />
                  <span className="text-sm text-gray-300">{courseDetails.learners} students</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Created by{' '}
                <a
                  href="#instructor"
                  onClick={() => scrollToSection(instructorRef)}
                  className="text-blue-400 hover:underline"
                >
                  {courseDetails.instructorDetails.name}
                </a>
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Last updated {new Date(courseDetails.lastUpdated).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <PlayCircle className="h-4 w-4 mr-1" />
                  <span>{courseDetails.availableTeachLanguages[0]}</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                {/* Sidebar Tabs */}
                <div className="flex border-b border-gray-200 mb-4">
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      activeSidebarTab === 'preview'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    onClick={() => setActiveSidebarTab('preview')}
                  >
                    Course Preview
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      activeSidebarTab === 'includes'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                    onClick={() => setActiveSidebarTab('includes')}
                  >
                    Course Includes
                  </button>
                </div>
                {/* Tab Content */}
                {activeSidebarTab === 'preview' && (
                  // <div>
                  //   <img
                  //     src={courseDetails.thumbnailUrl || 'https://via.placeholder.com/400x200'}
                  //     alt="Course Preview"
                  //     className="w-full h-48 object-cover rounded-md mb-4"
                  //   />
                  //   <div className="text-2xl font-bold text-gray-900 mb-2">₹{courseDetails.coursePrice}</div>
                  //   <div className="text-sm text-gray-500 line-through mb-4">₹{courseDetails.courseActualPrice}</div>
                  //   <button className="w-full bg-blue-950 text-white py-2.5 rounded-md hover:bg-blue-700 transition font-medium text-base mb-2">
                  //     Add to cart
                  //   </button>
                  //   <button className="w-full border border-gray-300 text-gray-900 py-2.5 rounded-md hover:bg-gray-100 transition font-medium text-base mb-4">
                  //     Buy now
                  //   </button>
                  //   <p className="text-xs text-gray-600 text-center">30-Day Money-Back Guarantee</p>
                  // </div>
                  <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">This course includes:</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {courseDetails.courseIncludes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Award className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                )}
                {activeSidebarTab === 'includes' && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">This course includes:</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {courseDetails.courseIncludes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Award className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 py-3">
        <div className="max-w-[100%] mx-auto px-4 sm:px-6 lg:px-8" style={{width:'100%', maxWidth:'100%', overflow:'auto'}}>
          <div className="flex">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.ref)}
                className="px-4 py-3 text-base font-medium text-gray-900 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition"
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {/* What You'll Learn */}
            <section ref={overviewRef} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                {courseDetails?.whatWillLearn?.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* <section ref={overviewRef} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                {courseDetails?.courseIncludes?.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section> */}
              <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">This course includes:</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {courseDetails.courseIncludes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Award className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

            {/* Course Content */}
            <section ref={curriculumRef} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Course content</h2>
              <p className="text-sm text-gray-600 mb-4">
                {syllabus.length} lectures • 8 weeks
              </p>
              <div className="space-y-3">
                {syllabus.length > 0 ? (
                  Object.entries(
                    syllabus.reduce((acc, item) => {
                      const section = item.overrideSectionName || 'Other';
                      if (!acc[section]) {
                        acc[section] = [];
                      }
                      acc[section].push(item);
                      return acc;
                    }, {})
                  ).map(([sectionName, section]) => (
                    <div
                      key={sectionName}
                      className="border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
                    >
                      <button
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 text-left rounded-md"
                        onClick={() => toggleSection(sectionName)}
                      >
                        <div className="flex items-center">
                          <span className="text-base font-semibold text-gray-900">{sectionName}</span>
                          <span className="ml-2 text-sm text-gray-500">{section.length} lectures</span>
                        </div>
                        {activeSection === sectionName ? (
                          <ChevronUp className="h-5 w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      {activeSection === sectionName && (
                        <div className="p-4 space-y-2">
                          {section.map((item) => (
                            <div
                              key={item.courseItemId}
                              className="flex items-center text-sm text-gray-700 hover:bg-gray-50 p-2 rounded-md transition"
                            >
                              {item.type === 'LiveEvent' && <Video className="h-4 w-4 mr-2 text-blue-600" />}
                              {item.type === 'Article' && <FileText className="h-4 w-4 mr-2 text-green-600" />}
                              {item.type === 'Quiz' && <HelpCircle className="h-4 w-4 mr-2 text-orange-600" />}
                              <span className="flex-grow">{item.liveEventTitle || item.articleTitle || item.quizTitle}</span>
                              {/* Placeholder for progress indicator */}
                              <CheckCircle className="h-4 w-4 text-green-500 opacity-0" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-600">No course content available.</div>
                )}
              </div>
            </section>

            {/* Requirements */}
            <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                {courseDetails.studentRequirements.map((req, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: req }} />
                ))}
              </ul>
            </section>

            {/* Description */}
            <section className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <div
                className={`text-sm text-gray-700 prose max-w-none ${!isDescriptionExpanded ? 'line-clamp-6' : ''}`}
                dangerouslySetInnerHTML={{ __html: courseDetails.courseDescription }}
              />
              <button
                className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? 'Show less' : 'Show more'}
              </button>
            </section>

            {/* Instructor */}
            <section ref={instructorRef} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Instructor</h2>
              <div className="flex flex-col md:flex-row items-start bg-gray-50 p-4 rounded-md">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Instructor"
                  className="h-24 w-24 rounded-full mb-4 md:mb-0 md:mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{courseDetails.instructorDetails.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{courseDetails.instructorDetails.subtitle}</p>
                  <div className="flex items-center text-sm text-gray-700 mb-2">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Over {courseDetails.learners / 1000}K students taught</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 mb-2">
                    <Star className="h-4 w-4 mr-1" />
                    <span>{courseDetails.courseReviews?.length || 0} reviews</span>
                  </div>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-700 prose max-w-none" dangerouslySetInnerHTML={{ __html: courseDetails.instructorDetails.description }} />
            </section>

            {/* Reviews */}
            <section ref={reviewsRef} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Student feedback</h2>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-gray-900 mr-3">{courseDetails.rating}</span>
                <div>
                  <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.round(courseDetails.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Course Rating</span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {courseDetails.courseReviews.map((review) => (
                  <div
                    key={review._id}
                    className="border border-gray-200 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-2">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-semibold text-gray-900">{review.name}</span>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-700 prose max-w-none" dangerouslySetInnerHTML={{ __html: review.content }} />
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section ref={faqRef} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">What are the prerequisites for this course?</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {courseDetails.studentRequirements.map((req, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: req }} />
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">What is the refund policy?</h3>
                  <p className="text-sm text-gray-700">30-Day Money-Back Guarantee if you're not satisfied with the course.</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">How long do I have access to the course?</h3>
                  <p className="text-sm text-gray-700">Lifetime access to all course materials, including updates.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-16 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-3">Course includes</h3>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                {courseDetails.courseIncludes.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-950 text-white py-2.5 rounded-md hover:bg-blue-700 transition font-medium text-base">
                Enroll now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;