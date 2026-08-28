export type Chat = {
  role: "user" | "assistant";
  text: string;
  hideInChat?: boolean;
};