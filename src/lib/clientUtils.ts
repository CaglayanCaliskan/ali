/**
 * Converts a SVG element to a PNG Data URL and triggers browser download
 */
export function downloadSvgAsPng(svgElementId: string, filename: string = "qr-kod.png") {
  const svg = document.getElementById(svgElementId) as SVGGraphicsElement | null;
  if (!svg) {
    console.error("SVG element not found:", svgElementId);
    return;
  }

  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  // Create an SVG blob
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const URL = window.URL || window.webkitURL || window;
  const blobURL = URL.createObjectURL(svgBlob);

  img.onload = () => {
    // Generate high resolution image (3x scaling for crisp print quality)
    const scale = 3;
    canvas.width = (img.width || 200) * scale;
    canvas.height = (img.height || 200) * scale;

    if (ctx) {
      // White background for QR code readability
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
    URL.revokeObjectURL(blobURL);
  };

  img.src = blobURL;
}

/**
 * Resizes and compresses an image client-side to Base64 (max 1200px, JPEG quality 0.85)
 */
export function compressImageFile(file: File, maxDim = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onerror = () => {
      console.warn("FileReader error");
      resolve("");
    };
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl) {
        resolve("");
        return;
      }

      const img = new Image();
      img.onerror = () => {
        // Fallback to raw data url if canvas rendering fails
        resolve(rawDataUrl);
      };
      img.onload = () => {
        try {
          const elem = document.createElement("canvas");
          let width = img.width || 800;
          let height = img.height || 600;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext("2d");
          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = elem.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        } catch (e) {
          console.warn("Canvas compression failed, falling back to raw Data URL:", e);
          resolve(rawDataUrl);
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  });
}
