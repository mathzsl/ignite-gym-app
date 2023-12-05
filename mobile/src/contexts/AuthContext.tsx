import { ReactNode, createContext, useEffect, useState } from 'react'

import { UserDTO } from '@dtos/UserDTO'

import { api } from '@services/api'

import {
  savedUserStorage,
  getStoredUser,
  removeStoredUser,
} from '@storage/storageUser'

import {
  getStoredAuthToken,
  removeStoredAuthToken,
  savedAuthTokenStorage,
} from '@storage/storageAuthToken'

type AuthContextType = {
  user: UserDTO
  isLoadingStoredUserData: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUserProfile: (user: UserDTO) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingStoredUserData, setIsLoadingStoredUserData] = useState(true)

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
  }

  async function savedUserAndTokenToStorage(
    userData: UserDTO,
    token: string,
    refresh_token: string,
  ) {
    try {
      setIsLoadingStoredUserData(true)

      await savedUserStorage(userData)
      await savedAuthTokenStorage({ token, refresh_token })
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStoredUserData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      })

      if (data.user && data.token && data.refresh_token) {
        await savedUserAndTokenToStorage(
          data.user,
          data.token,
          data.refresh_token,
        )
        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStoredUserData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingStoredUserData(true)
      setUser({} as UserDTO)
      await removeStoredUser()
      await removeStoredAuthToken()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStoredUserData(false)
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated)
      await savedUserStorage(userUpdated)
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingStoredUserData(true)

      const userStored = await getStoredUser()
      const { token } = await getStoredAuthToken()

      if (token && userStored) {
        userAndTokenUpdate(userStored, token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStoredUserData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingStoredUserData,
        signIn,
        signOut,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
