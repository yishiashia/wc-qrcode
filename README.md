# wc-qrcode

[![published][wc-image]][wc-url]
[![coverage][coverage-image]][coverage-url]
[![npm][npm-version-img]][npm-url]
[![npm][npm-download-img]][npm-url]
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/wc-qrcode/badge)](https://data.jsdelivr.com/v1/package/npm/wc-qrcode/badge)
[![GitHub issues][github-issue-img]][github-issue-url]
![license][license-img]

[![NPM](https://nodei.co/npm/wc-qrcode.png?mini=true)](https://www.npmjs.com/package/wc-qrcode)

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
https://cdn.jsdelivr.net/npm/wc-qrcode@0.1.6
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/wc-qrcode@0.1.6"></script>
```

#### Basic Usages:

```html
<html>
  <head>

    <!-- Load QR WebComponent library -->
    <script src="https://cdn.jsdelivr.net/npm/wc-qrcode@0.1.6"></script>
    <!-- End Load -->

  </head>

  <body>

    <!-- Using "qr-code" html tag to generate QR Code -->
    <qr-code
      text="https://github.com/yishiashia/wc-qrcode"
      size="6"
    ></qr-code>

    <!-- Use slot content to generate QR Code -->
    <qr-code size="6">
      https://github.com/yishiashia/wc-qrcode
    </qr-code>

  </body>
</html>
```

## Demo page
[Live Demo](https://yishiashia.github.io/wc-qrcode)

[Slot example](https://codepen.io/yishiashia/pen/qBLJJbP)

## Attributes

### text

`String` type. The data of QR Code.

### size

`Number` type. The QR code image size (multiply by 16px).

### alt
`String` type. The alt description text of the generated qrcode image.

## Element Properties

| Property | Type   | Description |
| -------- | ------ | ----------- |
| text     | String | The data string to generate QR code. |
| size     | Integer | The QR Code image size (width and height would be the size multiply by 16px). |
| alt      | String | The alt description text of the generated qrcode image. |

You can update the qrcode component by setting its properties.

For example:

```js
const qrElement = document.getElementsByTagName("qr-code")[0];

if (qrElement !== undefined) {
  qrElement.text = "https://www.example.org";
  qrElement.alt = "URL of example.org";
  qrElement.size = 10;
}
```

[wc-image]: https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square
[wc-url]: https://www.webcomponents.org/element/wc-qrcode

[coverage-image]: https://img.shields.io/endpoint?style=flat-square&url=https%3A%2F%2Fgist.githubusercontent.com%2Fyishiashia%2Fdee60aefdce58a7559baeb7c5deb3a8b%2Fraw%2F7f21007cd1da5390af78a16aedfacf12e3354af5%2Fwc-qrcode__heads_master.json
[coverage-url]: https://gist.githubusercontent.com/yishiashia/dee60aefdce58a7559baeb7c5deb3a8b/raw/7f21007cd1da5390af78a16aedfacf12e3354af5/wc-qrcode__heads_master.json

[npm-version-img]: https://img.shields.io/npm/v/wc-qrcode.svg?style=flat-square
[npm-download-img]: https://img.shields.io/npm/dm/wc-qrcode.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/wc-qrcode

[github-issue-img]: https://img.shields.io/github/issues/yishiashia/wc-qrcode.svg?style=flat-square
[github-issue-url]: https://github.com/yishiashia/wc-qrcode/issues

[license-img]: https://img.shields.io/npm/l/wc-qrcode.svg?style=flat-square
