import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import Lightbox from 'root/src/components/lightbox'
import MdxRenderer from 'root/src/components/mdx-renderer'
import styled from './style'
import { Context } from './index'

const PostLightboxLayout = (props) => {
  const { state } = useContext(Context)
  const { title, summary } = state.data || {}
  const { children } = props

  return (
    <Row css={styled.PostLightboxLayout} className='justify-content-center'>
      <Col xs='12' lg='9'>
        <div className='_post-wrapper'>
          <h1 className='_title'>{title}</h1>
          <p className='_summary'>{summary}</p>
          <div className='_content'>{children}</div>
        </div>
      </Col>
    </Row>
  )
}

const PostLightbox = () => {
  const { state, dispatch } = useContext(Context)

  const components = {
    PostLightboxLayout,
  }

  return (
    <Lightbox
      css={styled.PostLightbox}
      show={state.show}
      onClose={() => dispatch({ type: 'data', data: null })}
    >
      <Container>
        {state.data && (
          <MdxRenderer
            serializedSource={state.data.content}
            components={components}
          />
        )}
      </Container>
    </Lightbox>
  )
}

export default PostLightbox
