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

type ExerciseCardProps = TouchableOpacityProps & {}

export function ExerciseCard({ ...rest }: ExerciseCardProps) {
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
            uri: 'https://www.origym.com.br/midia/remada-unilateral-3.jpg',
          }}
          alt="Imagem do exercicio"
          w={16}
          h={16}
          rounded="md"
          resizeMode="center"
        />

        <VStack flex={1} ml={4}>
          <Heading color="white" fontSize="lg" numberOfLines={1}>
            Remada unilateral
          </Heading>
          <Text color="gray.200" fontSize="sm" numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
