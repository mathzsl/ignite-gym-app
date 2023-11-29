import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import {
  Center,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Avatar } from '@components/Avatar'
import { ScreenHeader } from '@components/ScreenHeader'

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { FileInfo } from 'expo-file-system'

import userPhotoDefault from '@assets/userPhotoDefault.png'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<null | string>(null)

  const toast = useToast()

  async function handleSelectPickImage() {
    setPhotoIsLoading(true)

    try {
      const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })

      if (imagePickerResult.canceled) {
        return null
      }

      if (!imagePickerResult.canceled) {
        const photoInfo = (await FileSystem.getInfoAsync(
          imagePickerResult.assets[0].uri,
        )) as FileInfo

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 1) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        setSelectedImage(imagePickerResult.assets[0].uri)
      }
    } catch (error) {
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Center mt={6} px={10} mb={9}>
          <Skeleton
            w={PHOTO_SIZE}
            h={PHOTO_SIZE}
            rounded="full"
            startColor="gray.500"
            endColor="gray.400"
            isLoaded={!photoIsLoading}
          >
            <Avatar
              source={selectedImage ? { uri: selectedImage } : userPhotoDefault}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          </Skeleton>

          <TouchableOpacity
            style={{ marginTop: 12, marginBottom: 32 }}
            onPress={handleSelectPickImage}
          >
            <Text fontWeight="bold" fontSize="md" color="green.500">
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg="gray.600" />

          <Input bg="gray.600" value="maths.soares99@gmail.com" isDisabled />

          <Text
            fontSize="md"
            color="gray.200"
            fontWeight="bold"
            mt={12}
            mb={2}
            alignSelf="flex-start"
          >
            Alterar senha
          </Text>

          <Input placeholder="Senha antiga" bg="gray.600" secureTextEntry />

          <Input placeholder="Nova antiga" bg="gray.600" secureTextEntry />

          <Input
            placeholder="Confirme a nova senha"
            bg="gray.600"
            secureTextEntry
          />

          <Button title="Atualizar" mt={5} />
        </Center>
      </ScrollView>
    </VStack>
  )
}
