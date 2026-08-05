// UI State Store - Zustand
// Handles client-side UI states (Sidebar collapse, Theme mode, Modal/Drawer visibility)

export interface UiState {
  isSidebarCollapsed: boolean;
  theme: "light" | "dark";
  activeModalId: string | null;
  activeDrawerId: string | null;
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark") => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  openDrawer: (drawerId: string) => void;
  closeDrawer: () => void;
}

// Initial state values reference for Zustand store implementation
export const initialUiState = {
  isSidebarCollapsed: false,
  theme: "light" as const,
  activeModalId: null,
  activeDrawerId: null,
};
