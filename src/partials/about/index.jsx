import axios from 'axios'
import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import SectionWrapper from 'root/src/components/section-wrapper'
import Button from 'root/src/components/button'
import Image from 'next/image'
import styled from './style'

const About = (props) => {
  const [about, setAbout] = useState(null)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(
          'mongodb://localhost:27017/portfolios_portfolio',
        )
        setAbout(response.data)
      } catch (error) {
        console.error('Error al obtener el perfil:', error)
      }
    }

    fetchAbout()
  }, [])

  return (
    <SectionWrapper
      css={styled.About}
      headerData={{ title: 'About me', description: 'Get to know me' }}
      {...props}
    >
      <div className='row align-items-center'>
        {/* aca va la imagen */}
        <Col xs='12' lg='5' className='_image'>
          <Image
            className='img-thumbnail'
            sizes='(max-width: 992px) 250px, (min-width: 992px) 41.66vw'
            alt='About Picture'
            src={about?.image || '/default-profile-image.jpg'}
            width={250}
            height={250}
          />
        </Col>

        {/* otra parte */}
        <Col xs='12' lg='7'>
          {/* Information part */}
          <h2 className='_subtitle'>Who am i?</h2>
          <h2 className='_title'>{about?.name || 'Loading...'}</h2>
          <div className='_description'>
            <p>{about?.bio || 'Loading...'}</p>
          </div>

          {/* info perso */}
          <address className='_address'>
            <Row>
              <Col className='_info' xs='12' md='6'>
                <span>Email:</span>
                <p>{about?.email || 'Loading...'}</p>
              </Col>
              <Col className='_info' xs='12' md='6'>
                <span>Age:</span>
                <p>{about?.age || 'Loading...'}</p>
              </Col>
            </Row>
            <Row>
              <Col className='_info' xs='12' md='6'>
                <span>From:</span>
                <p>{about?.location || 'Loading...'}</p>
              </Col>
            </Row>
          </address>

          {/* Button download CV */}
          <Button className='_button' href='/partials/about/cv.pdf' download>
            Download CV
          </Button>
        </Col>
      </div>
    </SectionWrapper>
  )
}

export default About
