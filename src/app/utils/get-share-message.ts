import type { Property } from '../../data';
import { getPrice } from '../components';

export const getShareMessage = (property: Property) => {
  return [
    `Объект на ${property.dealType === 'sale' ? 'продажу' : 'аренду'}`,
    property.name,
    property.price ? `Цена: ${getPrice(property.price.amount, property.price.currency)}` : '',
    property.area ? `Площадь: ${property.area / 100} м²` : '',
    property.floor && property.floor.number
      ? `Этаж: ${property.floor.number} ${property.floor.total ? `из ${property.floor.total}` : ''}`
      : '',
    property.links && Object.values(property.links).some((value) => value)
      ? `\nСсылки:\n${Object.values(property.links)
          .filter((value) => value)
          .join(',\n')}`
      : '',
  ]
    .filter(Boolean)
    .join('\n');
};
