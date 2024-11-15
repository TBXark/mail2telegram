/* eslint-disable unicorn/no-new-buffer */
if (typeof Buffer === 'undefined') {
    globalThis.Buffer = class Buffer extends ArrayBuffer {
        constructor(bufferOrLength) {
            if (bufferOrLength instanceof ArrayBuffer) {
                super(bufferOrLength.byteLength);
                new Uint8Array(this).set(new Uint8Array(bufferOrLength));
            } else {
                super(bufferOrLength);
            }
        }

        static from(data, encoding) {
            if (typeof data === 'string') {
                const encoder = new TextEncoder();
                return new Buffer(encoder.encode(data).buffer);
            }
            if (data instanceof ArrayBuffer) {
                return new Buffer(data);
            }
            if (data instanceof Uint8Array) {
                return new Buffer(data.buffer);
            }
            throw new Error(`Unsupported data type: ${typeof data}, encoding: ${encoding}`);
        }

        toString(encoding) {
            switch (encoding) {
                case 'hex':
                    return Array.from(new Uint8Array(this)).map(b => b.toString(16).padStart(2, '0')).join('');
                case 'base64':
                    return btoa(String.fromCharCode.apply(null, new Uint8Array(this)));
                default:
                    return new TextDecoder(encoding).decode(new Uint8Array(this));
            }
        }
    };
}
