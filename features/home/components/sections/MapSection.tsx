'use client'

export function MapSection() {
  return (
    <div className="col-lg-4 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">Find Us</h5>
          <div style={{ height: '250px', backgroundColor: '#e0e0e0' }}>
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
          <p className="mt-3 small">
            <strong>Address:</strong>
            <br />
            Gajapati Nagar - Main Lane
            <br />
            Behind SBI - ADB Branch
            <br />
            Berhampur - 760010, Odisha
          </p>
        </div>
      </div>
    </div>
  )
}

