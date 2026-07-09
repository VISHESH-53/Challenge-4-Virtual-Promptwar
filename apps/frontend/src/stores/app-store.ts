import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

interface AppState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  activeModule: string;
  setActiveModule: (module: string) => void;
  
  selectedStadium: string | null;
  setSelectedStadium: (stadiumId: string | null) => void;
  
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      activeModule: 'dashboard',
      setActiveModule: (module) => set({ activeModule: module }),
      
      selectedStadium: null,
      setSelectedStadium: (stadiumId) => set({ selectedStadium: stadiumId }),
      
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      toggleCommandPalette: () => set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
      
      notifications: [],
      addNotification: (notif) => set((state) => ({
        notifications: [
          {
            ...notif,
            id: Math.random().toString(36).substring(7),
            isRead: false,
            createdAt: new Date().toISOString(),
          },
          ...state.notifications,
        ].slice(0, 50), // Keep last 50
      })),
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) => 
          n.id === id ? { ...n, isRead: true } : n
        )
      })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'fifa-app-storage',
      partialize: (state) => ({ 
        sidebarCollapsed: state.sidebarCollapsed,
        selectedStadium: state.selectedStadium
      }),
    }
  )
);
