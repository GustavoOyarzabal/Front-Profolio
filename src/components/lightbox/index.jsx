/*
Component that shows a lightbox (modal) containing the passed content
*/

import { Container, Modal, CloseButton } from 'react-bootstrap'
import styled from './style'

const Lightbox = ({ show, children, onClose, ...otherProps }) => (
  <Modal
    css={styled.Lightbox}
    scrollable
    backdrop={false}
    keyboard={true}
    animation
    show={show}
    fullscreen={true}
    {...otherProps}
  >
    {/* Header section with close button */}
    <Modal.Header>
      <Container className='d-flex'>
        <CloseButton onClick={onClose} />
      </Container>
    </Modal.Header>

    {/* Body section to render child content */}
    <Modal.Body>{children}</Modal.Body>
  </Modal>
)

export default Lightbox

// import Image from 'next/image'
// import React from 'react'
// // eslint-disable-next-line import/no-extraneous-dependencies
// import PropTypes from 'prop-types'
// import Modal from 'react-bootstrap/Modal'
// import { css } from '@emotion/css'

// const Lightbox = ({ show, onClose, children, className }) => (
//   <Modal show={show} onHide={onClose} dialogClassName={className}>
//     <Modal.Body>{children}</Modal.Body>
//   </Modal>
// )

// Lightbox.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
//   className: PropTypes.string,
// }

// export default Lightbox

// // Añadir el componente LightboxThumbnail si es necesario
// export const LightboxThumbnail = ({ src, alt }) => (
//   <Image
//     src={src}
//     alt={alt}
//     className={css({ width: '100%', objectFit: 'cover' })}
//     layout='responsive'
//     width={700} // Ajusta esto según tus necesidades
//     height={475} // Ajusta esto según tus necesidades
//   />
// )

// LightboxThumbnail.propTypes = {
//   src: PropTypes.string.isRequired,
//   alt: PropTypes.string.isRequired,
// }
