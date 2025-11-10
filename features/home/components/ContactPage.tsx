'use client'

export function ContactPage() {
  return (
    <div className="container">
      <h2 className="text-center mb-5">Contact Us</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Visiting Time</h5>
              <div className="mt-3">
                <p>
                  <strong>Monday to Saturday:</strong>
                  <br />
                  8:30 A.M. to 2:00 P.M. (Morning)
                  <br />
                  3:30 P.M. to 8:30 P.M. (Evening)
                </p>
                <p>
                  <strong>Sunday:</strong>
                  <br />
                  8:30 A.M. to 2:30 P.M. (Morning)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Contact Information</h5>
              <div className="mt-3">
                <h6>Email:</h6>
                <p>
                  bidwanclasses.brahmapur@gmail.com
                  <br />
                  tsc.bam@rediffmail.com
                  <br />
                  admin@bidwanclasses.com
                </p>
                <h6>Phone:</h6>
                <p>
                  +91-9438339317
                  <br />
                  9040612211, 9439133317
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Our Location</h5>
              <p className="mt-3">
                Talent Sprint Classes
                <br />
                Gajapati Nagar - Main Lane
                <br />
                Behind State Bank of India - ADB Branch
                <br />
                Berhampur - 760010 (Odisha) India
              </p>
              <div id="map" className="mt-3" style={{ height: '400px', backgroundColor: '#e0e0e0' }}>
                {/* Map will be integrated here */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d84.793!3d19.311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE4JzQwLjAiTiA4NMKwNDcnMzQuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

