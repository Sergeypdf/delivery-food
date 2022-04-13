const body = document.body;


const allDocumentHeight = document.documentElement.scrollHeight;

// Näkymä selainikkunan korkeus
const visibleDocumentHeight = document.documentElement.clientHeight;

// Scroll leveykseen
const scrollWidth = window.innerWidth - document.documentElement.clientWidth;

// function vienti
export const band = () => {
  if (allDocumentHeight > visibleDocumentHeight) {
    return body.style.cssText = `overflow: hidden; margin-right: ${scrollWidth}px;`;
  }
};

export const band2 = () => {
  if (allDocumentHeight > visibleDocumentHeight) {
    return body.style.cssText = `overflow: ; margin-right: `;
  }
};