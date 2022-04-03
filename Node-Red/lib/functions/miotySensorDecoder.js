// name: Unbenannter Typ function
// outputs: 1
// initialize: // Der Code hier wird ausgeführt,\n// wenn der Node gestartet wird\n
// finalize: // Der Code hier wird ausgeführt,\n// wenn der Node gestoppt wird\n
// info: Mioty Sensor Data Decoder für Lansen CO2-Sensor und TI Dev Kit
function decodeDevKit(frame) {
    const data = Buffer.from(frame, "hex")
    const frameId = data.readInt8(0)
    
    if (frameId === 0x1) {
        return {
            counter: data.readUint8(1),
            lightSensor: data.readUint16BE(2),
            magnetFlux: data.readInt16BE(4),
            temperature: data.readInt8(6),
            humidity: data.readInt8(7)
        }
    } else if (frameId === 0x2) {
        return {
            counter: data.readUint8(1),
            accX: data.readInt8(2),
            accY: data.readInt8(3),
            accZ: data.readInt8(4),
            batteryVoltage: data.readInt16BE(5),
            batteryPercentage: data.readInt8(7)
        }
    } else {
        return {
            error: "Unknown frameId " + frameId
        }
    }
    
}

function decodeLansen(frame) {
    function getInt(data, mask, position) {
        return data
    }
    const data = Buffer.from(frame, "hex")
    return {
        temp_1: (data.readUint8(0) >> 1 & 0x7f) / 2,
        humidity_1: (data.readUint16BE(0) >> 2 & 0x7f),
        co2_1: (data.readUint16BE(1) >> 2 & 0xff) * 20,
        // Temp, humidity und co2 mit 2 und 3 dahinter, 
        // sind einfach nur die Werte der letzten beiden Mesunngen
        temp_2: (data.readUint16BE(2) >> 3 & 0x7f) / 2,
        humidity_2: (data.readUint16BE(3) >> 4 & 0x7f),
        co2_2: (data.readUint16BE(4) >> 4 & 0xff) * 20,
        temp_3: (data.readUint16BE(5) >> 5 & 0x7f) / 2,
        humidity_3: (data.readUint16BE(6) >> 6 & 0x7f),
        co2_3: (data.readUint16BE(7) >> 6 & 0xff) * 20,
        batt: ((data.readUint8(8) >> 2 & 0xf) + 18) / 10,
        co2_error: (data.readUint8(8) >> 6 & 1),
        calibration_not_done: (data.readUint8(8) >> 7 & 1)
    }
    
}


function decode(message) {
    if (message.uid === "MA0412D2A0000046F000") {
        return decodeLansen(message.frame)
    } else {
        return decodeDevKit(message.frame)
    }
}

let decoded = {}

for (const message of msg.payload) {
    decoded = {...decoded, ...decode(message) }
}
return { payload: decoded }
