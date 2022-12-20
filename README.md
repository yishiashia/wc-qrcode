# wc-qrcode

A efficient and lightweight QR Code WebComponent integrated with Rust wasm library.



## Basic Usages

```html
<html>
  <head>

    <!-- Load QR WebComponent library -->
    <script src="https://cdn.jsdelivr.net/gh/yishiashia/wc-qrcode@0.1.1/dist/wc-qrcode.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/yishiashia/wc-qrcode@0.1.1/dist/wc-qrcode.runtime.js"></script>
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
