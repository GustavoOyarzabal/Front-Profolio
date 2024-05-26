import React from 'react'

const UploadWidget = () => {
  const showWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'dtwacyhiq',
        uploadPreset: 'portfolioMultimedia',
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: true,
        folder: 'portfolioMultimedia',
      },
      (error, result) => {
        if (error) {
          console.error('Upload error:', error)
        } else {
          console.log('Upload result:', result)
          if (result.event === 'success') {
            const imageUrl = result.info.secure_url
            console.log('Image URL:', imageUrl)
            // aca manejo la URL de la imagen, como guardarla en labase de datos
            saveImageUrl(imageUrl)
          }
        }
      },
    )
  }

  const saveImageUrl = async (url) => {
    try {
      const response = await axios.post('/api/saveImageUrl', { url })
      console.log('Image URL saved:', response.data)
    } catch (error) {
      console.error('Error saving image URL:', error)
    }
  }

  return (
    <button
      onClick={showWidget}
      style={{ display: 'none' }} // tengo que hacer esto para ocultar el nuevo espacio que se genera cuando agrego este componente
    >
      Upload Image
    </button>
  )
}

export default UploadWidget
