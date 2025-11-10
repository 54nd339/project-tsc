'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { onAuthChange } from '@/lib/firebase/auth'
import { UserRole } from '@/types'
import { getDocument } from '@/lib/firebase/firestore'

interface AuthContextType {
  user: User | null
  userRole: UserRole | null
  loading: boolean
  userData: any | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  loading: true,
  userData: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [userData, setUserData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange(async (authUser) => {
      setUser(authUser)
      
      if (authUser) {
        // Get user role from localStorage or fetch from Firestore
        const role = localStorage.getItem('role') as UserRole
        setUserRole(role)
        
        if (role) {
          try {
            const collection = `${role}s`
            const data = await getDocument(collection, authUser.uid)
            setUserData(data)
          } catch (error) {
            console.error('Error fetching user data:', error)
          }
        }
      } else {
        setUserRole(null)
        setUserData(null)
        localStorage.removeItem('role')
        localStorage.removeItem('uid')
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, userRole, loading, userData }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

