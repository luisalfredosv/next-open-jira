import { UiState } from "./UiProvider";

type UiActionType =
	| {
			type: "UiOpenSidebar";
	  }
	| {
			type: "UiCloseSidebar";
	  }
	| {
			type: "UiIsAddingEntry";
			payload: boolean;
	  }
	| {
			type: "UiStartDragging";
	  }
	| {
			type: "UiEndDragging";
	  };
export const uiReducer = (state: UiState, action: UiActionType): UiState => {
	switch (action.type) {
		case "UiOpenSidebar":
			return {
				...state,
				sideMenuOpen: true,
			};

		case "UiCloseSidebar":
			return {
				...state,
				sideMenuOpen: false,
			};
		case "UiIsAddingEntry":
			return {
				...state,
				isAddingEntry: action.payload,
			};
		case "UiStartDragging":
			return {
				...state,
				isDragging: true,
			};
		case "UiEndDragging":
			return {
				...state,
				isDragging: false,
			};

		default:
			return state;
	}
};
