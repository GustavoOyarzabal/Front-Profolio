import React from 'react'
import ScrollWrapper from 'root/src/components/scroll-wrapper'
import Hero from 'root/src/partials/presentation'
import About from 'root/src/partials/about'
import Services from 'root/src/partials/services'
import Hire from 'root/src/partials/hire'
import Experience, { ExperienceDataPath } from 'root/src/partials/experience'
import Formations, { FormationsDataPath } from 'root/src/partials/formations'
import Contact from 'root/src/partials/form'
import Footer from 'root/src/partials/footer'
import parseAllMdx from 'root/src/lib/parseAllMdx'
import Metadata from 'root/src/metadata'

const HomeImage = ({ experienceData, formationsData }) => (
  <ScrollWrapper>
    <Metadata />
    <Hero nav='Home' id='home' variant='image' />
    <About nav='About' id='about' />
    <Services nav='Services' id='services' />
    <Hire id='hire' />
    <Experience nav='Experience' id='experience' data={experienceData} />
    <Formations nav='Formations' id='formations' data={formationsData} />
    <Contact nav='Contact' id='contact' />
    <Footer id='footer' />
  </ScrollWrapper>
)

export default HomeImage

export const getStaticProps = async () => ({
  props: {
    experienceData: await parseAllMdx(ExperienceDataPath),
    formationsData: await parseAllMdx(FormationsDataPath),
  },
})
// import React from 'react'
// import ScrollWrapper from 'root/src/components/scroll-wrapper'
// import Hero from 'root/src/partials/presentation'
// import About from 'root/src/partials/about'
// import Services from 'root/src/partials/services'
// import Hire from 'root/src/partials/hire'
// import Experience from 'root/src/partials/experience'
// import Formations from 'root/src/partials/formations'
// import Contact from 'root/src/partials/form'
// import Footer from 'root/src/partials/footer'
// import parseAllMdx from 'root/src/lib/parseAllMdx'
// import Metadata from 'root/src/metadata'

// const Home = ({ experienceData, formationsData }) => (
//   <ScrollWrapper>
//     <Metadata />
//     <Hero nav='Home' id='home' variant='particles' preset='bubble' />
//     <About nav='About' id='about' />
//     <Services nav='Services' id='services' />
//     <Hire id='hire' />
//     <Experience nav='Experience' id='experience' data={experienceData} />
//     <Formations nav='Formations' id='formations' data={formationsData} />
//     <Contact nav='Contact' id='contact' />
//     <Footer id='footer' />
//   </ScrollWrapper>
// )

// export const getStaticProps = async () => {
//   const experienceData = await parseAllMdx('src/partials/experience/data')
//   const formationsData = await parseAllMdx('src/partials/formations/data')
//   return {
//     props: {
//       experienceData,
//       formationsData,
//     },
//   }
// }

// export default Home
