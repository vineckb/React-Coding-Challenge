import { useRemoveMessageMutation } from "@/services/api";
import { IconButton, useToast } from "@chakra-ui/react";
import { BiTrashAlt } from "react-icons/bi";
import DangerConfirmation from "../ConfirmationModal";

interface Props {
  id: string;
  onRemove: () => void;
}

export function RemoveItemButton({ id, onRemove }: Props) {
  const { isLoading: isRemoving, mutate } = useRemoveMessageMutation();

  const toast = useToast();

  function handleRemove() {
    mutate(id);
    toast({
      status: "success",
      title: "Message removed successfully",
    });

    onRemove();
  }

  return (
    <DangerConfirmation
      button={
        <IconButton
          colorScheme={"red"}
          aria-label="remove"
          icon={<BiTrashAlt />}
          isLoading={isRemoving}
          size="sm"
        />
      }
      action={handleRemove}
    />
  );
}
