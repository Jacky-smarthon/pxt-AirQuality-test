/**
 * Air Quality block
 */
//% weight=999 color=#3CB371 icon="" block="Air Quality"
namespace AirQuality {

    export enum PmMenu {
        //% block="PM1.0"
        PM1 = 0,
        //% block="PM2.5"
        PM25 = 1,
        //% block="PM10"
        PM10 = 2
    }

    const PM_ADDR = 0x50;

    //% block="Get %pmType (ug/m3) at I2C"
    //% weight=96
    export function PMdata(pmType: PmMenu): number {
        pins.i2cWriteNumber(PM_ADDR, 0x00, NumberFormat.Int8LE);
        let buffer = pins.i2cReadBuffer(PM_ADDR, 32);
        let sum = 0
        for (let i = 0; i < 30; i++) {
            sum += buffer[i]
        }
        let data = [-1, -1, -1]
        if (sum == ((buffer[30] << 8) | buffer[31])) {
            data[0] = (buffer[0x04] << 8) | buffer[0x05]
            data[1] = (buffer[0x06] << 8) | buffer[0x07]
            data[2] = (buffer[0x08] << 8) | buffer[0x09]
        }
        return data[pmType]
    }
}

