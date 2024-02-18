import {  Button, Drawer, DrawerOverlay, DrawerContent, Text, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, HStack, Avatar, Heading, VStack } from "@chakra-ui/react"
import { Product } from "../type/Product";

type ViewDetailProps = {
    isOpen:boolean;
    onClose:()=> void;
    currentData:Product;
}

const ProductView = ({
    isOpen,onClose,currentData
}:ViewDetailProps) => {
  return (      
          <>            
            <Drawer
              isOpen={isOpen}
              placement='right'
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Details - {currentData.name}</DrawerHeader>
      
                <DrawerBody>
                <HStack>
                    <Avatar name={currentData.name} size={'lg'}/>
                    <VStack alignItems={'self-start'}>
                    <Heading fontSize={16}>
                        {currentData.name}
                    </Heading>
                    <Heading fontSize={18}>
                        <span>&#8377; </span>
                        {currentData.price}
                    </Heading>
                    <Text>
                        {currentData.description}
                    </Text>
                 </VStack>
                    
                  </HStack>
                 
                </DrawerBody>
      
                <DrawerFooter>
                  <Button variant='outline' mr={3} onClick={onClose}>
                    Close
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>     
  )
}

export default ProductView