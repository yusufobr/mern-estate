export const firePreview = () => {
  const previewImgs = document.querySelector<HTMLDivElement>(".previewImgs");
  if (previewImgs) {
    previewImgs.click();
  }
};

export const formatMoneyNumber = (input: number) => {
  if (isNaN(input)) {
    return input.toString();
  }

  if (input >= 1000000) {
    const millions: string = (input / 1000000).toFixed(2);
    return `${millions}m`;
  } else {
    const formattedNumber: string = input.toLocaleString('en-US');
    return formattedNumber;
  }
};

export function timeAgo(timestamp: number): string {
  const seconds: number = Math.floor((new Date().getTime() - timestamp) / 1000);
  const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
  };

  for (let interval in intervals) {
      const count: number = Math.floor(seconds / intervals[interval]);
      if (count > 0) {
          if (count === 1) {
              return `one ${interval} ago`;
          } else {
              return `${count} ${interval}s ago`;
          }
      }
  }
  return "just now";
}


