import React from 'react'
import { AccountContainer } from './styles'
import Input from '../../components/Input'
import { useSelector } from 'react-redux'
import { AuthState } from '../../store/ducks/Auth'
import { AppStore } from '../../store'

const AccountPage: React.FC = () => {
  const { user } = useSelector<AppStore, AuthState>(state => state.Auth)
  return (
    <AccountContainer>
      <div className='profile'>
        <h1>My infos</h1>

        <div className='infos'>
          <Input name='name' type='text' value={user.name} />
          <Input name='email' type='email' value={user.email} />
          <button>Update</button>
        </div>
      </div>
    </AccountContainer>
  )
}

export default AccountPage
