import React, { useState, Suspense } from 'react'

import {Header, SideBar } from '../components'
import { Outlet } from 'react-router-dom'
import {Box} from '@mui/material'
import SuspenseLoader from '../components/common/SuspenseLoader'


const Main = () => {

  const [openDrawer, setOpenDrawer] = useState(true);

  const toggleDrawer = () => {
    setOpenDrawer(prevState => !prevState);
  }

  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <Box style={{ display: 'flex' }}>
        <SideBar toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
        <Suspense fallback={<SuspenseLoader />}>
          <Outlet context={{ openDrawer}} />
        </Suspense>
      </Box>
    </>
  )
}

export default Main