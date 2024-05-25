import axios from 'axios'

const fetchAboutData = async () => {
  const response = await axios.get('http://localhost:3001/api/portfolios/about')
  return response.data
}

const fetchNavData = async () => {
  const response = await axios.get('http://localhost:3001/api/portfolios/nav')
  return response.data
}

const fetchServiceData = async () => {
  const response = await axios.get(
    'http://localhost:3001/api/portfolios/service',
  )
  return response.data
}
const fetchFooterData = async () => {
  const response = await axios.get(
    'http://localhost:3001/api/portfolios/footer',
  )
  return response.data
}
const fetchFormData = async () => {
  const response = await axios.get('http://localhost:3001/api/portfolios/form')
  return response.data
}
const fetchHireData = async () => {
  const response = await axios.get('http://localhost:3001/api/portfolios/hire')
  return response.data
}
const fetchPresentationData = async () => {
  const response = await axios.get(
    'http://localhost:3001/api/portfolios/presentation',
  )
  return response.data
}
export {
  fetchAboutData,
  fetchNavData,
  fetchServiceData,
  fetchFooterData,
  fetchFormData,
  fetchHireData,
  fetchPresentationData,
}

// //import axios from 'axios'

// const API_URL = 'localhost:3001/api/portfolios'

// export const fetchAboutData = async () => {
//   try {
//     debugger
//     const response = await fetch('localhost:3001/api/portfolios/about')
//     return response.data
//   } catch (error) {
//     console.error('Failed to fetch about data:', error)
//     throw error
//   }
// }

// export default fetchAboutData
