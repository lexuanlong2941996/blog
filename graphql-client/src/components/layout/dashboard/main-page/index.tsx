import {
    Box,
    Flex,
    Grid,
    SimpleGrid,
    Text,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    Progress,
    useColorModeValue,
} from "@chakra-ui/react"
import { FcMenu } from "react-icons/fc"

import BarChart from "../../../elements/BarChart"
import LineChart from "../../../elements/LineChart"

const MainIndex: React.FC = () => {
    const bgColor = useColorModeValue("white", "gray.800")
    const textColor = useColorModeValue("gray.800", "white")
    return (
        <>
            {/* Summary */}
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
                <Box bg={bgColor} p="4" borderRadius="10px">
                    <Flex flexDirection="row" align="center" justify="center" w="100%">
                        <Stat me="auto">
                            <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                                HAHA
                            </StatLabel>
                            <Flex>
                                <StatNumber fontSize="lg" color={textColor}>
                                    10000
                                </StatNumber>
                                <StatHelpText
                                    alignSelf="flex-end"
                                    justifySelf="flex-end"
                                    m="0px"
                                    color="green.400"
                                    fontWeight="bold"
                                    ps="3px"
                                    fontSize="md"
                                >
                                    100%
                                </StatHelpText>
                            </Flex>
                        </Stat>
                        <Box bg="red.100" p="3" borderRadius="10px">
                            <FcMenu />
                        </Box>
                    </Flex>
                </Box>
                <Box bg={bgColor} p="4" borderRadius="10px">
                    <Flex flexDirection="row" align="center" justify="center" w="100%">
                        <Stat me="auto">
                            <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                                HAHA
                            </StatLabel>
                            <Flex>
                                <StatNumber fontSize="lg" color={textColor}>
                                    10000
                                </StatNumber>
                                <StatHelpText
                                    alignSelf="flex-end"
                                    justifySelf="flex-end"
                                    m="0px"
                                    color="green.400"
                                    fontWeight="bold"
                                    ps="3px"
                                    fontSize="md"
                                >
                                    100%
                                </StatHelpText>
                            </Flex>
                        </Stat>
                        <Box bg="red.100" p="3" borderRadius="10px">
                            <FcMenu />
                        </Box>
                    </Flex>
                </Box>
                <Box bg={bgColor} p="4" borderRadius="10px">
                    <Flex flexDirection="row" align="center" justify="center" w="100%">
                        <Stat me="auto">
                            <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                                HAHA
                            </StatLabel>
                            <Flex>
                                <StatNumber fontSize="lg" color={textColor}>
                                    10000
                                </StatNumber>
                                <StatHelpText
                                    alignSelf="flex-end"
                                    justifySelf="flex-end"
                                    m="0px"
                                    color="green.400"
                                    fontWeight="bold"
                                    ps="3px"
                                    fontSize="md"
                                >
                                    100%
                                </StatHelpText>
                            </Flex>
                        </Stat>
                        <Box bg="red.100" p="3" borderRadius="10px">
                            <FcMenu />
                        </Box>
                    </Flex>
                </Box>
                <Box bg={bgColor} p="4" borderRadius="10px">
                    <Flex flexDirection="row" align="center" justify="center" w="100%">
                        <Stat me="auto">
                            <StatLabel fontSize="sm" color="gray.400" fontWeight="bold" pb=".1rem">
                                HAHA
                            </StatLabel>
                            <Flex>
                                <StatNumber fontSize="lg" color={textColor}>
                                    10000
                                </StatNumber>
                                <StatHelpText
                                    alignSelf="flex-end"
                                    justifySelf="flex-end"
                                    m="0px"
                                    color="green.400"
                                    fontWeight="bold"
                                    ps="3px"
                                    fontSize="md"
                                >
                                    100%
                                </StatHelpText>
                            </Flex>
                        </Stat>
                        <Box bg="red.100" p="3" borderRadius="10px">
                            <FcMenu />
                        </Box>
                    </Flex>
                </Box>
            </SimpleGrid>

            {/* Chart */}
            <Grid
                templateColumns={{ sm: "1fr", lg: "1fr 2fr" }}
                templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
                gap="4"
            >
                <Box
                    bg={bgColor}
                    p="4"
                    borderRadius="15px"
                    mt="5"
                >
                    TRAFFIC
                    <BarChart />
                    <Flex direction="column" my="10" alignSelf="flex-start">
                        <Text fontSize="lg" color="green.400" fontWeight="bold">
                            HAHA
                        </Text>
                        <Text fontSize="md" fontWeight="medium" color="gray.400">
                            <Text as="span" color="green.400" fontWeight="bold">
                                100%
                            </Text>{" "}
                            than last week
                        </Text>
                    </Flex>
                    <SimpleGrid gap={{ sm: "12px" }} columns={4}>
                        <Flex direction="column">
                            <Flex alignItems="center">
                                <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                                    HOHO
                                </Text>
                            </Flex>
                            <Text fontSize="lg" color="green.400" fontWeight="bold" my="6px">
                                HIHI
                            </Text>
                            <Progress colorScheme="teal" borderRadius="12px" h="5px" value={50} />
                        </Flex>
                    </SimpleGrid>
                </Box>
                <Box bg={bgColor} p="4" borderRadius="15px" mt="5">
                    TRAFFIC
                    <LineChart />
                </Box>
            </Grid>
        </>
    )
}

export default MainIndex
