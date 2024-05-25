import React, { useState, useEffect, useRef } from 'react'
import { Nav as BSNav, Navbar } from 'react-bootstrap'
import SimpleBar from 'simplebar-react'
import Image from 'next/image'
import authorImg from 'root/public/partials/nav/avatar.jpg'
import styled from './style'
import { fetchNavData } from '../../services/api'

const MobileNav = ({ children }) => {
  const navbarRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const navbarToggleRef = useRef(null)
  const NavbarMenuRef = useRef(null)

  const toggleMobileNav = () => {
    setExpanded((preValue) => !preValue)
  }

  useEffect(() => {
    function handleToggleClick(event) {
      const targetInToggle = navbarToggleRef?.current?.contains(event.target)
      if (!expanded && targetInToggle) {
        toggleMobileNav()
      } else if (expanded) {
        toggleMobileNav()
      }
    }
    document.addEventListener('mouseup', handleToggleClick)
    return () => {
      document.removeEventListener('mouseup', handleToggleClick)
    }
  }, [expanded])

  return (
    <Navbar
      ref={navbarRef}
      expanded={expanded}
      css={styled.MobileNav}
      className='d-md-block d-lg-none'
      variant='dark'
      expand='lg'
      fixed='top'
    >
      <Navbar.Toggle
        className='_toggler'
        ref={navbarToggleRef}
        aria-controls='nav'
      >
        <span>Menu</span>
      </Navbar.Toggle>
      <Navbar.Collapse className='_nav' id='nav'>
        <BSNav ref={NavbarMenuRef} className='me-auto _menu'>
          {children}
        </BSNav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const Sidebar = ({ children, navData }) => (
  <header css={styled.Sidebar}>
    <SimpleBar className='d-none d-lg-flex justify-content-center align-items-center _wrapper'>
      <div>
        <div className='_header'>
          <a style={{ overflow: 'hidden' }} href='#home'>
            <Image
              className='_avatar'
              src={authorImg}
              width={110}
              height={110}
              sizes='110px'
              placeholder='blur'
              alt='Profile avatar'
              priority={true}
            />
          </a>
          <span className='_name'>{navData?.nom || 'Author'}</span>
          <p className='_status'>
            {navData?.avialable || 'Available for work'}
          </p>
        </div>
        <div className='_menu'>
          <div className='_list'>{children}</div>
        </div>
      </div>
    </SimpleBar>
  </header>
)

const Nav = ({ children }) => {
  const [navData, setNavData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchNavData()
        setNavData(data)
      } catch (fetchError) {
        setError(fetchError.message)
      }
    }
    getData()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <MobileNav>{children}</MobileNav>
      <Sidebar navData={navData}>{children}</Sidebar>
    </>
  )
}

export default Nav
