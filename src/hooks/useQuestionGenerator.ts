import { useState, useCallback } from 'react';
import type { SubnetCalculations } from './useSubnetLogic';
import { calculateSubnetDetails, ipStringToBits } from './useSubnetLogic';

export type QuestionType = 'FindNetwork' | 'FindBroadcast' | 'FindValidRange' | 'SubnetsAndHosts';

export interface GeneratedQuestion {
  id: string;
  type: QuestionType;
  promptText: string;
  expectedCalc: SubnetCalculations;
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateQuestion(): GeneratedQuestion {
  const types: QuestionType[] = ['FindNetwork', 'FindBroadcast', 'FindValidRange', 'SubnetsAndHosts'];
  const type = types[getRandomInt(0, types.length - 1)];

  const classChoice = ['A', 'B', 'C'][getRandomInt(0, 2)];
  let o1=1;
  let minCidr = 8;
  if (classChoice === 'A') {
    o1 = getRandomInt(1, 126);
    minCidr = 8;
  } else if (classChoice === 'B') {
    o1 = getRandomInt(128, 191);
    minCidr = 16;
  } else {
    o1 = getRandomInt(192, 223);
    minCidr = 24;
  }

  const o2 = getRandomInt(0, 255);
  const o3 = getRandomInt(0, 255);
  const o4 = getRandomInt(0, 255);
  const ipString = `${o1}.${o2}.${o3}.${o4}`;
  
  const cidr = getRandomInt(minCidr, 30);
  
  const bits = ipStringToBits(ipString);
  const calc = calculateSubnetDetails(bits, cidr);

  let promptText = '';

  if (type === 'FindNetwork') {
    promptText = `What subnet does host ${ipString}/${cidr} belong to?`;
  } else if (type === 'FindBroadcast') {
    promptText = `What is the broadcast address of the network ${ipString}/${cidr} belongs to?`;
  } else if (type === 'FindValidRange') {
    promptText = `Find the first and last usable IP for the host ${ipString}/${cidr}.`;
  } else if (type === 'SubnetsAndHosts') {
    let startOctets = [o1, 0, 0, 0];
    if (classChoice === 'B') startOctets = [o1, o2, 0, 0];
    if (classChoice === 'C') startOctets = [o1, o2, o3, 0];
    
    const targetCidr = getRandomInt(minCidr, 29);
    const hostBits = 32 - targetCidr;
    const maxHosts = Math.pow(2, hostBits) - 2;
    // ensure we don't ask for 0 hosts if targetCidr is 30 (because maxHosts would be 2, 2 * 0.8 is 1)
    const requestedHosts = Math.max(1, Math.floor(maxHosts * 0.8));
    
    // Choose 0th, 1st, 2nd, 3rd subnet
    // But be careful not to go out of bounds of the available address space
    // max subnets is 2^(targetCidr - minCidr)
    const availableSubnets = Math.pow(2, targetCidr - minCidr);
    const subnetIndex = getRandomInt(0, Math.min(4, availableSubnets - 1));
    
    // Javascript bitwise operations are 32-bit signed ints, which messes up IPs > 127
    // So we need to calculate using BigInt or floats.
    // Let's use BigInt or simply Math
    const ipInt = (startOctets[0] * 16777216) + (startOctets[1] * 65536) + (startOctets[2] * 256) + startOctets[3];
    const newIpInt = ipInt + (subnetIndex * Math.pow(2, hostBits));
    
    const oA = Math.floor(newIpInt / 16777216) % 256;
    const oB = Math.floor(newIpInt / 65536) % 256;
    const oC = Math.floor(newIpInt / 256) % 256;
    const oD = newIpInt % 256;
    
    const newIpStr = `${oA}.${oB}.${oC}.${oD}`;
    const newBits = ipStringToBits(newIpStr);
    const updatedCalc = calculateSubnetDetails(newBits, targetCidr);
    
    const ordinal = ["first", "second", "third", "fourth", "fifth"][subnetIndex];
    
    promptText = `You have been given the ${startOctets.join('.')}/${minCidr} network. Your company requires subnets with at least ${requestedHosts} hosts each. Identify the network and broadcast addresses of the ${ordinal} usable subnet.`;
    
    return { id: Math.random().toString(), type, promptText, expectedCalc: updatedCalc };
  }

  return { id: Math.random().toString(), type, promptText, expectedCalc: calc };
}

export function useQuestionGenerator() {
  const [activeQuestion, setActiveQuestion] = useState<GeneratedQuestion | null>(null);

  const generateNewQuestion = useCallback(() => {
    setActiveQuestion(generateQuestion());
  }, []);

  const clearQuestion = useCallback(() => {
    setActiveQuestion(null);
  }, []);

  return { activeQuestion, generateNewQuestion, clearQuestion };
}
