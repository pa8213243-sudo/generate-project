import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

interface ChatState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  dailyCount: number;
  incrementDailyCount: () => void;
  checkLimit: () => boolean;
  clearHistory: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      messages: [
        {
          id: 'welcome-msg',
          role: 'ai',
          content: 'Hi Parvej! I am your AI CFO Assistant. Ask me anything about your financial models, Power BI dashboards, or CMA progress.',
          timestamp: Date.now(),
        }
      ],
      addMessage: (msg) => set((state) => ({
        messages: [...state.messages, { ...msg, id: crypto.randomUUID(), timestamp: Date.now() }]
      })),
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      dailyCount: 0,
      incrementDailyCount: () => {
        if (typeof window === "undefined") return;
        const today = new Date().toISOString().split('T')[0];
        const currentCount = parseInt(window.localStorage.getItem(`cfo_count_${today}`) || '0');
        window.localStorage.setItem(`cfo_count_${today}`, (currentCount + 1).toString());
        set({ dailyCount: currentCount + 1 });
      },
      checkLimit: () => {
        if (typeof window === "undefined") return false;
        const today = new Date().toISOString().split('T')[0];
        const currentCount = parseInt(window.localStorage.getItem(`cfo_count_${today}`) || '0');
        return currentCount >= 4; // Strict limit as per SRS
      },
      clearHistory: () => set({ messages: [{
        id: crypto.randomUUID(),
        role: 'ai',
        content: 'Conversation cleared. How can I assist you today?',
        timestamp: Date.now(),
      }]})
    }),
    {
      name: 'cfo-chat-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);