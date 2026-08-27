'use client';

import { useCallback } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { createClient } from '@/lib/supabase/client';
import { Message } from '@/types/chat';
import { useTranslations } from 'next-intl';

export function useSendMessage() {
  const t = useTranslations('chat.errors');
  const { isStreaming, setIsStreaming, addMessage, appendToLastMessage } =
    useChatStore();

  const supabase = createClient();

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmedContent = content.trim();
      if (!trimmedContent || isStreaming) {
        return;
      }

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: trimmedContent,
        created_at: new Date().toISOString(),
      };

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '',
        created_at: new Date().toISOString(),
      };

      addMessage(userMessage);
      addMessage(assistantMessage);
      setIsStreaming(true);

      const currentMessages = useChatStore.getState().messages;
      const historyForApi = currentMessages.slice(0, -1).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      let accumulatedAssistantText = '';
      const currentChatId = useChatStore.getState().chatId;

      if (currentChatId) {
        supabase
          .from('messages')
          .insert({
            chat_id: currentChatId,
            role: 'user',
            content: trimmedContent,
          })
          .then();
      }

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        const token = session?.access_token || anonKey;

        const response = await fetch(
          `${supabaseUrl}/functions/v1/gemini-proxy`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: anonKey || '',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ messages: historyForApi }),
          },
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);

          throw new Error(
            errorData?.error || `HTTP error! status: ${response.status}`,
          );
        }

        const reader = response.body?.getReader();

        if (!reader) {
          throw new Error('No response body available for streaming');
        }

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmedLine = line.trim();

            if (!trimmedLine || !trimmedLine.startsWith('data:')) {
              continue;
            }

            const dataStr = trimmedLine.replace(/^data:\s*/, '');

            if (dataStr === '[DONE]') {
              continue;
            }

            try {
              const parsed = JSON.parse(dataStr);
              const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;

              if (text) {
                accumulatedAssistantText += text;
                appendToLastMessage(text);
              }
            } catch {}
          }
        }

        if (currentChatId && accumulatedAssistantText) {
          supabase
            .from('messages')
            .insert({
              chat_id: currentChatId,
              role: 'assistant',
              content: accumulatedAssistantText,
            })
            .then();
        }
      } catch (error) {
        console.error('Error in useSendMessage:', error);
        appendToLastMessage(t('errorResponse'));
      } finally {
        setIsStreaming(false);
      }
    },
    [
      isStreaming,
      addMessage,
      setIsStreaming,
      supabase,
      appendToLastMessage,
      t,
    ],
  );

  return {
    sendMessage,
    isStreaming,
  };
}
