import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SectionWrapper from 'root/src/components/section-wrapper'
import { Col, Row } from 'react-bootstrap'
import Button from 'root/src/components/button'
import { Link as ScrollLink } from 'react-scroll'
import styled from './style'

const Hire = (props) => {
  const [hireData, setHireData] = useState({
    goToWork: '',
    available: '',
    hireMe: '',
  })

  useEffect(() => {
    const fetchHireData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/portfolios/hire',
        )
        const hireResponse = response.data
        setHireData(hireResponse)
      } catch (error) {
        console.error('Error fetching hire data:', error)
      }
    }

    fetchHireData()
  }, [])

  return (
    <SectionWrapper
      css={styled.Hire}
      backgroundProps={{
        alt: 'Hire background',
        src: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1716661323/lzsmkwi1pnw72gymezuy.png',
        brightness: '17%',
      }}
      {...props}
    >
      <Row className='_row'>
        <Col className='_wrapper' xs='12' md='8'>
          <h1 className='_title'>
            {hireData.goToWork || "Let's work together!"}
          </h1>
          <p className='_description'>
            {hireData.available ||
              'I am available for freelance projects. Hire me and get your project done.'}
          </p>
        </Col>
        <Col className='_wrapper' xs='12' md='4'>
          <div className='_button-wrapper'>
            <Button
              as={ScrollLink}
              to={'contact'}
              spy={true}
              smooth={true}
              duration={600}
              className='_button'
            >
              {hireData.hireMe || 'Hire me'}
            </Button>
          </div>
        </Col>
      </Row>
    </SectionWrapper>
  )
}

export default Hire
