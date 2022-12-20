import QRCode from "./QRCode";

// Register custom elements
if(customElements.get('qr-code') === undefined) {
  window.customElements.define('qr-code', QRCode)
}

export default QRCode