import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { WelcomePage } from '@/features/home/components/WelcomePage'

export default async function HomePage() {
  const cookieStore = cookies()
  const role = cookieStore.get('role')?.value
  const uid = cookieStore.get('uid')?.value

  // Redirect to appropriate dashboard if already logged in
  if (role && uid) {
    redirect(`/${role}/${uid}`)
  }

  return <WelcomePage />
}

