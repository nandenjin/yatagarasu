import '@/assets/css/App.scss'
import { useAppSelector } from '@/hooks'
import { AuthStatus, provider } from '@/store/auth'
import {
  getAuth,
  signInWithPopup,
  signOut as signOutFirebase,
} from 'firebase/auth'

export const App: React.FC = () => {
  const auth = getAuth()
  const signIn = () => {
    signInWithPopup(auth, provider)
  }
  const signOut = () => {
    signOutFirebase(auth)
  }
  const authStatus = useAppSelector((state) => state.auth.status)

  const displayName = useAppSelector((state) => state.auth.displayName)
  return (
    <div>
      {authStatus === AuthStatus.LOGGED_IN ? (
        <button onClick={signOut}>{displayName || 'Unknown user'}</button>
      ) : authStatus === AuthStatus.LOGGED_OUT ? (
        <button onClick={signIn}>signIn</button>
      ) : authStatus === AuthStatus.LOADING ? (
        'Loading...'
      ) : (
        ''
      )}
    </div>
  )
}
