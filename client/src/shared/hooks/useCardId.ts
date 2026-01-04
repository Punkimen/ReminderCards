import { useLocation } from "react-router";

export const useCardId = (): string | null => {
  const location = useLocation();
  const cardId = location.pathname.split('/').pop();
  return cardId || null;
 }
