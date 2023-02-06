import { Button, useDisclosure } from "@chakra-ui/react";
import { NewMessageModal } from "../NewMessageModal";

interface Props {
  onAdd: () => void;
}

export function NewMessageButton({ onAdd }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        New Message
      </Button>

      {isOpen && <NewMessageModal onClose={onClose} onSave={onAdd} />}
    </>
  );
}
