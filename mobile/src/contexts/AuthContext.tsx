import { ReactNode, createContext, useEffect, useState } from 'react'

import { UserDTO } from '@dtos/UserDTO'

import { api } from '@services/api'
import {
  savedUserStorage,
  getStoredUser,
  removeStoredUser,
} from '@storage/storageUser'

type AuthContextType = {
  user: UserDTO
  isLoadingStoredUserData: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingStoredUserData, setIsLoadingStoredUserData] = useState(true)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      })

      if (data.user) {
        setUser(data.user)
        savedUserStorage(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingStoredUserData(true)
      setUser({} as UserDTO)
      await removeStoredUser()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStoredUserData(false)
    }
  }

  async function loadingUserData() {
    try {
      const userStored = await getStoredUser()

      if (userStored) {
        setUser(userStored)
      }
    } catch (error) {
    } finally {
      setIsLoadingStoredUserData(false)
    }
  }

  useEffect(() => {
    loadingUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoadingStoredUserData, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
