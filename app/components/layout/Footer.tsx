'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#22577A] text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <span>&copy; 2017–2024</span>
            <span className="font-semibold">Talent Sprint Classes</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">All Rights Reserved</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Made with 💖 by <strong>4rt3mi5</strong></span>
          </div>
          
          <button
            onClick={scrollToTop}
            className="mt-3 sm:mt-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Back to top"
          >
            <FontAwesomeIcon icon={faAnglesUp} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
