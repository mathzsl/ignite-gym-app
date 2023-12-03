import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import {
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  useTheme,
} from 'native-base'

import { Entypo } from '@expo/vector-icons'

import { ExerciseDTO } from '@dtos/ExerciseDTO'

import { api } from '@services/api'

type ExerciseCardProps = TouchableOpacityProps & {
  data: ExerciseDTO
}

export function ExerciseCard({ data, ...rest }: ExerciseCardProps) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity {...rest}>
      <HStack
        alignItems="center"
        bg="gray.500"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt="Imagem do exercicio"
          w={16}
          h={16}
          rounded="md"
          resizeMode="cover"
        />

        <VStack flex={1} ml={4}>
          <Heading
            color="white"
            fontSize="lg"
            numberOfLines={1}
            fontFamily="heading"
          >
            {data.name}
          </Heading>
          <Text color="gray.200" fontSize="sm" numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
