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
    <Modal.Header>
      <Container className='d-flex'>
        <CloseButton onClick={onClose} />
      </Container>
    </Modal.Header>

    <Modal.Body>{children}</Modal.Body>
  </Modal>
)

export default Lightbox
