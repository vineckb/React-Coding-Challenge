import { IMessage, IMessagePayload } from "@/common/types";
import { v4 as uuidv4 } from "uuid";

export const startFakeApi = (): void => {
  if (localStorage.getItem("messages")) return;

  localStorage.setItem(
    "messages",
    JSON.stringify([
      {
        _id: uuidv4(),
        user: {
          email: "john@doe.com",
        },
        message: "Just saying happy new year to all my loved friends.",
        subject: "Happy new Year",
        createdAt: "2023-01-01T03:45:20",
      },
      {
        _id: uuidv4(),
        user: {
          email: "jen@aniston.com",
        },
        message: "Just saying happy new year to all my loved friends.",
        subject: "Happy new Year",
        createdAt: "2023-01-01T01:23:20",
      },
      {
        _id: uuidv4(),
        user: {
          email: "john@doe.com",
        },
        message: "Just saying merry christmas to all my loved friends.",
        subject: "Merry Christmas",
        createdAt: "2022-12-25T15:03:25",
      },
    ])
  );
};

const getMessagesFromStorage = (): IMessage[] => {
  const savedMessages = localStorage.getItem("messages");
  const parsedMessages = savedMessages ? JSON.parse(savedMessages) : [];

  return parsedMessages;
};
const setMessagesInStorage = (messages: IMessage[]): void => {
  localStorage.setItem("messages", JSON.stringify(messages));
};

const simulateLoading = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

interface PaginatedResponse<DataType> {
  items: DataType[];
  total: number;
  pages: number;
  page: number;
}

export async function listMessages(
  page = 1,
  maxPerPage = 10
): Promise<PaginatedResponse<IMessage>> {
  await simulateLoading();

  const savedMessages = localStorage.getItem("messages");
  const parsedMessages = savedMessages ? JSON.parse(savedMessages) : [];

  const items = parsedMessages.slice(
    (page - 1) * maxPerPage,
    page * maxPerPage
  );

  const response = {
    pages: Math.ceil(items.length / maxPerPage),
    page: 1,
    total: items.length,
    items,
  };

  return response;
}

export async function createMessage(
  message: IMessagePayload
): Promise<IMessage> {
  await simulateLoading();

  const newMessage = {
    ...message,
    _id: uuidv4(),
    createdAt: new Date().toISOString(),
  };

  const messages = getMessagesFromStorage();
  setMessagesInStorage([newMessage, ...messages]);

  return newMessage;
}

export const getMessage = async (messageId: string): Promise<IMessage> => {
  await simulateLoading();

  const messages = getMessagesFromStorage();

  const message = messages.find((m) => m._id === messageId);

  if (!message) {
    throw `Cant find message with id ${messageId}`;
  }

  return message;
};

export const removeMessage = async (messageId: string): Promise<boolean> => {
  await simulateLoading();

  let messages = getMessagesFromStorage();
  const initialLength = messages.length;

  messages = messages.filter((m) => m._id !== messageId);

  if (messages.length === initialLength) return false;

  setMessagesInStorage(messages);

  return true;
};
