import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import SectionWrapper from 'root/src/components/section-wrapper'
import Image from 'next/image'

import styled from './style'
import { fetchServiceData } from '../../services/api'

// Icon image component
const IconImage = ({ src, className }) => (
  <div
    className={className}
    style={{ width: '50px', height: '50px', position: 'relative' }}
  >
    <Image src={src} alt='Service Icon' layout='fill' objectFit='contain' />
  </div>
)

// Single service component
const SingleService = (props) => {
  const { cols, Icon, description, title, iconSrc } = props

  return (
    <Col {...cols}>
      <div css={styled.Service}>
        {iconSrc ? (
          <IconImage src={iconSrc} className='_icon' />
        ) : (
          <Icon className='_icon' />
        )}
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
        title: serviceData?.title || 'My Services',
        description: serviceData?.subTitle,
      }}
      {...props}
    >
      <Row>
        {serviceData && (
          <>
            <SingleService
              Icon={null}
              iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717061800/JsLogoiconfavion_tgakst.png'
              title={serviceData.designTrendsTitle}
              description={serviceData.designTrendsSubTitle}
              cols={{ xs: '12', md: '6', lg: '4' }}
            />
            <SingleService
              Icon={null}
              iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717061920/ReacticonFavicon_jktfgp.png'
              title={serviceData.customerSupportTitle}
              description={serviceData.customerSupportSubTitle}
              cols={{ xs: '12', md: '6', lg: '4' }}
            />
            <SingleService
              Icon={null}
              iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717060764/tsLogobuenTamano_ptixpb.png'
              title={serviceData.pSDDesignTitle}
              description={serviceData.pSDDesignSubTitle}
              cols={{ xs: '12', md: '6', lg: '4' }}
            />
            <SingleService
              Icon={null}
              iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717060928/nestJSFavicon_twh5tb.jpg'
              title={serviceData.webDevelopmentTitle}
              description={serviceData.webDevelopmentSubTitle}
              cols={{ xs: '12', md: '6', lg: '4' }}
            />
            <SingleService
              Icon={null}
              iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717061262/nextJSlogoFaviconIcon_wqo7fx.png'
              title={serviceData.fullyResponsiveTitle}
              description={serviceData.fullyResponsiveSubTitle}
              cols={{ xs: '12', md: '6', lg: '4' }}
            />
            <SingleService
              Icon={null}
              iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717062256/nodeJSicongoodtamano_ltrohu.png'
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

// import { useEffect, useState } from 'react'
// import { Row, Col } from 'react-bootstrap'
// import * as icons from '@swiftcarrot/react-ionicons'
// import SectionWrapper from 'root/src/components/section-wrapper'
// import Image from 'next/image'

// import styled from './style'
// import { fetchServiceData } from '../../services/api'

// // Icon image component
// const IconImage = ({ src, className }) => (
//   <div
//     className={className}
//     style={{ width: '40px', height: '40px', position: 'relative' }}
//   >
//     <Image src={src} alt='TypeScript Icon' layout='fill' objectFit='contain' />
//     <Image src={src} alt='Nest Icon' layout='fill' objectFit='contain' />
//   </div>
// )

// // Single service component
// const SingleService = (props) => {
//   const { cols, Icon, description, title, iconSrc } = props

//   return (
//     <Col {...cols}>
//       <div css={styled.Service}>
//         {iconSrc ? (
//           <IconImage src={iconSrc} className='_icon' />
//         ) : (
//           <Icon className='_icon' />
//         )}
//         <h6 className='_title'>{title}</h6>
//         <p className='_description'>{description}</p>
//       </div>
//     </Col>
//   )
// }

// // Services component
// const Services = (props) => {
//   const [serviceData, setServiceData] = useState(null)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await fetchServiceData()
//         setServiceData(data)
//       } catch (fetchError) {
//         setError(fetchError.message)
//       }
//     }

//     getData()
//   }, [])

//   if (error) {
//     return <div>Error: {error}</div>
//   }
//   if (!serviceData) {
//     return <div>Loading...</div>
//   }

//   return (
//     <SectionWrapper
//       css={styled.Services}
//       altBg={true}
//       headerData={{
//         title: serviceData?.title || 'My Services', // Inject service title here
//         description: serviceData?.subTitle,
//       }}
//       {...props}
//     >
//       <Row>
//         {serviceData && (
//           <>
//             <SingleService
//               Icon={icons.LogoJavascript}
//               title={serviceData.designTrendsTitle}
//               description={serviceData.designTrendsSubTitle}
//               cols={{ xs: '12', md: '6', lg: '4' }}
//             />
//             <SingleService
//               Icon={icons.LogoReact}
//               title={serviceData.customerSupportTitle}
//               description={serviceData.customerSupportSubTitle}
//               cols={{ xs: '12', md: '6', lg: '4' }}
//             />
//             <SingleService
//               Icon={null}
//               iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717058437/tsLogoBlue_jene14.jpg'
//               title={serviceData.pSDDesignTitle}
//               description={serviceData.pSDDesignSubTitle}
//               cols={{ xs: '12', md: '6', lg: '4' }}
//             />
//             <SingleService
//               Icon={null}
//               iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717011106/nestjsFavicon_sz58dg.png'
//               title={serviceData.webDevelopmentTitle}
//               description={serviceData.webDevelopmentSubTitle}
//               cols={{ xs: '12', md: '6', lg: '4' }}
//             />
//             <SingleService
//               Icon={icons.LogoVercel}
//               title={serviceData.fullyResponsiveTitle}
//               description={serviceData.fullyResponsiveSubTitle}
//               cols={{ xs: '12', md: '6', lg: '4' }}
//             />
//             <SingleService
//               Icon={icons.LogoNodejs}
//               title={serviceData.brandingTitle}
//               description={serviceData.brandingSubTitle}
//               cols={{ xs: '12', md: '6', lg: '4' }}
//             />
//           </>
//         )}
//       </Row>
//     </SectionWrapper>
//   )
// }

// export default Services
