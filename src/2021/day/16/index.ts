import { readFileSync } from 'fs';

const FILE = __dirname + '/test.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

function hex2bin(hexaStr: string) {
    return [...hexaStr].map((h) => parseInt(`0x${h}`).toString(2).padStart(4, '0')).join('');
}

class Packet {
    version: number;
    typeID: number;
    contentLength: number | undefined;
    subpacketLength: number | undefined;
    hasSubs: boolean = false;
    content: string;
    remaining: string;

    constructor(private str: string) {
        this.version = this.bin2dec(str.slice(0, 3));
        this.typeID = this.bin2dec(str.slice(3, 6));
        const workwith = str.slice(6);
        if (this.typeID !== 4) {
            this.hasSubs = true;
            const hasTotalLengthInBits = +workwith.slice(0, 1) === 0;
            if (hasTotalLengthInBits) {
                this.contentLength = this.bin2dec(workwith.slice(1, 1 + 15));
                this.content = workwith.slice(1 + 15, 1 + 15 + this.contentLength);
                this.remaining = workwith.slice(1 + 15 + this.contentLength);
            } else {
                this.subpacketLength = this.bin2dec(workwith.slice(1, 1 + 11));
                this.content = workwith.slice(1 + 11);
                this.remaining = this.content;
            }
        } else {
            const start = 0;
            let count = 1;
            let meesa = workwith;
            while (+meesa[0] === 1) {
                meesa = meesa.slice(count * 5);
                count += 1;
            }
            this.content = workwith.slice(start, count * 5);
            this.remaining = workwith.slice(count * 5);
        }
    };

    bin2dec(binstr: string): number { return +(`0b${binstr}`); }

}

class Parsie {
    private packets: Packet[] = [];

    constructor(private binaryStr: string) {
        let packet = new Packet(binaryStr);
        this.packets.push(packet);

        // if (packet.)
        // this.process(packet);
        while (packet.remaining.length > 0) {
            if (packet.hasSubs) {
                console.log('SUB', packet)
            }
            packet = new Packet(packet.remaining);
            if (packet.content.length > 0) this.packets.push(packet);
            else console.log('Empty, probably last', packet)
        }
        console.log('packets', this.packets.length)
        console.log(this.packets)
    }

    get() { return this.packets; }

    process(packet: Packet) {
        console.log('process', packet.content)
        switch (packet.typeID) {
            case 4:
                const literal = this.literal(packet.content);
                console.log('literal!', literal);
                break;
            default:
                console.log('new type!', packet.typeID);
        }
    }

    literal(binstr: string) {
        const result = ['0b'];
        for (let i = 0; i < Math.floor(binstr.length / 5); i++) {
            const start = i * 5;
            // const end = +binstr[start] === 1;
            const bit = binstr.slice(start + 1, start + 5);
            result.push(bit);
        }
        return +result.join('');
    }


}


export function day16(): void {
    const inp: string[] = read();
    console.log(inp[4]);
    const bin = hex2bin(inp[4]);
    console.log(bin)
    const pars = new Parsie(bin);

    const result = pars.get().reduce((acc, c) => acc += c.version, 0)

    //1
    console.log('Assignment 1', result);
    //110100101111111000101000
    //opdracht 110100101111111000101000
    //outcome  110100101111111000101000
    // 2 opdr: 00111000000000000110111101000101001010010001001000000000
    // 2 outc: 00111000000000000110111101000101001010010001001000000000
    // 3 opdr: 11101110000000001101010000001100100000100011000001100000
    // 3 outc: 11101110000000001101010000001100100000100011000001100000

    // 2
    // console.log('Assignment 2');
}