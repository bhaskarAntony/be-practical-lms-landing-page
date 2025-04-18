import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useRef, useState } from 'react';
const reviews = [
    {
      name: 'Sajjad Ahmed',
      course: 'MERN Full Stack',
      review: 'I successfully completed the Python Development course at Be Practical Tech Solutions, and it was an amazing learning experience. The training was well-structured, with a strong focus on practical applications. A special thanks to Javeed Sir and Namitha Maam for their excellent guidance and support throughout the course. I highly recommend this institute to anyone looking to build a career in tech!',
      rating: 5,
      image: 'https://via.placeholder.com/64?text=Anjali',
    },
    {
      name: 'M.Yashashwini Manjunatha',
      course: 'Digital Marketing',
      review: 'I recently completed a [Java full stack course] at Be Practical Tech Solutions, and my experience was fantastic! The training was highly practical, making complex topics easy to understand, even for beginners. The instructors were knowledgeable, patient, and always ready to help.I would like to express my sincere gratitude to BE-PRACTICAL TECH SOLUTIONS for their excellent guidance. Special thanks to the trainers bheemesh sir and Bhaskar sir.they helped me in gaining technical skills on Back end and front end technologies which helped me gain valuable knowledge.Special thanks to HR Kavitha ma\'am and I truly appreciate the support. Thank you so much..',
      rating: 5,
      image: 'https://via.placeholder.com/64?text=Vikram',
    },
    {
      name: 'Suraj S',
      course: 'Cloud Computing',
      review: 'I had a great experience at BE Practical Tech Solution Institute. The instructors were highly knowledgeable and approachable, making technical concepts easy to understand. The training offered a perfect balance of theoretical knowledge and hands-on practical sessions, ensuring I gained real-world skills. \n  The faculty was always supportive and ready to assist with any doubts, which made the entire learning process smooth and enjoyable.',
      rating: 4,
      image: 'https://via.placeholder.com/64?text=Priya',
    },
    {
      name: 'Monica sd',
      course: 'Data Science',
      review: 'I recently completed the MERN Stack Development course at Be Practical Tech Solution, and it was a great experience. \n The course covered all the key topics and included projects that made learning simple and practical. The instructors were knowledgeable and supportive, always ready to clarify doubts. The HR team was also very supportive and communicated effectively throughout the course. Thank you be practical for valuable learning experience!',
      rating: 4.7,
      image: 'https://via.placeholder.com/64?text=Rahul',
    },
    {
      name: 'srinidhi ganachari',
      course: 'DevOps',
      review: 'Be Practical tech solutions provided excellent guidance and support throughout my preparation, helping me build the skills and confidence to clear my interview. Their training sessions were focused and highly effective. I highly recommend them to anyone aiming for career success!',
      rating: 5,
      image: 'https://via.placeholder.com/64?text=Sneha',
    },
    {
      name: 'Prateek Singh',
      course: 'AI & Machine Learning',
      review: 'I had a wonderful experience with Be Practical. Their team was knowledgeable, supportive, and always available to help. They made the job placement process smooth and stress-free, and I \'m thrilled to have been placed at Mphasis.',
      rating: 4.9,
      image: 'https://via.placeholder.com/64?text=Arjun',
    },
  ];
export default function StudentSuccessStories() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const reviewRef = useRef(null);

  const handleCarouselNext = () => {
    const maxIndex = Math.ceil(reviews.length / 3) - 1;
    setReviewIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handleCarouselPrev = () => {
    const maxIndex = Math.ceil(reviews.length / 3) - 1;
    setReviewIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center">Student Success Stories</h2>

        <div className="relative">
          <div className="flex justify-end mb-6">
            <button
              onClick={handleCarouselPrev}
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleCarouselNext}
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white ml-2 transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div ref={reviewRef} className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
            >
              {reviews.map((review, idx) => (
                <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-blue-600/20 transition-shadow duration-300 h-full flex flex-col justify-between">
                    <div className="flex items-center mb-4">
                      <img
                        src='https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='
                        alt={review.name}
                        className="w-12 h-12 rounded-full mr-4 border-2 border-blue-500"
                      />
                      <div>
                        <p className="text-md font-semibold text-white">{review.name}</p>
                        <p className="text-xs text-blue-400">Placed</p>
                      </div>
                    </div>

                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.round(review.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-sm text-gray-300 line-clamp-5">{review.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
