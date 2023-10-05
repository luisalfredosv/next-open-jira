import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const timeAgo = (timestamp: number): string => {
	return formatDistanceToNow(timestamp, {
		locale: es,
	});
};
