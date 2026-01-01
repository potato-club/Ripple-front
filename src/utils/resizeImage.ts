export async function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });

  // 일회용 캔버스 생성 및 크기 계산
  const canvas = document.createElement("canvas");
  let { width, height } = image;

  if (width > height) {
    if (width > maxWidth) {
      height = Math.round(height * (maxWidth / width));
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round(width * (maxHeight / height));
      height = maxHeight;
    }
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("캔버스컨텍스트 가져오기 실패");
  ctx.drawImage(image, 0, 0, width, height);

  const resizedBlob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/webp", 0.5);
  });
  if (!resizedBlob) throw new Error();

  // 메모리 누수 방지 URL 해제
  URL.revokeObjectURL(image.src);

  return resizedBlob;
}
