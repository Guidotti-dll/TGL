import React from 'react'
import { NotfoundContainer } from './styles'
import HeaderAuth from '../../components/HeaderAuth'

const NotFoundPage: React.FC = () => {
  return (
    <NotfoundContainer>
      <HeaderAuth />
      <div className='notFound'>
        <h1>Page Not Found</h1>
      </div>
    </NotfoundContainer>
  )
}

export default NotFoundPage
