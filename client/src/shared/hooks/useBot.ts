
const tg = window.Telegram.WebApp;
export const useBot = () => {
  const onClose = () => {
    tg.close()
  }

  return {
    onClose, 
    tg,
    user: tg.initDataUnsafe.user,
    chat: tg.initDataUnsafe.chat,
  }
}
