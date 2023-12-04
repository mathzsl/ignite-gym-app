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

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Avatar } from '@components/Avatar'
import { ScreenHeader } from '@components/ScreenHeader'

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { FileInfo } from 'expo-file-system'

import userPhotoDefault from '@assets/userPhotoDefault.png'

import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'

const PHOTO_SIZE = 33

const profileFormSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().email(),

  old_password: yup.string(),

  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 digitos.')
    .nullable()
    .transform((value) => value || null),

  confirm_new_password: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .oneOf([yup.ref('password')], 'A confirmação de senha não confere.')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .required('Informe a confirmação de senha.')
          .transform((value) => value || null),
    }),
})

type ProfileFormData = yup.InferType<typeof profileFormSchema>

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  const toast = useToast()
  const { user, updateUserProfile } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

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

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        const fileExtension = imagePickerResult.assets[0].uri.split('.').pop()

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLocaleLowerCase(),
          uri: imagePickerResult.assets[0].uri,
          type: `${imagePickerResult.assets[0].type}/${fileExtension}`,
        } as any

        const userPhotoUploadForm = new FormData()
        userPhotoUploadForm.append('avatar', photoFile)

        const { data } = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        const userUpdated = user
        userUpdated.avatar = data.avatar
        updateUserProfile(userUpdated)

        toast.show({
          title: 'Foto atualizada!',
          placement: 'top',
          bgColor: 'green.500',
        })
      }
    } catch (error) {
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleUpdateProfile(data: ProfileFormData) {
    try {
      setIsUpdating(true)

      const userUpdated = user
      userUpdated.name = data.name

      await api.put('/users', {
        name: data.name,
        password: data.password,
        old_password: data.old_password,
      })

      await updateUserProfile(userUpdated)

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível atualizar o seu perfil. Tente novamente mais tarde!'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsUpdating(false)
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
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : userPhotoDefault
              }
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

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
            name="name"
          />

          <Controller
            control={control}
            render={({ field: { value } }) => (
              <Input
                placeholder="E-mail"
                bg="gray.600"
                value={value}
                isDisabled
              />
            )}
            name="email"
          />

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

          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha antiga"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
            name="old_password"
          />

          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nova senha"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
            name="password"
          />

          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirme a nova senha"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_new_password?.message}
              />
            )}
            name="confirm_new_password"
          />

          <Button
            title="Atualizar"
            mt={5}
            isLoading={isUpdating}
            onPress={handleSubmit(handleUpdateProfile)}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
