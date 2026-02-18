/**
 * Данные для расчета веса двутавров и швеллеров по ГОСТам
 * Вес рассчитывается как: вес_на_метр × длина × количество
 */

/** Тип двутавра */
export type IBeamType = 'sloped' | 'normal' | 'wide' | 'column' | 'additional' | 'welded';

/** Тип швеллера */
export type ChannelType = 'sloped' | 'parallel' | 'economy' | 'light' | 'special';

/** Информация о типе двутавра */
export interface IBeamTypeInfo {
  id: IBeamType;
  name: string;
  shortName: string;
  gost: string;
}

/** Информация о типе швеллера */
export interface ChannelTypeInfo {
  id: ChannelType;
  name: string;
  shortName: string;
  gost: string;
}

/** Номер балки/швеллера с весом на метр (кг/м) */
export interface BeamNumber {
  id: string;
  number: string | number;
  weightPerMeter: number; // кг/м
}

/** Данные по типу двутавра */
export interface IBeamTypeData {
  type: IBeamTypeInfo;
  numbers: BeamNumber[];
}

/** Данные по типу швеллера */
export interface ChannelTypeData {
  type: ChannelTypeInfo;
  numbers: BeamNumber[];
}

/** Типы двутавров */
export const iBeamTypes: IBeamTypeInfo[] = [
  { id: 'sloped', name: 'Двутавр с уклоном полок', shortName: '', gost: 'ГОСТ 8239-89' },
  { id: 'normal', name: 'Нормальный двутавр', shortName: 'Б', gost: 'ГОСТ 26020-83' },
  { id: 'wide', name: 'Широкополочный двутавр', shortName: 'Ш', gost: 'ГОСТ 26020-83' },
  { id: 'column', name: 'Колонный двутавр', shortName: 'К', gost: 'ГОСТ 26020-83' },
  { id: 'additional', name: 'Двутавр дополнительной серии', shortName: 'Д', gost: 'ГОСТ 26020-83' },
  { id: 'welded', name: 'Сварной двутавр', shortName: 'С', gost: 'ГОСТ 26020-83' },
];

/** Типы швеллеров */
export const channelTypes: ChannelTypeInfo[] = [
  { id: 'sloped', name: 'С уклоном внутренних граней полок', shortName: 'У', gost: 'ГОСТ 8240-97' },
  { id: 'parallel', name: 'С параллельными гранями полок', shortName: 'П', gost: 'ГОСТ 8240-97' },
  { id: 'economy', name: 'Экономичные с параллельными гранями полок', shortName: 'Э', gost: 'ГОСТ 8240-97' },
  { id: 'light', name: 'Легкой серии с параллельными гранями полок', shortName: 'Л', gost: 'ГОСТ 8240-97' },
  { id: 'special', name: 'Специальные', shortName: 'С', gost: 'ГОСТ 8240-97' },
];

/** Моковые данные для двутавров с уклоном полок (ГОСТ 8239-89) */
const iBeamSlopedNumbers: BeamNumber[] = [
  { id: '10', number: 10, weightPerMeter: 9.46 },
  { id: '12', number: 12, weightPerMeter: 11.5 },
  { id: '14', number: 14, weightPerMeter: 13.7 },
  { id: '16', number: 16, weightPerMeter: 15.9 },
  { id: '18', number: 18, weightPerMeter: 18.4 },
  { id: '20', number: 20, weightPerMeter: 21.0 },
  { id: '22', number: 22, weightPerMeter: 24.0 },
  { id: '24', number: 24, weightPerMeter: 27.3 },
  { id: '27', number: 27, weightPerMeter: 31.5 },
  { id: '30', number: 30, weightPerMeter: 36.5 },
  { id: '33', number: 33, weightPerMeter: 42.2 },
  { id: '36', number: 36, weightPerMeter: 48.6 },
  { id: '40', number: 40, weightPerMeter: 57.0 },
  { id: '45', number: 45, weightPerMeter: 66.5 },
  { id: '50', number: 50, weightPerMeter: 78.5 },
  { id: '55', number: 55, weightPerMeter: 89.8 },
  { id: '60', number: 60, weightPerMeter: 108.0 },
];

/** Моковые данные для нормальных двутавров (Б) */
const iBeamNormalNumbers: BeamNumber[] = [
  { id: '10Б', number: '10Б', weightPerMeter: 8.1 },
  { id: '12Б', number: '12Б', weightPerMeter: 10.4 },
  { id: '14Б', number: '14Б', weightPerMeter: 12.3 },
  { id: '16Б', number: '16Б', weightPerMeter: 14.5 },
  { id: '18Б', number: '18Б', weightPerMeter: 16.8 },
  { id: '20Б', number: '20Б', weightPerMeter: 19.2 },
  { id: '22Б', number: '22Б', weightPerMeter: 21.7 },
  { id: '24Б', number: '24Б', weightPerMeter: 24.2 },
  { id: '26Б', number: '26Б', weightPerMeter: 26.8 },
  { id: '28Б', number: '28Б', weightPerMeter: 29.4 },
  { id: '30Б', number: '30Б', weightPerMeter: 32.0 },
  { id: '32Б', number: '32Б', weightPerMeter: 34.8 },
  { id: '35Б', number: '35Б', weightPerMeter: 38.2 },
  { id: '40Б', number: '40Б', weightPerMeter: 43.5 },
  { id: '45Б', number: '45Б', weightPerMeter: 49.0 },
  { id: '50Б', number: '50Б', weightPerMeter: 54.5 },
];

/** Моковые данные для широкополочных двутавров (Ш) */
const iBeamWideNumbers: BeamNumber[] = [
  { id: '20Ш1', number: '20Ш1', weightPerMeter: 22.4 },
  { id: '25Ш1', number: '25Ш1', weightPerMeter: 29.2 },
  { id: '30Ш1', number: '30Ш1', weightPerMeter: 36.5 },
  { id: '35Ш1', number: '35Ш1', weightPerMeter: 43.7 },
  { id: '40Ш1', number: '40Ш1', weightPerMeter: 51.2 },
  { id: '45Ш1', number: '45Ш1', weightPerMeter: 59.5 },
  { id: '50Ш1', number: '50Ш1', weightPerMeter: 68.2 },
  { id: '20Ш2', number: '20Ш2', weightPerMeter: 25.8 },
  { id: '25Ш2', number: '25Ш2', weightPerMeter: 33.1 },
  { id: '30Ш2', number: '30Ш2', weightPerMeter: 40.5 },
  { id: '35Ш2', number: '35Ш2', weightPerMeter: 48.0 },
  { id: '40Ш2', number: '40Ш2', weightPerMeter: 55.8 },
  { id: '45Ш2', number: '45Ш2', weightPerMeter: 64.4 },
  { id: '50Ш2', number: '50Ш2', weightPerMeter: 73.3 },
];

/** Моковые данные для колонных двутавров (К) */
const iBeamColumnNumbers: BeamNumber[] = [
  { id: '20К1', number: '20К1', weightPerMeter: 26.8 },
  { id: '20К2', number: '20К2', weightPerMeter: 30.6 },
  { id: '25К1', number: '25К1', weightPerMeter: 33.8 },
  { id: '25К2', number: '25К2', weightPerMeter: 38.2 },
  { id: '30К1', number: '30К1', weightPerMeter: 41.2 },
  { id: '30К2', number: '30К2', weightPerMeter: 46.5 },
  { id: '35К1', number: '35К1', weightPerMeter: 48.6 },
  { id: '35К2', number: '35К2', weightPerMeter: 54.5 },
  { id: '40К1', number: '40К1', weightPerMeter: 57.0 },
  { id: '40К2', number: '40К2', weightPerMeter: 64.2 },
];

/** Моковые данные для двутавров дополнительной серии (Д) */
const iBeamAdditionalNumbers: BeamNumber[] = [
  { id: '20Д', number: '20Д', weightPerMeter: 20.7 },
  { id: '25Д', number: '25Д', weightPerMeter: 25.8 },
  { id: '30Д', number: '30Д', weightPerMeter: 31.2 },
  { id: '35Д', number: '35Д', weightPerMeter: 37.0 },
  { id: '40Д', number: '40Д', weightPerMeter: 43.2 },
  { id: '45Д', number: '45Д', weightPerMeter: 49.8 },
  { id: '50Д', number: '50Д', weightPerMeter: 56.8 },
];

/** Моковые данные для сварных двутавров (С) */
const iBeamWeldedNumbers: BeamNumber[] = [
  { id: '20С', number: '20С', weightPerMeter: 19.8 },
  { id: '25С', number: '25С', weightPerMeter: 24.5 },
  { id: '30С', number: '30С', weightPerMeter: 29.8 },
  { id: '35С', number: '35С', weightPerMeter: 35.2 },
  { id: '40С', number: '40С', weightPerMeter: 41.0 },
  { id: '45С', number: '45С', weightPerMeter: 47.2 },
  { id: '50С', number: '50С', weightPerMeter: 53.8 },
];

/** Данные по типам двутавров */
export const iBeamTypeData: IBeamTypeData[] = [
  { type: iBeamTypes[0], numbers: iBeamSlopedNumbers },
  { type: iBeamTypes[1], numbers: iBeamNormalNumbers },
  { type: iBeamTypes[2], numbers: iBeamWideNumbers },
  { type: iBeamTypes[3], numbers: iBeamColumnNumbers },
  { type: iBeamTypes[4], numbers: iBeamAdditionalNumbers },
  { type: iBeamTypes[5], numbers: iBeamWeldedNumbers },
];

/** Моковые данные для швеллеров с уклоном (У) */
const channelSlopedNumbers: BeamNumber[] = [
  { id: '5У', number: 5, weightPerMeter: 4.84 },
  { id: '6.5У', number: 6.5, weightPerMeter: 5.90 },
  { id: '8У', number: 8, weightPerMeter: 7.05 },
  { id: '10У', number: 10, weightPerMeter: 8.59 },
  { id: '12У', number: 12, weightPerMeter: 10.4 },
  { id: '14У', number: 14, weightPerMeter: 12.3 },
  { id: '16У', number: 16, weightPerMeter: 14.2 },
  { id: '18У', number: 18, weightPerMeter: 16.3 },
  { id: '20У', number: 20, weightPerMeter: 18.4 },
  { id: '22У', number: 22, weightPerMeter: 21.0 },
  { id: '24У', number: 24, weightPerMeter: 24.0 },
  { id: '27У', number: 27, weightPerMeter: 27.7 },
  { id: '30У', number: 30, weightPerMeter: 31.8 },
  { id: '33У', number: 33, weightPerMeter: 36.5 },
  { id: '36У', number: 36, weightPerMeter: 41.9 },
  { id: '40У', number: 40, weightPerMeter: 48.3 },
];

/** Моковые данные для швеллеров с параллельными гранями (П) */
const channelParallelNumbers: BeamNumber[] = [
  { id: '5П', number: '5П', weightPerMeter: 4.84 },
  { id: '6.5П', number: '6.5П', weightPerMeter: 5.90 },
  { id: '8П', number: '8П', weightPerMeter: 7.05 },
  { id: '10П', number: '10П', weightPerMeter: 8.59 },
  { id: '12П', number: '12П', weightPerMeter: 10.4 },
  { id: '14П', number: '14П', weightPerMeter: 12.3 },
  { id: '16П', number: '16П', weightPerMeter: 14.2 },
  { id: '18П', number: '18П', weightPerMeter: 16.3 },
  { id: '20П', number: '20П', weightPerMeter: 18.4 },
  { id: '22П', number: '22П', weightPerMeter: 21.0 },
  { id: '24П', number: '24П', weightPerMeter: 24.0 },
  { id: '27П', number: '27П', weightPerMeter: 27.7 },
  { id: '30П', number: '30П', weightPerMeter: 31.8 },
  { id: '33П', number: '33П', weightPerMeter: 36.5 },
  { id: '36П', number: '36П', weightPerMeter: 41.9 },
  { id: '40П', number: '40П', weightPerMeter: 48.3 },
];

/** Моковые данные для экономичных швеллеров (Э) */
const channelEconomyNumbers: BeamNumber[] = [
  { id: '20Э', number: '20Э', weightPerMeter: 17.4 },
  { id: '25Э', number: '25Э', weightPerMeter: 22.0 },
  { id: '30Э', number: '30Э', weightPerMeter: 27.0 },
  { id: '35Э', number: '35Э', weightPerMeter: 32.0 },
  { id: '40Э', number: '40Э', weightPerMeter: 37.8 },
];

/** Моковые данные для легких швеллеров (Л) */
const channelLightNumbers: BeamNumber[] = [
  { id: '16Л', number: '16Л', weightPerMeter: 12.6 },
  { id: '18Л', number: '18Л', weightPerMeter: 14.2 },
  { id: '20Л', number: '20Л', weightPerMeter: 16.0 },
  { id: '22Л', number: '22Л', weightPerMeter: 18.0 },
  { id: '24Л', number: '24Л', weightPerMeter: 20.2 },
  { id: '27Л', number: '27Л', weightPerMeter: 23.0 },
  { id: '30Л', number: '30Л', weightPerMeter: 26.0 },
];

/** Моковые данные для специальных швеллеров (С) */
const channelSpecialNumbers: BeamNumber[] = [
  { id: '20С', number: '20С', weightPerMeter: 19.8 },
  { id: '25С', number: '25С', weightPerMeter: 24.5 },
  { id: '30С', number: '30С', weightPerMeter: 29.8 },
  { id: '35С', number: '35С', weightPerMeter: 35.2 },
  { id: '40С', number: '40С', weightPerMeter: 41.0 },
];

/** Данные по типам швеллеров */
export const channelTypeData: ChannelTypeData[] = [
  { type: channelTypes[0], numbers: channelSlopedNumbers },
  { type: channelTypes[1], numbers: channelParallelNumbers },
  { type: channelTypes[2], numbers: channelEconomyNumbers },
  { type: channelTypes[3], numbers: channelLightNumbers },
  { type: channelTypes[4], numbers: channelSpecialNumbers },
];

/** Получить данные по типу двутавра */
export function getIBeamTypeData(typeId: IBeamType): IBeamTypeData | undefined {
  return iBeamTypeData.find((d) => d.type.id === typeId);
}

/** Получить данные по типу швеллера */
export function getChannelTypeData(typeId: ChannelType): ChannelTypeData | undefined {
  return channelTypeData.find((d) => d.type.id === typeId);
}

/** Получить вес на метр для двутавра по типу и номеру */
export function getIBeamWeightPerMeter(typeId: IBeamType, numberId: string): number | null {
  const typeData = getIBeamTypeData(typeId);
  if (!typeData) return null;
  const number = typeData.numbers.find((n) => n.id === numberId);
  return number?.weightPerMeter ?? null;
}

/** Получить вес на метр для швеллера по типу и номеру */
export function getChannelWeightPerMeter(typeId: ChannelType, numberId: string): number | null {
  const typeData = getChannelTypeData(typeId);
  if (!typeData) return null;
  const number = typeData.numbers.find((n) => n.id === numberId);
  return number?.weightPerMeter ?? null;
}
