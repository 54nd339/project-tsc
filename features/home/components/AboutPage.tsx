'use client'

export function AboutPage() {
  return (
    <div className="container">
      <h2 className="text-center mb-5">About Us</h2>

      <section id="facilities" className="mb-5">
        <h3>Our Facilities</h3>
        <div className="row g-4 mt-3">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Modern Classrooms</h5>
                <p className="card-text">
                  Well-equipped, air-conditioned classrooms with modern teaching aids
                  and comfortable seating arrangements.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Library</h5>
                <p className="card-text">
                  Extensive collection of reference books, study materials, and
                  digital resources for comprehensive learning.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Computer Lab</h5>
                <p className="card-text">
                  State-of-the-art computer lab with internet connectivity for
                  digital learning and research.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Online Classes</h5>
                <p className="card-text">
                  Hybrid learning model with options for both physical and online
                  classes for student convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="director" className="mb-5">
        <h3>From Director's Desk</h3>
        <div className="card mt-3">
          <div className="card-body">
            <p className="lead">
              "At Talent Sprint Classes, we believe in nurturing young minds and
              helping them achieve their full potential. Our dedicated team of
              experienced educators is committed to providing quality education
              and personalized attention to every student."
            </p>
            <p>
              With over years of excellence in education, we have helped thousands
              of students achieve their academic goals and build successful careers.
              Our proven teaching methodologies, combined with modern technology,
              ensure that our students are well-prepared for the challenges ahead.
            </p>
          </div>
        </div>
      </section>

      <section id="team" className="mb-5">
        <h3>Our Team</h3>
        <p className="mt-3">
          Our faculty comprises highly qualified and experienced teachers who are
          passionate about teaching and dedicated to student success. Each member
          of our team brings unique expertise and teaching style, creating a rich
          and diverse learning environment.
        </p>
      </section>
    </div>
  )
}

