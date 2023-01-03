import wasm_init, { qrcode, qrcode_base64 } from "@yishiashia/wasm-qrcode"

export default class QRCode extends HTMLElement {

  private props: {
    alt: string
    text: string
    size: number
  }
  private qrimg: string | null

  static get observedAttributes() {
    return ["text", "size"];
  }

  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.props = {
      alt: '',
      text: '',
      size: 6
    }
    this.qrimg = null
  }

  async connectedCallback () {
    await wasm_init()
    if (this.shadowRoot !== null) {
      this.setupProps()
      this.setupDom()
      this.setupStyle()
      this.setupListenEvents()
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "text") {
      this.props.text = newValue
      this.qrimg = qrcode_base64(this.props.text, 36, 36)
      this.refreshQRImage()
    } else if (name === "size") {
      const size = parseInt(newValue)
      this.props.size = !isNaN(size) && size > 0 ? size : this.props.size
      this.refreshQRImage()
    }
  }

  disconnectedCallback () {

  }

  setupProps () {
    if (this.hasAttribute("text")) {
      this.props.text = String(this.getAttribute("text"))
      this.props.alt = String(this.getAttribute("text"))
      this.qrimg = qrcode_base64(this.props.text, 36, 36)
    }
    if (this.hasAttribute("alt")) {
      const alt = String(this.getAttribute("alt")).trim()
      if (alt !== "") { this.props.alt = alt }
    }
    if (this.hasAttribute("size")) {
      const size = parseInt(String(this.getAttribute("size")))
      if (!isNaN(size) && size > 0) { this.props.size = size }
    }
  }

  setupDom () {
    if (this.shadowRoot !== null) {
      this.shadowRoot.innerHTML = this.template(this.props)
    }
  }

  setupStyle () {

  }

  setupListenEvents () {

  }

  refreshQRImage () {
    if (this.shadowRoot !== null) {
      let img = this.shadowRoot.querySelector('img')
      if (img === null) {
        img = document.createElement('img')
        this.shadowRoot.querySelector('.qrcode-container')?.appendChild(img)
      }
      if (img !== null && this.qrimg !== null) {
        img.src = `data:image/svg+xml;base64,${this.qrimg}`
        img.alt = this.props.alt
        img.style.cssText = `
          width: ${this.props.size * 16}px;
          height: ${this.props.size * 16}px;
        `
      }
    }
  }

  get text () {
    return this.props.text
  }

  set text (txt: string) {
    if (typeof txt === "string") {
      this.props.text = txt
      if (!this.hasAttribute("alt")) {
        this.props.alt = txt
      }
      this.qrimg = qrcode_base64(this.props.text, 36, 36)
      this.refreshQRImage()
    }
  }

  get size () {
    return this.props.size
  }

  set size (sz: number | string) {
    if (typeof sz === "number") {
      this.props.size = !isNaN(sz) && sz > 0 ? sz : this.props.size
    } else {
      const size = parseInt(String(sz))
      this.props.size = !isNaN(size) && size > 0 ? size : this.props.size
    }
    this.refreshQRImage()
  }

  get alt () {
    return this.props.alt
  }

  set alt (at: string) {
    this.props.alt = String(at)
    this.refreshQRImage()
  }

  template (data: {
    alt: string
    text: string
    size: number
  }) {
    return `
      <div class="qrcode-container">
        ${
          this.qrimg === null ? "" : `
            <img
              src="data:image/svg+xml;base64,${this.qrimg}"
              alt="${data.alt}"
              style="width: ${data.size * 16}px; height: ${data.size * 16}px;" />`
        }
      </div>
    `.trim()
  }
}