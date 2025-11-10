'use client'

export function CoursesPage() {
  const courses = [
    {
      title: 'Class VI - X (CBSE/ICSE/State Board)',
      description: 'Comprehensive coaching for middle and high school students',
      subjects: ['Mathematics', 'Science', 'English', 'Social Studies'],
    },
    {
      title: 'Class XI - XII (Science)',
      description: 'Advanced coaching for +2 Science students',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    },
    {
      title: 'Competitive Exams',
      description: 'Preparation for various competitive examinations',
      subjects: ['JEE', 'NEET', 'NTSE', 'Olympiads'],
    },
  ]

  return (
    <div className="container">
      <h2 className="text-center mb-5">Our Courses</h2>
      <div className="row g-4">
        {courses.map((course, index) => (
          <div key={index} className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <h6 className="mt-3">Subjects:</h6>
                <ul className="list-unstyled">
                  {course.subjects.map((subject, idx) => (
                    <li key={idx}>• {subject}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

