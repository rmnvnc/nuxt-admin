import benefits from '@@/data/benefits.json'
import type { Benefit } from '@/types/benefitType'

export default defineEventHandler(() => benefits as Benefit[])