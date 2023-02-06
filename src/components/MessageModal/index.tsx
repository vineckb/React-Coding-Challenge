import {
  Avatar,
  Button,
  Heading,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { IMessage } from "@/common/types";
import DangerConfirmation from "@/components/ConfirmationModal";
import { useRemoveMessageMutation } from "@/services/api";

interface Props {
  message: IMessage;
  onClose: () => void;
  onRemove: () => void;
}

export default function MessageModal({ message, onClose, onRemove }: Props) {
  const { mutateAsync } = useRemoveMessageMutation();

  const handleRemove = async (): Promise<void> => {
    if (!message) return;
    await mutateAsync(message._id);
    onRemove();

    onClose();
  };
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={"500px"}>
        <ModalHeader>
          <HStack spacing="16px">
            <Avatar name={message?.user.email} />
            <Text>{message?.user.email}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading as="h2" fontSize="20px">
            {message?.subject}
          </Heading>
          <Text mt="24px">{message?.message}</Text>
        </ModalBody>

        <ModalFooter mt={"32px"}>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <DangerConfirmation
            action={handleRemove}
            button={<Button colorScheme={"red"}>Remove message</Button>}
          ></DangerConfirmation>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
