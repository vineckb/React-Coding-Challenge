import Head from "next/head";
import { Box, Heading, HStack, Spinner } from "@chakra-ui/react";
import Template from "@/components/Template";
import { useEffect, useState } from "react";
import { IMessage } from "@/common/types";
import { useMessagesQuery } from "@/services/api";
import MessageModal from "@/components/MessageModal";
import { NewMessageButton } from "@/components/NewMessageButton";
import { Paginator } from "@/components/Paginator";
import { MessagesList } from "@/components/MessagesList";
import { MessagesListItem } from "@/components/MessagesListItem";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const { isLoading, isFetching, data, refetch } = useMessagesQuery(page);

  const [selectedMessage, setSelectedMessage] = useState<IMessage>();

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <>
      <Head>
        <title>RBR Test</title>
      </Head>
      <Template>
        {!!selectedMessage && (
          <MessageModal
            onClose={() => setSelectedMessage(undefined)}
            onRemove={refetch}
            message={selectedMessage}
          />
        )}
        <HStack justifyContent={"space-between"} mb="24px">
          <Heading as="h2" fontSize="24px">
            Messages
            {(isLoading || isFetching) && <Spinner ml={8} />}
          </Heading>
          <Box>
            <NewMessageButton onAdd={refetch} />
          </Box>
        </HStack>

        {data?.items && (
          <MessagesList>
            {data.items.map((message: IMessage) => (
              <MessagesListItem
                key={message._id}
                message={message}
                onClick={setSelectedMessage}
                onRemove={refetch}
              />
            ))}
          </MessagesList>
        )}

        {data?.pages && (
          <Paginator pages={data?.pages} page={page} setPage={setPage} />
        )}
      </Template>
    </>
  );
}
