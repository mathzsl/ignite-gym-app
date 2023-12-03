import { ReactNode, createContext, useEffect, useState } from 'react'

import { UserDTO } from '@dtos/UserDTO'

import { api } from '@services/api'
import { savedUserStorage, getStoredUser } from '@storage/storageUser'

type AuthContextType = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

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

  async function loadingUserData() {
    const userStored = await getStoredUser()

    if (userStored) {
      setUser(userStored)
    }
  }

  useEffect(() => {
    loadingUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
