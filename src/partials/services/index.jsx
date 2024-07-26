import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import SectionWrapper from 'root/src/components/section-wrapper'
import Image from 'next/image'
import styled from './style'

const servicesData = [
  {
    name: 'JavaScript',
    logo: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717061800/JsLogoiconfavion_tgakst.png',
    title: 'JavaScript Development',
    description: 'Building dynamic and interactive web applications.'
  },
  {
    name: 'TypeScript',
    logo: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717060764/tsLogobuenTamano_ptixpb.png',
    title: 'TypeScript Development',
    description: 'Enhancing JavaScript with static typing for robust applications.'
  },
  {
    name: 'Nest.js',
    logo: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717060928/nestJSFavicon_twh5tb.jpg',
    title: 'Nest.js Development',
    description: 'Creating scalable and maintainable server-side applications.'
  },
  {
    name: 'Next.js',
    logo: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717061262/nextJSlogoFaviconIcon_wqo7fx.png',
    title: 'Next.js Development',
    description: 'Building server-rendered React applications for optimal performance.'
  },
  {
    name: 'Node.js',
    logo: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717062256/nodeJSicongoodtamano_ltrohu.png',
    title: 'Node.js Development',
    description: 'Developing fast and scalable network applications.'
  },
  {
    name: 'Python',
    logo: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1721983946/logoPython_ymmsx1.jpg',
    title: 'Python Development',
    description: 'Creating powerful and efficient backend systems.'
  },
  {
    name: 'Docker',
    logo: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1721984061/dockerLogo_xha3i6.png',
    title: 'Docker',
    description: 'Containerizing applications for consistent and efficient deployment.'
  },
  {
    name: 'React.js',
    logo: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1717061920/ReacticonFavicon_jktfgp.png',
    title: 'React.js Development',
    description: 'Building user interfaces with React.js.'
  },
  {
    name: 'MongoDB',
    logo: 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1721984710/mongoDBLogo_bxjoku.png',
    title: 'MongoDB',
    description: 'Database management with MongoDB.'
  }
]

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
const SingleService = ({ cols, iconSrc, title, description }) => (
  <Col {...cols}>
    <div css={styled.Service}>
      <IconImage src={iconSrc} className='_icon' />
      <h6 className='_title'>{title}</h6>
      <p className='_description'>{description}</p>
    </div>
  </Col>
)

// Services component
const Services = (props) => {
  const [serviceData, setServiceData] = useState(servicesData)
  const [error, setError] = useState(null)

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <SectionWrapper
      css={styled.Services}
      altBg={true}
      headerData={{
        title: 'My Services',
        description: 'Here are some of the technologies I work with:',
      }}
      {...props}
    >
      <Row>
        {serviceData.map((service, index) => (
          <SingleService
            key={index}
            iconSrc={service.logo}
            title={service.title}
            description={service.description}
            cols={{ xs: '12', md: '6', lg: '4' }}
          />
        ))}
      </Row>
    </SectionWrapper>
  )
}

export default Services


// import { useEffect, useState } from 'react'
// import { Row, Col } from 'react-bootstrap'
// import SectionWrapper from 'root/src/components/section-wrapper'
// import Image from 'next/image'

// import styled from './style'
// import { fetchServiceData } from '../../services/api'

// // Icon image component
// const IconImage = ({ src, className }) => (
//   <div
//     className={className}
//     style={{ width: '50px', height: '50px', position: 'relative' }}
//   >
//     <Image src={src} alt='Service Icon' layout='fill' objectFit='contain' />
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
//         title: serviceData?.title || 'My Services',
//         description: serviceData?.subTitle,
//       }}
//       {...props}
//     >
//       <Row>
//         {serviceData && (
//           <>
//             <SingleService
//               Icon={null}
//               iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717061800/JsLogoiconfavion_tgakst.png'
//               title={serviceData.designTrendsTitle}
//               description={serviceData.designTrendsSubTitle}
//               cols={{ xs: '12', md: '6', lg: '4' }}
//             />
//             <SingleService
//               Icon={null}
//               iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717061920/ReacticonFavicon_jktfgp.png'
//               title={serviceData.customerSupportTitle}
//               description={serviceData.customerSupportSubTitle}
//               cols={{ xs: '12', md: '6', lg: '4' }}
//             />
//             <SingleService
//               Icon={null}
//               iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717060764/tsLogobuenTamano_ptixpb.png'
//               title={serviceData.pSDDesignTitle}
//               description={serviceData.pSDDesignSubTitle}
//               cols={{ xs: '12', md: '6', lg: '4' }}
//             />
//             <SingleService
//               Icon={null}
//               iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717060928/nestJSFavicon_twh5tb.jpg'
//               title={serviceData.webDevelopmentTitle}
//               description={serviceData.webDevelopmentSubTitle}
//               cols={{ xs: '12', md: '6', lg: '4' }}
//             />
//             <SingleService
//               Icon={null}
//               iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717061262/nextJSlogoFaviconIcon_wqo7fx.png'
//               title={serviceData.fullyResponsiveTitle}
//               description={serviceData.fullyResponsiveSubTitle}
//               cols={{ xs: '12', md: '6', lg: '4' }}
//             />
//             <SingleService
//               Icon={null}
//               iconSrc='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717062256/nodeJSicongoodtamano_ltrohu.png'
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
