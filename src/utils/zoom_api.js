import { Crypto } from 'crypto-js'


/*
export function generateSignature(meetingNumber, role) {

    // Prevent time sync issue between client signature generation and zoom 
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(sdk_key + meetingNumber + timestamp + role).toString('base64')
    const hash = Crypto.createHmac('sha256', sdk_secret).update(msg).digest('base64')
    const signature = Buffer.from(`${sdk_key}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
  
    return signature
}

export default generateSignature()
*/