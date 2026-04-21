import { create } from "zustand";

type Toast = {
  id: number;
  title: string;
  tone?: "default" | "success" | "error";
};

type ToastState = {
  items: Toast[];
  push: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: number) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  items: [],
  push: (toast) =>
    set((state) => ({
      items: [...state.items, { ...toast, id: Date.now() + Math.random() }]
    })),
  dismiss: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id)
    }))
}));
