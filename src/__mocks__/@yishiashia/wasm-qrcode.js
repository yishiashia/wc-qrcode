export const qrcode = jest.fn();
export const qrcode_base64 = jest.fn();
const init = jest.fn().mockImplementation(() => {
  return {a: 0, b: 1};
});

export default init;