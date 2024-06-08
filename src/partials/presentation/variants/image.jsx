import React from 'react'
import { ImageTemplate } from 'root/src/components/section-wrapper'

const ImageVariant = () => (
  <ImageTemplate
    alt='Hero background'
    src='https://res.cloudinary/lzsmkwi1pnw72gymezuy.png'
    width={1920}
    height={1080}
    brightness='32%'
    priority
  />
)

export default ImageVariant
