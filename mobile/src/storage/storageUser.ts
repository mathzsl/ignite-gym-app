import AsyncStorage from '@react-native-async-storage/async-storage'

import { UserDTO } from '@dtos/UserDTO'
import { USER_STORAGE } from './storageConfig'

export async function savedUserStorage(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function getStoredUser() {
  const storage = await AsyncStorage.getItem(USER_STORAGE)
  const storedUser: UserDTO = storage ? JSON.parse(storage) : {}
  return storedUser
}

export async function removeStoredUser() {
  await AsyncStorage.removeItem(USER_STORAGE)
}
