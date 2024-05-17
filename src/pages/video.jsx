/*
This is the home page but with a video background for the Hero section
*/

import ScrollWrapper from 'root/src/components/scroll-wrapper'
import Hero from 'root/src/partials/hero'
import About from 'root/src/partials/about'
import Services from 'root/src/partials/services'
import Hire from 'root/src/partials/hire'
import Experience, { ExperienceDataPath } from 'root/src/partials/experience'
import Formations, { FormationsDataPath } from 'root/src/partials/formations'

import Contact from 'root/src/partials/contact'
import Footer from 'root/src/partials/footer'
import parseAllMdx from 'root/src/lib/parseAllMdx'
import Metadata from 'root/src/metadata'

const HomeVideo = ({ experienceData, formationsData }) => (
  /* Wrap all sections within a scroll-wrapper that adds a functional navbar/sidebar feature */
  <ScrollWrapper>
    {/* Include website metadata */}
    <Metadata />

    {/* Hero section with a video background */}
    <Hero nav='Home' id='home' variant='video' />

    {/* Include the rest of sections, some with passed MDX data */}
    <About nav='About' id='about' />
    <Services nav='Services' id='services' />
    <Hire id='hire' />
    <Experience nav='Experience' id='experience' data={experienceData} />
    <Formations nav='Formations' id='formations' data={formationsData} />

    <Contact nav='Contact' id='contact' />
    <Footer id='footer' />
  </ScrollWrapper>
)

export default HomeVideo

/*
This is a special Next.js function that allows fetching data
at build-time which is known as Static Site Generation (SSG).
In this context it is retrieving data from MDX files to be passed to page sections
Read more: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props
*/
export const getStaticProps = async () => ({
  props: {
    experienceData: await parseAllMdx(ExperienceDataPath),
    formationsData: await parseAllMdx(FormationsDataPath),
  },
})
