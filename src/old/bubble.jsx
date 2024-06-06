// /*
// This is the home page but with a "bubble" particles effect for the Hero section
// */

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

// const HomeBubble = ({ experienceData, formationsData }) => (
//   /* Wrap all sections within a scroll-wrapper that adds a functional navbar/sidebar feature */
//   <ScrollWrapper>
//     {/* Include website metadata */}
//     <Metadata />

//     {/* Hero section with "bubble" particles variant */}
//     <Hero nav='Home' id='home' variant='particles' preset='bubble' />

//     {/* Include the rest of sections, some with passed MDX data */}
//     <About nav='About' id='about' />
//     <Services nav='Services' id='services' />
//     <Hire id='hire' />

//     <Experience nav='Experience' id='experience' data={experienceData} />
//     <Formations nav='Formations' id='formations' data={formationsData} />

//     <Contact nav='Contact' id='contact' />
//     <Footer id='footer' />
//   </ScrollWrapper>
// )

// export default HomeBubble

// /*
// This is a special Next.js function that allows fetching data
// at build-time which is known as Static Site Generation (SSG).
// In this context it is retrieving data from MDX files to be passed to page sections
// Read more: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props
// */
// export const getStaticProps = async () => ({
//   props: {
//     experienceData: await parseAllMdx(Experience),
//     formationsData: await parseAllMdx(Formations),
//   },
// })
