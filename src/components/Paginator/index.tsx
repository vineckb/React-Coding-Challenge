import { HStack, Select, Text } from "@chakra-ui/react";

interface Props {
  setPage: (page: number) => void;
  page: number;
  pages: number | undefined;
}

export function Paginator({ page, pages = 1, setPage }: Props) {
  return (
    <HStack justifyContent={"flex-end"} mt="24px">
      <Text>Page</Text>
      <Select
        w="90px"
        value={~~page}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setPage(parseInt(e.currentTarget.value))
        }
      >
        {Array.from({
          length: pages || 1,
        }).map((_el, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </Select>
    </HStack>
  );
}
