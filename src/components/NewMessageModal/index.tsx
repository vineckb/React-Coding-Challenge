import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Modal,
  useToast,
} from "@chakra-ui/react";
import { useCreateMessageMutation } from "@/services/api";

interface Props {
  onClose: () => void;
  onSave: () => void;
}

export function NewMessageModal({ onClose, onSave }: Props) {
  const toast = useToast();
  const { isLoading, mutateAsync } = useCreateMessageMutation();
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
    await mutateAsync({
      message: content,
      subject,
      user: { email: recipient },
    });
    toast({
      status: "success",
      title: "Message sent successfully",
    });
    onSave();
    onClose();
  }

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={"800px"}>
        <ModalHeader>New message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="24px">
            <FormLabel>Subject</FormLabel>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Recipient</FormLabel>
            <Input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="someone@mail.com"
            />
          </FormControl>
          <FormControl mt="24px">
            <FormLabel>My message</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            isDisabled={!subject || !recipient || !content}
            colorScheme="blue"
            isLoading={isLoading}
          >
            Send message
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
