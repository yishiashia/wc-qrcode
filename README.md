# wc-qrcode

An efficient and lightweight QR Code WebComponent integrated with Rust wasm library.

## Installation
You can install `wc-qrcode` with npm, or just get started quickly with CDN.

### Install from npm
To install from npm, open terminal in your project folder and run:

```shell
npm install wc-qrcode
```

After the package is installed, then you can import the qrcode webcomponent into you code:

```js
import 'wc-qrcode';

window.onload = function() {
  let qrElement = document.createElement('qr-code');
  qrElement.setAttribute('text', 'https://example.org');
  qrElement.setAttribute('size', '6');
  document.body.appendChild(qrElement);
}
```

### Install from CDN
There is `jsDelivr` CDN available for quickly integrated with your web page.

```
https://cdn.jsdelivr.net/npm/wc-qrcode@0.1.5
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/wc-qrcode@0.1.4"></script>
```

#### Basic Usages:

```html
<html>
  <head>

    <!-- Load QR WebComponent library -->
    <script src="https://cdn.jsdelivr.net/npm/wc-qrcode@0.1.4"></script>
    <!-- End Load -->

  </head>

  <body>

    <!-- Using "qr-code" html tag to generate QR Code -->
    <qr-code
      text="https://github.com/yishiashia/wc-qrcode"
      size="6"
    ></qr-code>

  </body>
</html>
```

## Demo page
[Live Demo](https://yishiashia.github.io/wc-qrcode)

## Attributes

### text

`String` type. The data of QR Code.

### size

`Number` type. The QR code image size (mutiply with 16px).
