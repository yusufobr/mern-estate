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

