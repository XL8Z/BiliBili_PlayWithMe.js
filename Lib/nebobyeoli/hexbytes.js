// Original source: https://yasuhallabo.hatenadiary.org/entry/20140211/1392131668

// HEXString = UTF-8 Hex String
// Bytes = UTF-8 Bytes

class hexbytes {
    // Text <==> Hex

    static TextToHexString(text) {
        let bytes = hexbytes.TextToBytes(text);
        let hexStr = hexbytes.BytesToHexString(bytes);
        return hexStr;
    }

    static HexStringToText(hexStr) {
        let bytes = hexbytes.HexStringToBytes(hexStr);
        let str = hexbytes.BytesToText(bytes);
        return str;
    }

    // Hex <==> Byte

    static HexToByte(hex) {
        return parseInt(hex, 16);
    }

    static ByteToHex(byte) {
        let digits = (byte).toString(16);
        return (byte < 16) ? `0${digits}` : digits;
    }

    static HexStringToBytes(hexStr) {
        let result = [];
        for (let i = 0; i < hexStr.length; i += 2) result.push(HexToByte(hexStr.substr(i, 2)));
        return result;
    }

    static BytesToHexString(bytes) {
        let result = '';
        for (let i = 0; i < bytes.length; i++) result += ByteToHex(bytes[i]);
        return result;
    }

    // Byte <==> Text

    static BytesToText(arr) {

        if (arr == null) return null;

        let result = '';
        let i, c;

        while (i = arr.shift()) {

            if (i <= 0x7f) {
                result += String.fromCharCode(i);
            } else if (i <= 0xdf) {
                c = ((i & 0x1f) << 6);
                c += arr.shift() & 0x3f;
                result += String.fromCharCode(c);
            } else if (i <= 0xe0) {
                c = ((arr.shift() & 0x1f) << 6) | 0x0800;
                c += arr.shift() & 0x3f;
                result += String.fromCharCode(c);
            } else {
                c = ((i & 0x0f) << 12);
                c += (arr.shift() & 0x3f) << 6;
                c += arr.shift() & 0x3f;
                result += String.fromCharCode(c);
            }
        }

        return result;
    }

    static TextToBytes(text) {

        if (text == null) return [];

        let result = [];
        for (let i = 0; i < text.length; i++) {
            let c = text.charCodeAt(i);

            if (c <= 0x7f) {
                result.push(c);
            } else if (c <= 0x07ff) {
                result.push(((c >> 6) & 0x1F) | 0xC0);
                result.push((c & 0x3F) | 0x80);
            } else {
                result.push(((c >> 12) & 0x0F) | 0xE0);
                result.push(((c >> 6) & 0x3F) | 0x80);
                result.push((c & 0x3F) | 0x80);
            }
        }

        return result;
    }

}