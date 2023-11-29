import { TouchableOpacity } from 'react-native'
import { HStack, Heading, Text, VStack, Icon } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

import { Avatar } from './Avatar'

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <Avatar
        source={{ uri: 'https://www.github.com/mathzsl.png' }}
        alt="Imagem do usuário"
        size={16}
        mr={4}
      />

      <VStack mr={4} flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading
          color="gray.100"
          fontSize="md"
          numberOfLines={1}
          fontFamily="heading"
        >
          Matheus
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  )
}
