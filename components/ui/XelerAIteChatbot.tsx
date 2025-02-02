"use client";

import React, { useState, FormEvent } from "react";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter
} from "./expandable-chat";
import { ChatMessageList } from "./chat-message-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "./chat-bubble";
import { ChatInput } from "./chat-input";
import { Button } from "./button";

interface ChatMessage {
  id: number;
  content: string;
  sender: "user" | "ai";
}

interface ChatConfig {
  popupMessage: string;
  agentName: string;
  agentDescription: string;
  preSentMessages: ChatMessage[];
  suggestedMessages: string[];
  agentAvatar: string;
}

interface XelerAIteChatbotProps {
  uuid: string;
  direction: "ltr" | "rtl";
  ltrConfig: ChatConfig;
  rtlConfig: ChatConfig;
}

export function XelerAIteChatbot({ uuid, direction, ltrConfig, rtlConfig }: XelerAIteChatbotProps) {
  // Choose configuration based on the language direction
  const config = direction === "ltr" ? ltrConfig : rtlConfig;

  const [messages, setMessages] = useState<ChatMessage[]>(config.preSentMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (messageContent: string) => {
    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      content: messageContent,
      sender: "user"
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://n8n-automations-w0mh.onrender.com/webhook/chatbot-message?message=${encodeURIComponent(messageContent)}&userId=${encodeURIComponent(uuid)}`,
        { method: "POST" }
      );
      const data = await response.json();
      const aiMessage: ChatMessage = {
        id: messages.length + 2,
        content: data.response || (direction === "ltr" ? "No response" : "لا يوجد رد"),
        sender: "ai"
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMsg = direction === "ltr" ? "Error fetching response" : "خطأ في جلب الاستجابة";
      const errorMessage: ChatMessage = {
        id: messages.length + 2,
        content: errorMsg,
        sender: "ai"
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
    setIsLoading(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  const handleSuggestedClick = (suggested: string) => {
    sendMessage(suggested);
  };

  return (
    <div style={{ direction }} className="relative">
      {/* Customizable pop-up message outside the chat */}
      <div className="fixed bottom-5 left-5 z-40">
        <Button variant="default">{config.popupMessage}</Button>
      </div>
      <ExpandableChat size="lg" position={direction === "rtl" ? "bottom-left" : "bottom-right"}>
        <ExpandableChatHeader className="flex-col text-center justify-center">
          <div className="flex items-center gap-2">
            <ChatBubbleAvatar src={config.agentAvatar} fallback="AG" />
            <div>
              <h1 className="text-xl font-semibold">{config.agentName}</h1>
              <p className="text-sm">{config.agentDescription}</p>
            </div>
          </div>
        </ExpandableChatHeader>
        <ExpandableChatBody>
          <ChatMessageList>
            {messages.map((message) => (
              <ChatBubble key={message.id} variant={message.sender === "user" ? "sent" : "received"}>
                <ChatBubbleAvatar
                  src={message.sender === "user" ? undefined : config.agentAvatar}
                  fallback={message.sender === "user" ? "US" : "AI"}
                />
                <ChatBubbleMessage variant={message.sender === "user" ? "sent" : "received"}>
                  {message.content}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}
            {isLoading && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar src={config.agentAvatar} fallback="AI" />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            )}
          </ChatMessageList>
          {/* Suggested messages (max 3) */}
          {config.suggestedMessages.length > 0 && (
            <div className="flex gap-2 p-4">
              {config.suggestedMessages.slice(0, 3).map((msg, index) => (
                <Button key={index} size="sm" onClick={() => handleSuggestedClick(msg)}>
                  {msg}
                </Button>
              ))}
            </div>
          )}
        </ExpandableChatBody>
        <ExpandableChatFooter>
          <form onSubmit={handleSubmit} className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0 justify-between">
              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
              </Button>
            </div>
          </form>
          {/* Powered by footer */}
          <div className="text-xs text-center mt-2">Powered by XelerAIte</div>
        </ExpandableChatFooter>
      </ExpandableChat>
    </div>
  );
}

// Add a default export so the UMD build exposes the component directly.
export default XelerAIteChatbot;
