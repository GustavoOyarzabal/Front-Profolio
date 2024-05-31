import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import * as icons from '@swiftcarrot/react-ionicons'
import { css } from '@emotion/react'
import { darken } from 'polished'
import SectionWrapper from 'root/src/components/section-wrapper'
import styled from './style'
import { fetchFooterData } from '../../services/api' // Importa el servicio de API

const SingleBlock = ({ cols, Icon, content }) => (
  <Col {...cols}>
    <div css={styled.SingleBlock}>
      <Icon className='_icon' />
      <p className='_content'>{content}</p>
    </div>
  </Col>
)

const SocialIcon = ({ url, Icon, color }) => (
  <a
    href={url}
    css={css`
      background-color: ${color};
      &:focus,
      &:hover {
        background-color: ${darken(0.08, color)};
      }
      ${styled.SocialIcon}
    `}
  >
    <Icon className='_icon' />
  </a>
)

const Footer = (props) => {
  const [footerData, setFooterData] = useState(null)

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const data = await fetchFooterData()
        setFooterData(data)
      } catch (error) {
        console.error('Error fetching footer data:', error)
      }
    }

    fetchFooter()
  }, [])

  if (!footerData) return null // O muestra un spinner de carga

  return (
    <SectionWrapper css={styled.Footer} {...props}>
      <Row className='_contact'>
        <SingleBlock
          Icon={icons.MapSharp}
          content={
            <a href='https://goo.gl/maps/2YAGiugG47VAS17g7' target='_blank'>
              {footerData.adrese}
            </a>
          }
          cols={{ xs: '12', sm: '4' }}
        />
        <SingleBlock
          Icon={icons.CallSharp}
          content={
            <a href={`tel:${footerData.numeroTel}`}>{footerData.numeroTel}</a>
          }
          cols={{ xs: '12', sm: '4' }}
        />
        <SingleBlock
          Icon={icons.SendSharp}
          content={
            <a href={`mailto:${footerData.email}`}>{footerData.email}</a>
          }
          cols={{ xs: '12', sm: '4' }}
        />
      </Row>
      <Row className='_row _mini'>
        <Col xs='12' lg='5' className='_socials'>
          <SocialIcon
            url='https://git.alt-tools.tech/OyarzabalGustavo'
            Icon={icons.LogoGitlab}
            color='#c34a49'
          />
          <SocialIcon
            url='www.linkedin.com/in/gustavooyarzabal'
            Icon={icons.LogoInstagram}
            color='#C32361'
          />
          <SocialIcon
            url='www.linkedin.com/in/gustavooyarzabal'
            Icon={icons.LogoLinkedin}
            color='#0077B5'
          />
          <SocialIcon
            url='https://github.com/GustavoOyarzabal'
            Icon={icons.LogoGithub}
            color='#6e5494'
          />
          <SocialIcon
            url='Taguoy#4708'
            Icon={icons.LogoDiscord}
            color='#3B5998'
          />
        </Col>
        <Col as='p' xs='12' lg='7' className='_copyright-notice'>
          {footerData.developedBy}.
        </Col>
      </Row>
    </SectionWrapper>
  )
}

export default Footer

// /*
// This is the footer section
// */

// import { Col, Row } from 'react-bootstrap'
// import * as icons from '@swiftcarrot/react-ionicons'
// import { css } from '@emotion/react'
// import { darken } from 'polished'
// import SectionWrapper from 'root/src/components/section-wrapper'
// import styled from './style'

// // Single block component to display icon and content
// const SingleBlock = (props) => {
//   const { cols, Icon, content } = props
//   return (
//     <Col {...cols}>
//       <div css={styled.SingleBlock}>
//         {/* Icon to display */}
//         <Icon className='_icon' />
//         {/* Content to display */}
//         <p className='_content'>{content}</p>
//       </div>
//     </Col>
//   )
// }

// // Social icon component
// const SocialIcon = (props) => {
//   const { url, Icon, color } = props
//   return (
//     <a
//       href={url}
//       css={css`
//         background-color: ${color};
//         &:focus,
//         &:hover {
//           background-color: ${darken(0.08, color)};
//         }
//         ${styled.SocialIcon}
//       `}
//     >
//       {/* Icon to display */}
//       <Icon className='_icon' />
//     </a>
//   )
// }

// // Footer component
// const Footer = (props) => (
//   <SectionWrapper css={styled.Footer} {...props}>
//     {/* List contact information blocks */}
//     <Row className='_contact'>
//       <SingleBlock
//         Icon={icons.MapSharp}
//         content={
//           <a href='https://goo.gl/maps/2YAGiugG47VAS17g7' target='_blank'>
//             83 Boulevard de Redon (B4), Marseille (13008), France.
//           </a>
//         }
//         cols={{ xs: '12', sm: '4' }}
//       />
//       <SingleBlock
//         Icon={icons.CallSharp}
//         content={<a href='tel:+441632967704'>+33 0671473291</a>}
//         cols={{ xs: '12', sm: '4' }}
//       />
//       <SingleBlock
//         Icon={icons.SendSharp}
//         content={
//           <a href='mailto:oyarzabal.gustavo@gmail.com'>
//             oyarzabal.gustavo@gmail.com
//           </a>
//         }
//         cols={{ xs: '12', sm: '4' }}
//       />
//     </Row>
//     {/* List social media icons and copyright notice */}
//     <Row className='_row _mini'>
//       <Col xs='12' lg='5' className='_socials'>
//         <SocialIcon url='#0' Icon={icons.LogoTwitter} color='#1DA1F2' />
//         <SocialIcon url='#0' Icon={icons.LogoInstagram} color='#C32361' />
//         <SocialIcon url='#0' Icon={icons.LogoLinkedin} color='#0077B5' />
//         <SocialIcon url='#0' Icon={icons.LogoYoutube} color='#c33a38' />
//         <SocialIcon url='#0' Icon={icons.LogoGithub} color='#6e5494' />
//         <SocialIcon url='#0' Icon={icons.LogoFacebook} color='#3B5998' />
//       </Col>
//       <Col as='p' xs='12' lg='7' className='_copyright-notice'>
//         Developed by {'Gustavo Oyarzabal '}.
//       </Col>
//     </Row>
//   </SectionWrapper>
// )

// export default Footer
