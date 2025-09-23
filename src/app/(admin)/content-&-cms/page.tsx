import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import ContainerHeader from './_components/containerHeader'
import HomePageSectionTable from './_components/actions/home_section/homepage_section_table'
import BannerTable from './_components/actions/banner_section/banner_section_table'
import TestimonialTable from './_components/actions/testimonials/testimonial_section_table'
import PolicyTable from './_components/actions/policy_section/policy_section_table'
// import ContainerHeader from './_components/containerHeader'
// import BannerPage from './_components/actions/Banner/banner_section'
// import HomePageSectionTable from './_components/actions/home_section/homepage_sectoin_table'
// import TestimonialsTable from './_components/actions/testomonial_section/testomonial_section'
// import PoliciesTable from './_components/actions/policy_section/policy_section_table'

const Page = async () => {
  const cu = await auth()
  if (!cu?.user) redirect('/sign-in')

  const accessToken = cu.user.accessToken
  console.log(accessToken)

  return (
    <div className="space-y-10">
      <ContainerHeader />
      {/* home page section */}
      <HomePageSectionTable />

      {/* Banner section */}
      <div>
        <BannerTable />
      </div>

      {/* testomonails section */}
      <div>
        <TestimonialTable />
      </div>

      {/* policy section  */}
      <div>
        <PolicyTable />
      </div>
    </div>
  )
}

export default Page
