import AsyncStorage from '@react-native-async-storage/async-storage'

import { AUTH_TOKEN_STORAGE } from '@storage/storageConfig'

type StorageAuthTokenProps = {
  token: string
  refresh_token: string
}

export async function savedAuthTokenStorage({
  token,
  refresh_token,
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    AUTH_TOKEN_STORAGE,
    JSON.stringify({ token, refresh_token }),
  )
}

export async function getStoredAuthToken() {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)
  const { token, refresh_token }: StorageAuthTokenProps = storage
    ? JSON.parse(storage)
    : {}

  return { token, refresh_token }
}

export async function removeStoredAuthToken() {
  AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
