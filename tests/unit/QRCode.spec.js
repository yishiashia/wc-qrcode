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
  })

});