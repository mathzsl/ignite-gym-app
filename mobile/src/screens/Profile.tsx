import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Avatar } from '@components/Avatar'
import { ScreenHeader } from '@components/ScreenHeader'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(true)

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
            isLoaded={photoIsLoading}
          >
            <Avatar
              source={{ uri: 'https://www.github.com/mathzsl.png' }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          </Skeleton>

          <TouchableOpacity style={{ marginTop: 12, marginBottom: 32 }}>
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
