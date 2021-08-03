import PropTypes from 'prop-types'
import React from 'react'

import {
  Footer,
  FooterText,
  Logo,
  LogoLine,
  LogoText,
  ScrollView,
} from './styles'

const AuthContainer: React.FC = ({ children }) => {
  return (
    <>
      <ScrollView>
        <Logo>
          <LogoText>TGL</LogoText>
          <LogoLine />
        </Logo>
        {children}
      </ScrollView>
      <Footer>
        <FooterText>Copyright 2020 Luby Software</FooterText>
      </Footer>
    </>
  )
}

AuthContainer.propTypes = {
  children: PropTypes.node,
}

export default AuthContainer
