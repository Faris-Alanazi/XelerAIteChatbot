"use client";

import React from "react";
import { XelerAIteChatbot } from "./XelerAIteChatbot";

export function XelerAIteChatbotDemo() {
  return (
    <XelerAIteChatbot
      uuid="123e4567-e89b-12d3-a456-426614174000"
      direction="ltr"
      ltrConfig={{
        popupMessage: "Chat with us!",
        agentName: "Support Agent",
        agentDescription: "How can we assist you?",
        preSentMessages: [
          {
            id: 1,
            content: "Hello! How can I help you today?",
            sender: "ai",
          },
          {
            id: 2,
            content: "Feel free to ask any questions.",
            sender: "ai",
          },
        ],
        suggestedMessages: ["Pricing", "Features", "Support"],
        agentAvatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop",
      }}
      rtlConfig={{
        popupMessage: "تحدث معنا!",
        agentName: "وكيل الدعم",
        agentDescription: "كيف يمكننا مساعدتك؟",
        preSentMessages: [
          {
            id: 1,
            content: "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
            sender: "ai",
          },
          {
            id: 2,
            content: "لا تتردد في طرح أي سؤال.",
            sender: "ai",
          },
        ],
        suggestedMessages: ["التسعير", "الميزات", "الدعم"],
        agentAvatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop",
      }}
    />
  );
}
