import { useState, useEffect } from 'react';

export type Bit = 0 | 1;

export interface SubnetCalculations {
  ipString: string;
  submaskString: string;
  networkString: string;
  broadcastString: string;
  firstUsableString: string;
  lastUsableString: string;
  magicNumber: number;
  magicNumberOctet: number; // 1-indexed (1, 2, 3, or 4)
  ipClass: 'A' | 'B' | 'C' | 'D/E';
  minCidr: number;
}

// Default to 192.168.1.0 (Class C)
const defaultBits: Bit[] = [
  ...[1, 1, 0, 0, 0, 0, 0, 0], // 192 (128+64)
  ...[1, 0, 1, 0, 1, 0, 0, 0], // 168 (128+32+8)
  ...[0, 0, 0, 0, 0, 0, 0, 1], // 1
  ...[0, 0, 0, 0, 0, 0, 0, 0]  // 0
] as Bit[];

function bitsToOctets(bits: Bit[]): number[] {
  const octets = [];
  for (let i = 0; i < 4; i++) {
    const chunk = bits.slice(i * 8, (i + 1) * 8);
    octets.push(parseInt(chunk.join(''), 2));
  }
  return octets;
}

function octetsToString(octets: number[]): string {
  return octets.join('.');
}

export function useSubnetLogic() {
  const [bits, setBits] = useState<Bit[]>(defaultBits);
  const [cidr, setCidr] = useState<number>(24);

  // 1. Derive Class and Minimum CIDR
  const firstOctet = parseInt(bits.slice(0, 8).join(''), 2);
  let ipClass: 'A' | 'B' | 'C' | 'D/E' = 'C';
  let minCidr = 24;

  if (firstOctet >= 0 && firstOctet <= 127) {
    ipClass = 'A';
    minCidr = 8;
  } else if (firstOctet >= 128 && firstOctet <= 191) {
    ipClass = 'B';
    minCidr = 16;
  } else if (firstOctet >= 192 && firstOctet <= 223) {
    ipClass = 'C';
    minCidr = 24;
  } else {
    ipClass = 'D/E';
    minCidr = 24;
  }

  // Ensure CIDR does not go below class boundaries
  useEffect(() => {
    if (cidr < minCidr) {
      setCidr(minCidr);
    }
  }, [bits, cidr, minCidr]);

  const toggleBit = (index: number) => {
    setBits((prev) => {
      const next = [...prev];
      next[index] = next[index] === 1 ? 0 : 1;
      return next;
    });
  };

  const reset = () => {
    setBits(defaultBits);
    setCidr(24);
  };

  const setIpFromString = (ip: string) => {
    const parts = ip.split('.');
    if (parts.length === 4) {
      const parsed = parts.map(p => parseInt(p, 10));
      if (parsed.every(n => !isNaN(n) && n >= 0 && n <= 255)) {
        const newBits: Bit[] = [];
        parsed.forEach(n => {
          const binStr = n.toString(2).padStart(8, '0');
          for (let i = 0; i < 8; i++) {
            newBits.push(parseInt(binStr[i], 10) as Bit);
          }
        });
        setBits(newBits);
      }
    }
  };

  // 2. Perform Mathematical Calculations
  const ipOctets = bitsToOctets(bits);
  const ipString = octetsToString(ipOctets);

  const maskBits = Array(32).fill(0).map((_, i) => (i < cidr ? 1 : 0)) as Bit[];
  const maskOctets = bitsToOctets(maskBits);
  const submaskString = octetsToString(maskOctets);

  // Magic Number (Block Size)
  const interestingOctetIndex = Math.floor((cidr === 0 ? 0 : cidr - 1) / 8);
  const interestingMaskValue = maskOctets[interestingOctetIndex];
  const magicNumber = 256 - interestingMaskValue;
  const magicNumberOctet = interestingOctetIndex + 1; // 1-indexed

  // Network and Broadcast
  const networkBits = bits.map((b, i) => (maskBits[i] === 1 ? b : 0)) as Bit[];
  const broadcastBits = bits.map((b, i) => (maskBits[i] === 1 ? b : 1)) as Bit[];

  const networkString = octetsToString(bitsToOctets(networkBits));
  const broadcastString = octetsToString(bitsToOctets(broadcastBits));

  // Usable IPs
  let firstUsableString = '-';
  let lastUsableString = '-';

  if (cidr <= 30) {
    const firstBits = [...networkBits];
    firstBits[31] = 1; // +1 bit
    
    const lastBits = [...broadcastBits];
    lastBits[31] = 0;  // -1 bit
    
    firstUsableString = octetsToString(bitsToOctets(firstBits as Bit[]));
    lastUsableString = octetsToString(bitsToOctets(lastBits as Bit[]));
  }

  const calc: SubnetCalculations = {
    ipString,
    submaskString,
    networkString,
    broadcastString,
    firstUsableString,
    lastUsableString,
    magicNumber,
    magicNumberOctet,
    ipClass,
    minCidr
  };

  return {
    bits,
    cidr,
    setCidr,
    toggleBit,
    setIpFromString,
    reset,
    calc
  };
}
