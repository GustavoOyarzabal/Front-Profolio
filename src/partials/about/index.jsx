import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import SectionWrapper from 'root/src/components/section-wrapper'
import Button from 'root/src/components/button'
import Image from 'next/image'
import styled from './style'
import { fetchAboutData } from '../../services/api'

const About = (props) => {
  const [aboutData, setAboutData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAboutData()
        console.log('Fetched data:', data)
        setAboutData(data)
      } catch (fetchError) {
        setError(fetchError.message)
      }
    }

    getData()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <SectionWrapper
      css={styled.About}
      headerData={{
        title: aboutData?.title || 'Loading...',
        description: aboutData?.subTitle || 'Loading...',
      }}
      {...props}
    >
      <div className='row align-items-center'>
        <Col xs='12' lg='5' className='_image'>
          {aboutData?.image ? (
            <Image
              className='img-thumbnail'
              sizes='(max-width: 992px) 250px, (min-width: 992px) 41.66vw'
              alt='About Picture'
              src={aboutData.image}
              width={250}
              height={250}
            />
          ) : (
            <Image
              className='img-thumbnail'
              sizes='(max-width: 992px) 250px, (min-width: 992px) 41.66vw'
              alt='Default Picture'
              src='https://res.cloudinary.com/dtwacyhiq/image/upload/v1716661323/lzsmkwi1pnw72gymezuy.png'
              width={250}
              height={250}
            />
          )}
        </Col>
        <Col xs='12' lg='7'>
          <h2 className='_subtitle'>
            {aboutData?.description || 'Loading...'}
          </h2>
          <h2 className='_title'>
            {aboutData?.subDescription || 'Loading...'}
          </h2>
          <div className='_description'>
            <p>{aboutData?.github || 'Loading...'}</p>
          </div>
          <address className='_address'>
            <Row>
              <Col className='_info' xs='12' md='6'>
                <span>Email:</span>
                <p>{aboutData?.email || 'Loading...'}</p>
              </Col>
              <Col className='_info' xs='12' md='6'>
                <span>Tel:</span>
                <p>{aboutData?.tel || 'Loading...'}</p>
              </Col>
            </Row>
          </address>
          <Button
            className='_button'
            href={aboutData?.downloadCv || '#'}
            download
          >
            Download CV
          </Button>
        </Col>
      </div>
    </SectionWrapper>
  )
}

export default About

// const [about, setAbout] = useState(null)

// useEffect(() => {
//   const fetchAbout = async () => {
//     try {
//       const response = await axios.get('/api/about')
//       setAbout(response.data[0]) // Asumimos que solo hay un documento en la colección
//     } catch (error) {
//       console.error('Error al obtener el perfil:', error)
//     }
//   }

//   fetchAbout()
// }, [])
