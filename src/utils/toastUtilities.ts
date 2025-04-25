export const addToastMessage = (
    setToastMessages: React.Dispatch<React.SetStateAction<string[]>>,
    message: string
  ) => {
    setToastMessages((prev) => [...prev, message])
  }