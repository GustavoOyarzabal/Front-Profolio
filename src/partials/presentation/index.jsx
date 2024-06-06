import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Typed from 'typed.js'
import SectionWrapper from 'root/src/components/section-wrapper'
import { Link as ScrollLink } from 'react-scroll'
import ImageVariant from './variants/image'
import VideoVariant from './variants/video'
import ParticlesVariant from './variants/particles'
import styled from './style'

const MouseShape = () => (
  <ScrollLink
    css={styled.MouseShape}
    to={'about'}
    spy={true}
    smooth={true}
    duration={600}
  >
    <div className='_shape'>
      <div className='_wheel' />
    </div>
  </ScrollLink>
)

const Presentation = (props) => {
  const { variant, ...otherProps } = props
  const [presentationData, setPresentationData] = useState({
    skillName: 'Developer',
    skillLastName: '',
    skillHeadline: '',
  })

  useEffect(() => {
    const fetchPresentationData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3003/api/portfolios/presentation',
        )
        const presentationResponse = response.data
        setPresentationData(presentationResponse)
      } catch (error) {
        console.error('Error fetching presentation data:', error)
      }
    }

    fetchPresentationData()
  }, [])

  useEffect(() => {
    const options = {
      strings: [presentationData.skillHeadline || 'Developer'],
      typeSpeed: 40,
      backSpeed: 40,
      loop: true,
      smartBackspace: false,
      backDelay: 2000,
    }

    const typed = new Typed('#typed', options)
    return () => {
      typed.destroy()
    }
  }, [presentationData.skillHeadline])

  const setVariant = () => {
    switch (variant) {
      case 'image':
        return <ImageVariant />
      case 'video':
        return <VideoVariant />
      case 'particles':
        return <ParticlesVariant preset={props.preset} />
      default:
        return <ImageVariant />
    }
  }

  return (
    <SectionWrapper
      css={styled.Hero}
      containerProps={{ className: 'h-100' }}
      style={{ position: 'relative' }}
      {...otherProps}
    >
      {setVariant()}
      <Row
        style={{ position: 'relative', zIndex: 1 }}
        className='align-items-center justify-content-center h-100'
      >
        <Col xs='12' lg='8' className='text-center'>
          <h1 className='_name'>
            {presentationData.skillName}
            <span> {presentationData.skillLastName}</span>
          </h1>
          <h4 className='_headline'>
            Je&apos;suis <span id='typed' />
          </h4>
        </Col>
        <MouseShape />
      </Row>
    </SectionWrapper>
  )
}

export default Presentation
