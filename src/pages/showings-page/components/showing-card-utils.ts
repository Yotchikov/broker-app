export const formatDate = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Сегодня';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Завтра';
  }

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
};

export const formatTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);

  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
