import wasm_init, { qrcode, qrcode_base64 } from "@yishiashia/wasm-qrcode";

const randStr = function(length: number) {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function benchmark() {
  console.log("do benchmark")
  const num_qrcodes = 1000.0;

  const testData = [];
  for (let i = 0; i < num_qrcodes; i ++) {
    testData.push(randStr(35) + String(i).padStart(5, '0'));
  }

  let svg_start_time = Date.now();

  Promise
    .all(testData.map(v => qrcode(v, 36, 36)))
    .then(output => {
      // console.log(output)
      console.log((Date.now() - svg_start_time) / num_qrcodes)
    });
}

const main = async function() {
  await wasm_init()
  const btn = document.createElement("button")
  btn.addEventListener("click", function() {
    console.log("click")
    benchmark()
  });
  btn.textContent = "test";
  document.body.appendChild(btn);
}

export default main()