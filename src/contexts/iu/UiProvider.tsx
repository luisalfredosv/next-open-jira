import React, { FC, useReducer } from "react";
import { UiContext } from "./UiContext";
import { uiReducer } from "./UiReducer";

export interface UiState {
	sideMenuOpen: boolean;
	isAddingEntry: boolean;
	isDragging: boolean;
}

export const UI_INITIAL_STATE: UiState = {
	sideMenuOpen: false,
	isAddingEntry: false,
	isDragging: false,
};

export const UiProvider: FC<{
	children: JSX.Element;
}> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

	const openSideMenu = () => {
		dispatch({ type: "UiOpenSidebar" });
	};

	const closeSideMenu = () => {
		dispatch({ type: "UiCloseSidebar" });
	};

	const setIsAddingEntry = (isAddingEntry: boolean) => {
		dispatch({ type: "UiIsAddingEntry", payload: isAddingEntry });
	};

	const startDragging = () => {
		dispatch({ type: "UiStartDragging" });
	};

	const endDragging = () => {
		dispatch({ type: "UiEndDragging" });
	};

	return (
		<UiContext.Provider
			value={{
				...state,
				openSideMenu,
				closeSideMenu,
				setIsAddingEntry,
				startDragging,
				endDragging,
			}}
		>
			{children}
		</UiContext.Provider>
	);
};
