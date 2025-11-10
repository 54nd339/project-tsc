'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

export function SiteLinks() {
  const scrollToSection = (page: string, section: string) => {
    window.location.hash = page
    setTimeout(() => {
      const element = document.getElementById(section)
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 50,
          behavior: 'smooth',
        })
      }
    }, 100)
  }

  return (
    <div
      className="container-fluid text-light"
      id="sitemap"
      style={{ backgroundColor: '#232F3E', width: '100%', overflow: 'hidden' }}
    >
      <div className="row mx-3 my-1 mx-md-5 my-md-1">
        <div className="col-md-4 p-md-3">
          <div className="row p-md-2">
            <div className="row justify-content-center">
              <Link href="/" className="navbar-brand">
                <Image
                  src="/images/logos/TSC_Wide_Banner.png"
                  alt="Talent Sprint Classes"
                  width={300}
                  height={80}
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="row mx-auto mt-2 d-flex justify-content-center">
              <ul style={{ listStyleType: 'none', paddingLeft: '10px' }}>
                <li style={{ float: 'left' }} className="mx-5">
                  <a
                    className="social-link youtube"
                    href="https://www.youtube.com/@bidwanclassesberhampur"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faYoutube} size="xl" />
                  </a>
                </li>
                <li style={{ float: 'left' }} className="mx-5">
                  <a
                    className="social-link instagram"
                    href="https://www.instagram.com/bidwan_classes_berhampur/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faInstagram} size="xl" />
                  </a>
                </li>
                <li style={{ float: 'left' }} className="mx-5">
                  <a
                    className="social-link facebook"
                    href="https://www.facebook.com/bidwan.classes"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faFacebook} size="xl" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 p-md-2">
              <h5>About Us</h5>
              <ul style={{ listStyleType: 'none', paddingLeft: '10px' }}>
                <li>
                  <button
                    className="link btn btn-link text-start p-0"
                    onClick={() => scrollToSection('about', 'facilities')}
                  >
                    Facilities
                  </button>
                </li>
                <li>
                  <button
                    className="link btn btn-link text-start p-0"
                    onClick={() => scrollToSection('about', 'team')}
                  >
                    Our Team
                  </button>
                </li>
                <li>
                  <button
                    className="link btn btn-link text-start p-0"
                    onClick={() => scrollToSection('about', 'director')}
                  >
                    From Director's Desk
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-md-6 p-md-2">
              <h5>Gallery</h5>
              <ul style={{ listStyleType: 'none', paddingLeft: '10px' }}>
                <li>
                  <button
                    className="link btn btn-link text-start p-0"
                    onClick={() => scrollToSection('success', 'awards')}
                  >
                    Awards & Achievements
                  </button>
                </li>
                <li>
                  <button
                    className="link btn btn-link text-start p-0"
                    onClick={() => scrollToSection('success', 'awards')}
                  >
                    Cultural Activities
                  </button>
                </li>
                <li>
                  <button
                    className="link btn btn-link text-start p-0"
                    onClick={() => scrollToSection('success', 'awards')}
                  >
                    Others
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-8 p-md-5 px-md-2">
          <div className="row">
            <div className="col-md-4">
              <h5>Visiting Time</h5>
              <p>
                Monday to Saturday: <br /> 8:30 A.M. to 2:00 P.M. (Morning) <br />
                3:30 P.M. to 8:30 P.M. (Evening)
              </p>
              <p>
                Sunday: <br /> 8:30 A.M. to 2:30 P.M. (Morning)
              </p>
            </div>
            <div className="col-md-4">
              <h5>Locate Us</h5>
              <p>
                <button
                  className="link btn btn-link p-0"
                  id="map_link"
                  onClick={() => scrollToSection('contact', 'map')}
                >
                  <FontAwesomeIcon icon={faLocationDot} /> View on Map
                </button>
              </p>
              <p>
                Talent Sprint Classes, <br /> Gajapati Nagar - Main Lane, <br />
                Behind State Bank of India - ADB Branch, <br />
                Berhampur - 760010 (Odisha) India
              </p>
            </div>
            <div className="col-md-4">
              <h5>Write or Ring Us</h5>
              <p>
                bidwanclasses.brahmapur@gmail.com <br />
                tsc.bam@rediffmail.com <br />
                admin@bidwanclasses.com
              </p>
              <p>
                +91-9438339317
                <br />
                9040612211, 9439133317
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .link,
        #sitemap p {
          color: #9199a1 !important;
          text-decoration: none !important;
        }
        .link:hover,
        #map_link:hover {
          color: white !important;
          text-decoration: underline !important;
        }
        .social-link {
          color: white !important;
          text-decoration: none !important;
        }
        .social-link.youtube:hover {
          color: red !important;
        }
        .social-link.instagram:hover {
          color: #e1306c !important;
        }
        .social-link.facebook:hover {
          color: #3b5998 !important;
        }
      `}</style>
    </div>
  )
}

