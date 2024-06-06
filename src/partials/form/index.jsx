/*
This is the Contact section. The contact form uses EmailJS API
to send emails: https://www.emailjs.com
*/

import React, { useRef, useReducer, useEffect, useState } from 'react'
import axios from 'axios'
import emailjs from '@emailjs/browser'
import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import * as z from 'zod'
import { css } from '@emotion/react'
import SectionWrapper from 'root/src/components/section-wrapper'
import Button from 'root/src/components/button'
import styled from './style'

// Define schema for EmailJS configuration
export const emailjsParamsSchema = z.object({
  serviceId: z.string().min(1),
  templateId: z.string().min(1),
  publicKey: z.string().min(1),
})

/*
Define EmailJS configuration
Make sure the values are replaced with your own EmailJS credentials.
Read the documentation for more information
*/
const emailjsParams = {
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
  publicKey: 'your_public_key',
}

// Define initial state
const initialState = {
  submit: {
    children: 'Send message',
    css: css``,
    disabled: false,
  },
  feedback: {
    css: css`
      display: none !important;
    `,
  },
}

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        submit: {
          children: 'Wait...',
          css: css`
            background-color: #222 !important;
            border-color: #222 !important;
          `,
          disabled: true,
        },
        feedback: {
          css: css`
            display: none !important;
          `,
        },
      }
    case 'success':
      return {
        submit: {
          children: 'Success',
          css: css`
            background-color: #28a745 !important;
            border-color: #28a745 !important;
          `,
          disabled: true,
        },
        feedback: {
          children: 'Thank you for your message. It has been sent.',
          css: css`
            color: #28a745;
            display: block !important;
          `,
        },
      }
    case 'failure':
      return {
        submit: {
          children: 'Error',
          css: css`
            background-color: #dc3545 !important;
            border-color: #dc3545 !important;
          `,
          disabled: true,
        },
        feedback: {
          children: 'Error occurred. Please check the console log.',
          css: css`
            color: #dc3545;
            display: block !important;
          `,
        },
      }
    default:
      return initialState
  }
}

const Formulaire = (props) => {
  const form = useRef()
  const [state, dispatch] = useReducer(stateReducer, initialState)
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  // Validate EmailJS params
  emailjsParamsSchema.parse(emailjsParams)

  // Fetch form data from the backend
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3003/api/portfolios/form',
        ) // Asegúrate de que la URL del backend sea correcta
        const formResponse = response.data // Assuming you're fetching the form entry
        setFormData(formResponse)
      } catch (error) {
        console.error('Error fetching form data:', error)
      }
    }

    fetchFormData()
  }, [])

  const sendEmail = (e) => {
    // Prevent default form submit behavior
    e.preventDefault()
    dispatch({ type: 'loading' })

    // Send email via EmailJS
    emailjs
      .sendForm(
        emailjsParams.serviceId,
        emailjsParams.templateId,
        form.current,
        emailjsParams.publicKey,
      )
      .then(
        () => {
          dispatch({ type: 'success' })
          form.current.reset()
          setTimeout(() => {
            dispatch({ type: null })
          }, 6000)
        },
        (error) => {
          console.error(error)
          dispatch({ type: 'failure' })
          setTimeout(() => {
            dispatch({ type: null })
          }, 6000)
        },
      )
  }

  return (
    <SectionWrapper
      css={styled.Contact}
      altBg={true}
      headerData={{
        title: formData.title || 'Get in Touch',
        description: formData.subTitle || 'Feel free to contact me anytime',
      }}
      {...props}
    >
      <Row>
        <Col xs='12'>
          <Form onSubmit={sendEmail} ref={form}>
            <Row>
              <Form.Group
                className='_group'
                as={Col}
                md='6'
                xs='12'
                controlId='formName'
              >
                <Form.Control
                  type='text'
                  placeholder='Name'
                  name='name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group
                className='_group'
                as={Col}
                md='6'
                xs='12'
                controlId='formEmail'
              >
                <Form.Control
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group
                className='_group'
                as={Col}
                xs='12'
                controlId='formSubject'
              >
                <Form.Control
                  type='text'
                  placeholder='Subject'
                  name='subject'
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group
                className='_group'
                as={Col}
                xs='12'
                controlId='formMessage'
              >
                <Form.Control
                  as='textarea'
                  rows='5'
                  placeholder='Message'
                  name='message'
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Col xs='12'>
                <Button className='_submit' type='submit' {...state.submit} />
                <p className='_feedback' {...state.feedback} />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </SectionWrapper>
  )
}

export default Formulaire
