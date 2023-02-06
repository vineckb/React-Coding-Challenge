import { IMessagePayload } from "@/common/types";
import React from "react";
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
  useMutation,
} from "react-query";
import * as fakeApi from "./mock";

interface Props {
  children: React.ReactNode;
}

export const apiClient = new QueryClient();

export function ApiProvider({ children }: Props) {
  React.useEffect(() => {
    fakeApi.startFakeApi();
  }, []);

  return (
    <QueryClientProvider client={apiClient}>{children}</QueryClientProvider>
  );
}

export function useMessagesQuery(page?: number, limit?: number) {
  return useQuery("messages", () => fakeApi.listMessages(page, limit));
}

export function useCreateMessageMutation() {
  return useMutation((message: IMessagePayload) =>
    fakeApi.createMessage(message)
  );
}

export function useRemoveMessageMutation() {
  return useMutation((id: string) => fakeApi.removeMessage(id));
}
