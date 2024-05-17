/*
This is the services section
*/

import { Row, Col } from 'react-bootstrap'
import * as icons from '@swiftcarrot/react-ionicons'
import SectionWrapper from 'root/src/components/section-wrapper'
import styled from './style'

// Single service component
const SingleService = (props) => {
  // Destructure props
  const { cols, Icon, description, title } = props

  return (
    <Col {...cols}>
      <div css={styled.Service}>
        <Icon className='_icon' />
        <h6 className='_title'>{title}</h6>
        <p className='_description'>{description}</p>
      </div>
    </Col>
  )
}

// Services component
const Services = (props) => (
  <SectionWrapper
    css={styled.Services}
    altBg={true}
    headerData={{
      title: 'My Services',
      description: 'Services i offer to my clients',
    }}
    {...props}
  >
    {/* List of services */}
    <Row>
      <SingleService
        Icon={icons.LogoCss3}
        title='Design Trends'
        description='Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        cols={{ xs: '12', md: '6', lg: '4' }}
      />
      <SingleService
        Icon={icons.Images}
        title='PSD Design'
        description='Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        cols={{ xs: '12', md: '6', lg: '4' }}
      />
      <SingleService
        Icon={icons.LogoIonic}
        title='Customer Support'
        description='Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        cols={{ xs: '12', md: '6', lg: '4' }}
      />
      <SingleService
        Icon={icons.LogoWordpress}
        title='Web Development'
        description='Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        cols={{ xs: '12', md: '6', lg: '4' }}
      />
      <SingleService
        Icon={icons.PhonePortraitSharp}
        title='Fully Responsive'
        description='Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        cols={{ xs: '12', md: '6', lg: '4' }}
      />
      <SingleService
        Icon={icons.RocketSharp}
        title='Branding'
        description='Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        cols={{ xs: '12', md: '6', lg: '4' }}
      />
    </Row>
  </SectionWrapper>
)

export default Services
