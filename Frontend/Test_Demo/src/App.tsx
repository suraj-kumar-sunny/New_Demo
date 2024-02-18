import { TableContainer, Text, Table, Thead, Tr, Th, Tbody, Td, Box, Flex, Heading, Button, HStack, Avatar, Badge, useDisclosure, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, PopoverFooter, useToast } from '@chakra-ui/react'
import './App.css'
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { BASE_URL } from './constants'
import { useEffect, useState } from 'react'
import { Product } from './type/Product'
import ProductSkelton from './Components/ProductSkelton'
import ProductForm from './Components/ProductForm'
import ProductView from './Components/ProductView'

function App() {
  
const {isOpen,onClose, onOpen } = useDisclosure();
const {isOpen:viewDialogOpen,onClose:viewDialogClose,onOpen:onViewDialogOpen} = useDisclosure();
const [data,setData] = useState<Product[]>([]);
const [IsLoading, setIsLoading] = useState(false);
const [currentData,setCurrentData] = useState<Product>({} as Product);
const toast = useToast();


useEffect(()=>{
  fetchData();
},[])

const getProduct = (id:number) =>{
  axios.get<Product>(BASE_URL+"product/"+ id)
  .then((res)=>{
    setCurrentData(res.data);
    onOpen();
  }).catch((err)=>{
    console.log(err);
    
  })
}

const handleAdd = () =>{
  onOpen();
  setCurrentData({} as Product);
}

const handleDelete = (id:number) =>{
  axios.delete(BASE_URL+"product/"+ id)
  .then(()=>{
    toast({
      title:'Product Delete',
      description:'Product has been deleted successfully.',
      isClosable:true,
      duration:1000
    })
    fetchData();
  }).catch((err)=>{
    toast({
      title:'Error while deleting.',
      description:err,
      isClosable:true,
      duration:1000
    })
  })
}

const handleProductView = (id:number) =>{
  axios.get<Product>(BASE_URL+"product/"+id)
  .then((res)=>{
    setCurrentData(res.data);
    onViewDialogOpen();
  }).catch((err)=>{
    console.log(err);    
  })
}

const fetchData = () =>{
  setIsLoading(true);
  axios.get(BASE_URL + "product").then((response) =>{
    setData(response.data);
  }).catch((error)=>{
    console.log(error);
  }).finally(()=>{
    setIsLoading(false);
  })
}

if(IsLoading) return <ProductSkelton />
  return (
    
    <Box shadow={"md"} rounded={"md"} m={10}>
      <Flex px={5} justifyContent={"space-between"} alignItems={"center"} mb={5}>
        <Heading fontSize={20}>Product List</Heading>
        <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={() => handleAdd()}>Add Product</Button>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th fontSize={16}>Id</Th>
              <Th fontSize={16}>Name</Th>
              <Th fontSize={16}>Description</Th>
              <Th fontSize={16}>Is In Store</Th>
              <Th fontSize={16} isNumeric>
                Price
              </Th>
              <Th fontSize={16}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((product: Product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>
                  <HStack>
                    <Avatar size="sm" name={product.name} />
                    <Text>{product.name}</Text>
                  </HStack>
                </Td>
                <Td>{product.description}</Td>
                <Td>
                  <Badge>
                    {product.isInStore ? "Available" : "Not Available"}
                  </Badge>
                </Td>
                <Td isNumeric>{product.price}</Td>
                <Td>
                  <HStack gap={3}>
                    <EditIcon boxSize={22} onClick={() => getProduct(product.id)} color={"blue"} />
                    <Popover>
                      <PopoverTrigger>
                        <DeleteIcon boxSize={22} color={"red"} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody>
                          Are you sure you want to delete?
                        </PopoverBody>
                        <PopoverFooter>
                          <Button colorScheme='red' float={'right'} onClick={()=>handleDelete(product.id)}>Delete</Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                    <ViewIcon onClick={()=>handleProductView(product.id)} boxSize={22} color={"green"} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {data.length == 0 && (
        <Heading textAlign={"center"} p={5} fontSize={14}>
          No Data
        </Heading>
      )}
      {isOpen && (
        <ProductForm
          currentData={currentData}
          isOpen={isOpen}
          onClose={onClose}
          fetchProduct={fetchData}
        />
      )}
      {viewDialogOpen && <ProductView 
      isOpen={viewDialogOpen}
      onClose={viewDialogClose}
      currentData={currentData}
      />}
    </Box>
  );
}

export default App
