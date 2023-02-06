import { Avatar, HStack, Td, Text, Tr } from "@chakra-ui/react";
import { IMessage } from "@/common/types";
import { RemoveItemButton } from "../RemoveItemButton";

interface Props {
  message: IMessage;
  onClick: (message: IMessage) => void;
  onRemove: () => void;
}

const convertAmPm = (date: string): string => {
  const dt = new Date(date);
  let hours = dt.getHours();
  const AmOrPm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  const minutes = dt.getMinutes();
  const finalTime = hours + ":" + minutes + " " + AmOrPm;
  return finalTime;
};

export function MessagesListItem({ message, onClick, onRemove }: Props) {
  return (
    <Tr
      key={message._id}
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      onClick={() => onClick(message)}
    >
      <Td>
        <HStack spacing="16px">
          <Avatar name={message.user.email} />
          <Text>{message.user.email}</Text>
        </HStack>
      </Td>
      <Td w="100%" fontWeight={"600"}>
        {message.subject}
      </Td>
      <Td whiteSpace={"nowrap"}>
        {message.createdAt.substring(0, 10)} at {convertAmPm(message.createdAt)}
      </Td>
      <Td>
        <RemoveItemButton id={message._id} onRemove={onRemove} />
      </Td>
    </Tr>
  );
}
