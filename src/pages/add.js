import { useState } from 'react'
import axios from 'axios'

const AddAbout = () => {
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: '',
    subDescription: '',
    github: '',
    email: '',
    tel: '',
    downloadCv: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3002/api/portfolios/about', formData)
      alert('Data added successfully')
    } catch (error) {
      console.error('Error adding data:', error)
      alert('Failed to add data')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        value={formData.title}
        onChange={handleChange}
        placeholder='Title'
        required
      />
      <input
        type='text'
        name='subTitle'
        value={formData.subTitle}
        onChange={handleChange}
        placeholder='SubTitle'
        required
      />
      <textarea
        name='description'
        value={formData.description}
        onChange={handleChange}
        placeholder='Description'
        required
      ></textarea>
      <textarea
        name='subDescription'
        value={formData.subDescription}
        onChange={handleChange}
        placeholder='SubDescription'
        required
      ></textarea>
      <input
        type='text'
        name='github'
        value={formData.github}
        onChange={handleChange}
        placeholder='Github'
        required
      />
      <input
        type='email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        placeholder='Email'
        required
      />
      <input
        type='tel'
        name='tel'
        value={formData.tel}
        onChange={handleChange}
        placeholder='Tel'
        required
      />
      <input
        type='text'
        name='downloadCv'
        value={formData.downloadCv}
        onChange={handleChange}
        placeholder='Download CV'
        required
      />
      <button type='submit'>Add</button>
    </form>
  )
}

export default AddAbout
