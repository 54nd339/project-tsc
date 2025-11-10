import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  UserCredential,
} from 'firebase/auth'
import { auth } from './config'

/**
 * Sign in with email and password
 */
export async function signIn(
  email: string,
  password: string
): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

/**
 * Create a new user with email and password
 */
export async function signUp(
  email: string,
  password: string,
  displayName?: string
): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName })
    }
    
    return userCredential
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}

/**
 * Sign out the current user
 */
export async function logOut(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error('Error sending password reset email:', error)
    throw error
  }
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser
}

/**
 * Listen to auth state changes
 */
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

