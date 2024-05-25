import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import * as icons from '@swiftcarrot/react-ionicons'
import SectionWrapper from 'root/src/components/section-wrapper'
import styled from './style'
import { fetchServiceData } from '../../services/api'

// Single service component
const SingleService = (props) => {
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
const Services = (props) => {
  const [serviceData, setServiceData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchServiceData()
        setServiceData(data)
      } catch (fetchError) {
        setError(fetchError.message)
      }
    }

    getData()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }
  if (!serviceData) {
    return <div>Loading...</div>
  }

  return (
    <SectionWrapper
      css={styled.Services}
      altBg={true}
      headerData={{
        title: serviceData?.title || 'My Services', // Inject service title here
        description: serviceData?.subTitle,
      }}
      {...props}
    >
      <Row>
        {serviceData && (
          <>
            <SingleService
              Icon={icons.LogoCss3}
              title={serviceData.designTrendsTitle}
              description={serviceData.designTrendsSubTitle}
              cols={{ xs: '12', md: '6', lg: '4' }}
            />
            <SingleService
              Icon={icons.Images}
              title={serviceData.pSDDesignTitle}
              description={serviceData.pSDDesignSubTitle}
              cols={{ xs: '12', md: '6', lg: '4' }}
            />
            <SingleService
              Icon={icons.LogoIonic}
              title={serviceData.customerSupportTitle}
              description={serviceData.customerSupportSubTitle}
              cols={{ xs: '12', md: '6', lg: '4' }}
            />
            <SingleService
              Icon={icons.LogoWordpress}
              title={serviceData.webDevelopmentTitle}
              description={serviceData.webDevelopmentSubTitle}
              cols={{ xs: '12', md: '6', lg: '4' }}
            />
            <SingleService
              Icon={icons.PhonePortraitSharp}
              title={serviceData.fullyResponsiveTitle}
              description={serviceData.fullyResponsiveSubTitle}
              cols={{ xs: '12', md: '6', lg: '4' }}
            />
            <SingleService
              Icon={icons.RocketSharp}
              title={serviceData.brandingTitle}
              description={serviceData.brandingSubTitle}
              cols={{ xs: '12', md: '6', lg: '4' }}
            />
          </>
        )}
      </Row>
    </SectionWrapper>
  )
}

export default Services
