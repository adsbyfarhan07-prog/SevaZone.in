// fileReader.ts
export const readFileAsDataURL = (file: File, callback: (dataUrl: string) => void) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      callback(e.target.result as string);
    }
  };
  reader.readAsDataURL(file);
};
