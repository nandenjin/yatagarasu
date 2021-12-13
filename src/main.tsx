import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '@/assets/css/index.scss'
import { App } from '@/components/App'
import { initializeApp, getApps } from 'firebase/app'
import consola from 'consola'
import { store } from './store'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { authSlice } from './store/auth'

if (getApps().length === 0) {
  const firebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG
  if (!firebaseConfig) {
    consola.error(
      'No firebase config found. Set VITE_FIREBASE_CONFIG in .env.local'
    )
  }
  initializeApp(JSON.parse(firebaseConfig as string))
}

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      authSlice.actions.setUser({
        uid: user.uid,
        email: user.email || undefined,
        displayName: user.displayName || undefined,
        photoURL: user.photoURL || undefined,
      })
    )
  } else {
    store.dispatch(authSlice.actions.setUser(null))
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
