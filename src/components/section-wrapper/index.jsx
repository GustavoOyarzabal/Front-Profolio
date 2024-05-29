import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import { cx } from '@emotion/css'
import styled from './style'

// Muestra el encabezado de una sección incluyendo un título y una descripción
const SectionHeader = (props) => {
  const { title, description } = props
  return (
    <Row>
      <Col xs='12'>
        <div css={styled.SectionHeader}>
          <h1 className='_section-title'>{title}</h1>
          <p className='_section-description'>{description}</p>
        </div>
      </Col>
    </Row>
  )
}

// Usado para mostrar una imagen de fondo para las secciones
export const ImageTemplate = (props) => {
  const { brightness = '100%', alt, ...otherProps } = props
  return (
    <Image
      alt={alt}
      style={{
        objectFit: 'cover',
        height: '100%',
        width: '100%',
        filter: `brightness(${brightness})`,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      sizes='100vw'
      {...otherProps}
      width={1920} // Añadir el ancho correcto
      height={1080} // Añadir la altura correcta
    />
  )
}

// Muestra una sección con todas sus características necesarias
const SectionWrapper = (props) => {
  const {
    Root = 'section',
    innerRef,
    altBg,
    headerData,
    containerProps,
    children,
    className,
    backgroundProps,
    ...otherProps
  } = props
  return (
    <Root
      css={styled.SectionWrapper}
      className={cx(className, {
        '--alt-bg': altBg, // Usa un color de fondo alternativo si se pasa el prop altBg
      })}
      ref={innerRef}
      {...otherProps}
    >
      {/* Solo mostrar el encabezado de la sección cuando se pasa headerData */}
      {headerData != null && (
        <Container>
          <SectionHeader
            title={headerData.title}
            description={headerData.description}
          />
        </Container>
      )}

      {/* Solo mostrar la imagen de fondo cuando se pasa backgroundProps */}
      {backgroundProps != null && <ImageTemplate {...backgroundProps} />}

      <Container {...containerProps}>{children}</Container>
    </Root>
  )
}

export default SectionWrapper
