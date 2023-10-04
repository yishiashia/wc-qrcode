// import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import { JSDOM } from 'jsdom';

global.window = new JSDOM().window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.customElements = window.customElements;

jest.mock('@yishiashia/wasm-qrcode')

const QRCode = require('../../src/index');
import wasm_init, { qrcode_base64 } from '@yishiashia/wasm-qrcode';

describe('QRCode.ts', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });

  test('Must render props.text when passed', () => {
    const dataStr = "https://www.example.com";
    document.body.innerHTML = `
      <qr-code
        text="${dataStr}"
      ></qr-code>
    `;
    expect(wasm_init).toHaveBeenCalled();
    expect(qrcode_base64).toHaveBeenCalled();
  });

  test('Input data content with slot', async () => {
    const dataStr = "https://www.example.com";
    const qr = document.createElement('qr-code');
    qr.textContent = dataStr;
    document.body.appendChild(qr);
    await qr.updateComplete;
    expect(qrcode_base64).toHaveBeenCalled();
  })

  test('Mock qrcode_base64 method', () => {
    const newMock = jest.fn(() => `base64_data_str`);
    qrcode_base64.mockImplementation(newMock);
    const dataStr = "https://www.example.com";
    document.body.innerHTML = `
      <qr-code
        text="${dataStr}"
      ></qr-code>
    `;
    expect(newMock).toHaveBeenCalled();
    qrcode_base64.mockReset();
  })

  test('change size attribute to resize the qrcode image', async () => {
    const dataStr = "https://www.example.com";
    const qr = document.createElement('qr-code');
    qr.textContent = dataStr;
    qr.setAttribute('size', '6');
    document.body.appendChild(qr);
    await qr.updateComplete;

    qr.setAttribute('size', 12);
    await qr.updateComplete;

    const qrImg = qr.shadowRoot.querySelector('img')
    expect(qrImg).not.toBeNull()
    expect(qrImg.style.width).toBe('192px')
    expect(qrImg.style.height).toBe('192px')
  })

  test('using default size when given size attribute invalid', async () => {
    const dataStr = "https://www.example.com";
    const qr = document.createElement('qr-code');
    qr.textContent = dataStr;
    document.body.appendChild(qr);
    await qr.updateComplete;

    qr.setAttribute('size', 0);
    await qr.updateComplete;

    const qrImg = qr.shadowRoot.querySelector('img')
    expect(qrImg).not.toBeNull()
    expect(qrImg.style.width).toBe('96px')
    expect(qrImg.style.height).toBe('96px')
  })

  test('change size property to resize the qrcode image', async () => {
    const dataStr = "https://www.example.com";
    const qr = document.createElement('qr-code');
    qr.textContent = dataStr;
    document.body.appendChild(qr);
    await qr.updateComplete;

    qr.size = 12;
    await qr.updateComplete;

    const qrImg = qr.shadowRoot.querySelector('img')
    expect(qrImg).not.toBeNull()
    expect(qrImg.style.width).toBe('192px')
    expect(qrImg.style.height).toBe('192px')

    // test attribute with string format
    qr.size = '6';
    await qr.updateComplete;
    expect(qrImg.style.width).toBe('96px')
    expect(qrImg.style.height).toBe('96px')

    // the output of getter must be number format
    expect(qr.size).toBe(6)

    // expect the size to be default value (6) when given parameter is out of range
    qr.size = 0;
    await qr.updateComplete;
    expect(qr.size).toBe(6)
    qr.size = '0';
    await qr.updateComplete;
    expect(qr.size).toBe(6)
  })

  test('QR image re-render after change text property', async () => {
    const newMock = jest.fn((text) => `base64_data_str:${text}`);
    qrcode_base64.mockImplementation(newMock);
    const dataStr = "https://www.example.com";
    const qr = document.createElement('qr-code');
    qr.setAttribute('text', dataStr);
    document.body.appendChild(qr);

    await qr.updateComplete;

    const qrImg = qr.shadowRoot.querySelector('img')
    expect(qrImg).not.toBeNull()

    const qrSrc = qrImg.getAttribute('src')
    const testStr = "hihi"
    qr.text = testStr
    await qr.updateComplete;
    expect(typeof qrSrc === "string").toBeTruthy();
    expect(qrSrc.trim()).not.toBe("");
    expect(qrSrc).not.toBe(qrImg.getAttribute('src'));
    expect(qr.text).toBe(testStr);
    qrcode_base64.mockReset();
  });

  test('Render alt attribute on QR code image', async () => {
    const dataStr = "https://www.example.com";
    const altStr = "URL link";
    const qr = document.createElement('qr-code');
    qr.setAttribute('text', dataStr);
    qr.setAttribute('alt', altStr);
    document.body.appendChild(qr);

    await qr.updateComplete;

    const qrImg = qr.shadowRoot.querySelector('img')
    expect(qrImg).not.toBeNull()
    expect(qrImg.getAttribute('alt')).toBe(altStr)
    expect(qr.alt).toBe(altStr)

    const newAltStr = "Another alt string"
    qr.alt = newAltStr
    await qr.updateComplete;
    expect(qrImg.getAttribute('alt')).toBe(newAltStr)
    expect(qr.alt).toBe(newAltStr)
  })
});