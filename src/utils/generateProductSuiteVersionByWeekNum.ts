import { format } from 'date-fns'

export default function generateProductSuiteVersionByWeekNum(date: Date = new Date()) {
    const weekNum = format(date, 'ww')
    const year = format(date, 'yyyy')
    const version = `${year}.w${weekNum}`
    return version
}
