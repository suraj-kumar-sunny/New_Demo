import { AddIcon } from "@chakra-ui/icons"
import { Flex, Box, Text, Heading, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Badge, Skeleton, HStack, SkeletonCircle } from "@chakra-ui/react"

function ProductSkelton() { 
  return (
    <Box
    shadow={'md'}
    rounded={'md'}
    m={32}
    >
      <Flex
      px={5}
      justifyContent={'space-between'}
      alignItems={'center'}
      mb={5}
      >
        <Heading>
          <Skeleton>
          Product List
          </Skeleton>
        </Heading>
          <Skeleton>
        <Button colorScheme='blue' leftIcon={<AddIcon />}>
            Add Product
        </Button>
            </Skeleton>
      </Flex>
         <TableContainer>
  <Table variant='striped'>
    <Thead>
      <Tr>
        <Th><Skeleton>Id</Skeleton></Th>
        <Th><Skeleton>Name</Skeleton></Th>
        <Th><Skeleton>Description</Skeleton></Th>
        <Th><Skeleton>Is In Store</Skeleton></Th>
        <Th isNumeric><Skeleton>Price</Skeleton></Th>
        <Th><Skeleton>Action</Skeleton></Th>
      </Tr>
    </Thead>
    <Tbody>
      {Array.from({length:5}).map((_,index)=>(
        <Tr key={index}>
          <Td><Skeleton>01</Skeleton></Td>
          <Td>
          <HStack>
              <SkeletonCircle>AD</SkeletonCircle>
              <Text> <Skeleton>Product Name</Skeleton></Text>
            </HStack>
           </Td>
          <Td><Skeleton>Product Description</Skeleton></Td>
          <Td>
            <Badge>
            <Skeleton>yes</Skeleton>
            </Badge>
          </Td>
          <Td isNumeric><Skeleton>120</Skeleton></Td>
          <Td><HStack>
            <SkeletonCircle>1</SkeletonCircle>
            <SkeletonCircle>1</SkeletonCircle>
            <SkeletonCircle>1</SkeletonCircle>
            </HStack>
            </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
</TableContainer>
    </Box>
  )
}

export default ProductSkelton