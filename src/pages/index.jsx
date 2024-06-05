import ScrollWrapper from 'root/src/components/scroll-wrapper'
import Hero from 'root/src/partials/presentation'
import About from 'root/src/partials/about'
import Services from 'root/src/partials/services'
import Hire from 'root/src/partials/hire'
import Experience from 'root/src/partials/experience'
import Formations from 'root/src/partials/formations'
import Contact from 'root/src/partials/form'
import Footer from 'root/src/partials/footer'
import Metadata from 'root/src/metadata'
import { serialize } from 'next-mdx-remote/serialize'
import { BackURL } from 'root/utils/back-conf.enum'

const HomeVideo = ({ experienceData, formationsData }) => (
  <ScrollWrapper>
    <Metadata />
    <Hero nav='Home' id='home' variant='video' />
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

export const getStaticProps = async () => {
  let experienceData = []
  let formationsData = []

  try {
    const res = await fetch(`${BackURL.URL}api/portfolios/experience`)
    if (res.ok) {
      const data = await res.json()
      experienceData = await Promise.all(
        data.map(async (item) => ({
          ...item,
          content: await serialize(item.content),
        })),
      )
    } else {
      console.error('Error fetching experience data:', res.statusText)
    }

    const formationsRes = await fetch(
      `${BackURL.URL}api/portfolios/formation`,
    )
    if (formationsRes.ok) {
      const data = await formationsRes.json()
      formationsData = await Promise.all(
        data.map(async (item) => ({
          ...item,
          content: await serialize(item.content),
        })),
      )
    } else {
      console.error('Error fetching formations data:', formationsRes.statusText)
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }

  return {
    props: {
      experienceData,
      formationsData,
    },
  }
}
