import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, VStack, Textarea, Switch, useToast, Input } from "@chakra-ui/react"
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../constants";
import { Product } from "../type/Product";

type ProductFormProp = {
    isOpen:boolean;
    onClose:()=>void;
    fetchProduct:()=>void;
    currentData:Product
}
const ProductForm = ({ isOpen, onClose, fetchProduct, currentData }:ProductFormProp) => {

  const toast = useToast();
    const [product,setProduct] = useState({
      id: currentData?.id || 0,
      name: currentData?.name || '',
      description: currentData?.description || '',
      price: currentData?.price || 0,
      isInStore: currentData?.isInStore || false
    })
    const onSave = () =>{
      console.log(currentData);
      
      if(currentData.id > 0 ){
        updateProduct();
      }
      else{
        addProduct();
      }
    }
    const addProduct = () =>{
      axios.post(BASE_URL+"product",product).then(() =>{
        onClose();
        fetchProduct();
        toast({
          title:'Product Added',
          description:'Product Added Successfully',
          isClosable:true,
          duration:1000
        })
      }).catch((err)=>{
        console.log(err);
                
      })
    }
    const updateProduct = () =>{
      axios.put(BASE_URL+"product/" + currentData?.id,product).then(() =>{
        onClose();
        fetchProduct();
        toast({
          title:'Product Updated',
          description:'Product Updated Successfully',
          isClosable:true,
          duration:1000
        })
      }).catch((err)=>{
        console.log(err);
              
      })
    }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader shadow={'sm'}>Add Product</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack gap={4} alignItems={'self-start'}>
            <Input type="text" placeholder="Name"
            value={product.name} onChange={(e) => setProduct({...product,name:e.target.value})} />
            <Textarea placeholder="Product Description"
            value={product.description} onChange={(e) => setProduct({...product,description:e.target.value})} />
            <Input type="number" placeholder="Price"
            value={product.price} onChange={(e) => setProduct({...product,price: parseInt(e.target.value)})} />
            <Text>
                Is In Store?
            </Text>
            <Switch isChecked={product.isInStore} onChange={(e) => setProduct({...product,isInStore:e.target.checked})} />
        </VStack>
      </ModalBody>

      <ModalFooter>
        <Button variant='ghost' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button onClick={onSave} colorScheme="blue">Save</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default ProductForm