'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faIndianRupeeSign, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/features/auth/components/AuthProvider'
import { logOut } from '@/lib/firebase/auth'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, userRole, userData } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [greeting, setGreeting] = useState('Welcome')
  const [activeTab, setActiveTab] = useState('home')

  const tabs = {
    guest: [
      { id: 'home', name: 'Home', href: '/#home' },
      { id: 'courses', name: 'Courses', href: '/#courses' },
      { id: 'success', name: 'Our Success', href: '/#success' },
      { id: 'about', name: 'About Us', href: '/#about' },
      { id: 'contact', name: 'Contact Us', href: '/#contact' },
    ],
    student: [
      { id: 'home', name: 'Home', href: `/student/${user?.uid}#home` },
      { id: 'download', name: 'Download', href: `/student/${user?.uid}#download` },
      { id: 'exam', name: 'Exam', href: `/student/${user?.uid}#exam` },
      { id: 'feedback', name: 'Feedback', href: `/student/${user?.uid}#feedback` },
    ],
    teacher: [
      { id: 'home', name: 'Home', href: `/teacher/${user?.uid}#home` },
      { id: 'upload', name: 'Upload', href: `/teacher/${user?.uid}#upload` },
      { id: 'exam', name: 'Exam', href: `/teacher/${user?.uid}#exam` },
    ],
    admin: [
      { id: 'home', name: 'Home', href: `/admin/${user?.uid}#home` },
      { id: 'students', name: 'Students', href: `/admin/${user?.uid}#students` },
      { id: 'teachers', name: 'Teachers', href: `/admin/${user?.uid}#teachers` },
      { id: 'pending', name: 'New Users', href: `/admin/${user?.uid}#pending` },
      { id: 'site', name: 'Site', href: `/admin/${user?.uid}#site` },
    ],
  }

  const currentTabs = tabs[userRole || 'guest']

  useEffect(() => {
    if (userData?.dob) {
      const today = new Date()
      const birthday = new Date(userData.dob)
      
      if (
        today.getMonth() === birthday.getMonth() &&
        today.getDate() === birthday.getDate()
      ) {
        setGreeting('Happy Birthday')
        return
      }
    }

    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting('Good Morning')
    } else if (hour < 17) {
      setGreeting('Good Afternoon')
    } else {
      setGreeting('Good Evening')
    }
  }, [userData])

  const handleLogout = async () => {
    try {
      await logOut()
      localStorage.removeItem('role')
      localStorage.removeItem('uid')
      document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      document.cookie = 'uid=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const downloadAPK = () => {
    const appLink = 'https://firebasestorage.googleapis.com/v0/b/tsc-web-361112.appspot.com/o/base.apk?alt=media&token=78705e7b-a3c3-4af2-80a6-9aeb56f6c448'
    window.open(appLink, '_blank')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logos/logo_coloured.png"
                alt="Talent Sprint Classes"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </Link>
            
            <div className="hidden md:block">
              {!user ? (
                <h1 className="text-xl font-bold text-blue-600">
                  Talent Sprint Classes
                </h1>
              ) : (
                <div className="text-sm">
                  <span className="text-gray-600">{greeting}, </span>
                  <span className="font-semibold text-green-600">
                    {userData?.name || 'User'}!
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {currentTabs.map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'
                }`}
                onClick={() => {
                  setActiveTab(tab.id)
                }}
              >
                {tab.name}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {!user ? (
              <>
                <button className="btn btn-outline-success btn-sm">Login</button>
                <button className="btn btn-success btn-sm">Register</button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={downloadAPK}
                >
                  Download APK
                </button>
              </>
            ) : (
              <>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <FontAwesomeIcon icon={faGear} className="text-gray-600" />
                </button>
                {userRole === 'student' && (
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <FontAwesomeIcon icon={faIndianRupeeSign} className="text-gray-600" />
                  </button>
                )}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FontAwesomeIcon 
              icon={isOpen ? faXmark : faBars} 
              className="w-6 h-6 text-gray-700" 
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            {currentTabs.map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setActiveTab(tab.id)
                  setIsOpen(false)
                }}
              >
                {tab.name}
              </a>
            ))}
            
            <div className="pt-3 border-t border-gray-200 space-y-2">
              {!user ? (
                <>
                  <button className="w-full btn btn-outline-success btn-sm">
                    Login
                  </button>
                  <button className="w-full btn btn-success btn-sm">
                    Register
                  </button>
                  <button
                    className="w-full btn btn-outline-primary btn-sm"
                    onClick={downloadAPK}
                  >
                    Download APK
                  </button>
                </>
              ) : (
                <button
                  className="w-full btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
