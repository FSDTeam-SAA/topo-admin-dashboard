import { auth } from '@/auth'
import ListingsClient from './components/listingsClient/ListingsClient'
import { redirect } from 'next/navigation'

export default async function Page() {
  // redirect user if not login
  const cu = await auth()
  if (!cu?.user) redirect('/sign-in')

  const accessToken = cu.user.accessToken!

  return <ListingsClient accessToken={accessToken} />
}
