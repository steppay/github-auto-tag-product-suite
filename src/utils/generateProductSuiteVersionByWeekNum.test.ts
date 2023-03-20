import { describe, expect, test } from '@jest/globals'
import generateProductSuiteVersionByWeekNum from './generateProductSuiteVersionByWeekNum'

describe('generateProductSuiteVersionByWeekNum', () => {
    test('should return a string', () => {
        const result = generateProductSuiteVersionByWeekNum(new Date('2023-03-21'))
        expect(result).toBe('2023.w12')
    })
})
