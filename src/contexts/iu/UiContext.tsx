import { createContext } from "react";

interface ContextProps {
	sideMenuOpen: boolean;
	isAddingEntry: boolean;
	isDragging: boolean;
	openSideMenu: () => void;
	closeSideMenu: () => void;
	setIsAddingEntry: (isAddingEntry: boolean) => void;
	startDragging: () => void;
	endDragging: () => void;
}

export const UiContext = createContext<ContextProps>({} as ContextProps);
