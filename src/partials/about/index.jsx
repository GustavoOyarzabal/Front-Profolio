import { useEffect, useState } from 'react'
import { Row, Col, Modal } from 'react-bootstrap'
import SectionWrapper from 'root/src/components/section-wrapper'
import Button from 'root/src/components/button'
import Image from 'next/image'
import styled from './style'
import { fetchAboutData } from '../../services/api'

const About = (props) => {
  const [aboutData, setAboutData] = useState(null)
  const [error, setError] = useState(null)
  const [cvModalOpen, setCvModalOpen] = useState(false)

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

  const handleDownloadCvClick = (event) => {
    event.preventDefault()
    setCvModalOpen(true)
  }

  const handleCloseCvModal = () => {
    setCvModalOpen(false)
  }

  const cvUrl =
    aboutData?.downloadCv && aboutData.downloadCv.startsWith('http')
      ? aboutData.downloadCv
      : 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1720460961/Gustavo_Oyarzabal_qity39.jpg'

  const imageUrl =
    aboutData?.image && aboutData.image.startsWith('http')
      ? aboutData.image
      : 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1716661323/lzsmkwi1pnw72gymezuy.png'

  return (
    <SectionWrapper
      css={styled.About}
      headerData={{
        title: aboutData?.title || 'Loading11a...',
        description: aboutData?.subTitle || 'Loading22b...',
      }}
      {...props}
    >
      <div className='row align-items-center'>
        <Col xs='12' lg='5' className='_image'>
          <Image
            className='img-thumbnail'
            sizes='(max-width: 992px) 250px, (min-width: 992px) 41.66vw'
            alt='About Picture'
            src={imageUrl}
            width={250}
            height={250}
          />
        </Col>
        <Col xs='12' lg='7'>
          <h2 className='_subtitle'>
            {aboutData?.description || 'Loading1...'}
          </h2>
          <h2 className='_title'>
            {aboutData?.subDescription || 'Loading2...'}
          </h2>
          <address className='_address'>
            <Row>
              <Col className='_info mb-4' xs='12' md='12'>
                <span>GitHub:</span>
                <p>
                  <a
                    href={aboutData?.github}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {aboutData?.github || 'Loading3...'}
                  </a>
                </p>
              </Col>
              <Col className='_info mb-4' xs='12' md='12'>
                <span>GitLab:</span>
                <p>
                  <a
                    href={aboutData?.gitLab}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {aboutData?.gitLab || 'Loading4...'}
                  </a>
                </p>
              </Col>
              <Col className='_info' xs='12' md='6'>
                <span>Email:</span>
                <p>{aboutData?.email || 'Loading5...'}</p>
              </Col>
              <Col className='_info' xs='12' md='6'>
                <span>Tel:</span>
                <p>{aboutData?.tel || 'Loading6...'}</p>
              </Col>
            </Row>
          </address>
          <Button className='_button' onClick={handleDownloadCvClick}>
            Mon CV
          </Button>
        </Col>
      </div>

      <Modal show={cvModalOpen} onHide={handleCloseCvModal} size='xl' centered>
        <Modal.Header closeButton>
          <Modal.Title>CV</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex justify-content-center'>
          <Image
            src={cvUrl}
            alt='CV'
            width={1000}
            height={1400}
            sizes='(max-width: 1200px) 100vw, (min-width: 1200px) 80vw'
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseCvModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </SectionWrapper>
  )
}

export default About

// import { useEffect, useState } from 'react'
// import { Row, Col, Modal } from 'react-bootstrap'
// import SectionWrapper from 'root/src/components/section-wrapper'
// import Button from 'root/src/components/button'
// import Image from 'next/image'
// import styled from './style'
// import { fetchAboutData } from '../../services/api'

// const About = (props) => {
//   const [aboutData, setAboutData] = useState(null)
//   const [error, setError] = useState(null)
//   const [cvModalOpen, setCvModalOpen] = useState(false)

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await fetchAboutData()
//         console.log('Fetched data:', data)
//         setAboutData(data)
//       } catch (fetchError) {
//         setError(fetchError.message)
//       }
//     }

//     getData()
//   }, [])

//   if (error) {
//     return <div>Error: {error}</div>
//   }

//   const handleDownloadCvClick = (event) => {
//     event.preventDefault()
//     setCvModalOpen(true)
//   }

//   const handleCloseCvModal = () => {
//     setCvModalOpen(false)
//   }

//   const cvUrl =
//     aboutData?.downloadCv && aboutData.downloadCv.startsWith('http')
//       ? aboutData.downloadCv
//       : 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1716975900/Gustavo_Oyarzabal_ormtev.png'

//   const imageUrl =
//     aboutData?.image && aboutData.image.startsWith('http')
//       ? aboutData.image
//       : 'https://res.cloudinary.com/dtwacyhiq/image/upload/v1716661323/lzsmkwi1pnw72gymezuy.png'

//   return (
//     <SectionWrapper
//       css={styled.About}
//       headerData={{
//         title: aboutData?.title || 'Loading...',
//         description: aboutData?.subTitle || 'Loading...',
//       }}
//       {...props}
//     >
//       <div className='row align-items-center'>
//         <Col xs='12' lg='5' className='_image'>
//           <Image
//             className='img-thumbnail'
//             sizes='(max-width: 992px) 250px, (min-width: 992px) 41.66vw'
//             alt='About Picture'
//             src={imageUrl}
//             width={250}
//             height={250}
//           />
//         </Col>
//         <Col xs='12' lg='7'>
//           <h2 className='_subtitle'>
//             {aboutData?.description || 'Loading...'}
//           </h2>
//           <h2 className='_title'>
//             {aboutData?.subDescription || 'Loading...'}
//           </h2>
//           <address className='_address'>
//             <Row>
//               <Col className='_info' xs='12' md='12'>
//                 <span>GitHub:</span>
//                 <p>
//                   <a
//                     href={aboutData?.github}
//                     target='_blank'
//                     rel='noopener noreferrer'
//                   >
//                     {aboutData?.github || 'Loading...'}
//                   </a>
//                 </p>
//               </Col>
//               <Col className='_info' xs='12' md='12'>
//                 <span>GitLab:</span>
//                 <p>
//                   <a
//                     href={aboutData?.gitLab}
//                     target='_blank'
//                     rel='noopener noreferrer'
//                   >
//                     {aboutData?.gitLab || 'Loading...'}
//                   </a>
//                 </p>
//               </Col>

//               <Col className='_info' xs='12' md='6'>
//                 <span>Email:</span>
//                 <p>{aboutData?.email || 'Loading...'}</p>
//               </Col>
//               <Col className='_info' xs='12' md='6'>
//                 <span>Tel:</span>
//                 <p>{aboutData?.tel || 'Loading...'}</p>
//               </Col>
//             </Row>
//           </address>
//           <Button className='_button' onClick={handleDownloadCvClick}>
//             Download CV
//           </Button>
//         </Col>
//       </div>

//       <Modal show={cvModalOpen} onHide={handleCloseCvModal} size='xl' centered>
//         <Modal.Header closeButton>
//           <Modal.Title>CV</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className='d-flex justify-content-center'>
//           <Image
//             src={cvUrl}
//             alt='CV'
//             width={1000}
//             height={1400}
//             sizes='(max-width: 1200px) 100vw, (min-width: 1200px) 80vw'
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={handleCloseCvModal}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     </SectionWrapper>
//   )
// }

// export default About
