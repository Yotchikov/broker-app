import { Badge } from '@mantine/core';
import { IconPhone, IconAt, IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import type { ProspectStatus, Prospect } from '../../../data';

const COMMON_BADGE_PROPS = {
  display: 'block',
  variant: 'light',
};

export const PROSPECT_STATUS_LABELS: Record<ProspectStatus, ReactNode> = {
  inquired: (
    <Badge
      color='blue'
      {...COMMON_BADGE_PROPS}
    >
      Интересовался
    </Badge>
  ),
  scheduled_a_showing: (
    <Badge
      color='blue'
      {...COMMON_BADGE_PROPS}
    >
      Назначен показ
    </Badge>
  ),
  feedback_from_the_showing: (
    <Badge
      color='yellow'
      {...COMMON_BADGE_PROPS}
    >
      Фидбек с показа
    </Badge>
  ),
  request_to_the_owner: (
    <Badge
      color='green'
      {...COMMON_BADGE_PROPS}
    >
      Запрос собственнику
    </Badge>
  ),
  bargaining: (
    <Badge
      color='yellow'
      {...COMMON_BADGE_PROPS}
    >
      Торг
    </Badge>
  ),
  contract_discussion: (
    <Badge
      color='yellow'
      {...COMMON_BADGE_PROPS}
    >
      Обсуждение договора
    </Badge>
  ),
  document_preparation: (
    <Badge
      color='blue'
      {...COMMON_BADGE_PROPS}
    >
      Подготовка документов
    </Badge>
  ),
  scheduled_signing: (
    <Badge
      color='yellow'
      {...COMMON_BADGE_PROPS}
    >
      Назначено подписание
    </Badge>
  ),
  deal: (
    <Badge
      color='blue'
      {...COMMON_BADGE_PROPS}
    >
      Сделка
    </Badge>
  ),
  feedback_from_the_deal: (
    <Badge
      color='green'
      {...COMMON_BADGE_PROPS}
    >
      Фидбек со сделки
    </Badge>
  ),
};

export const CONTACT_ICONS: Record<keyof Prospect['contacts'], ReactNode> = {
  phone: <IconPhone size={16} />,
  email: <IconAt size={16} />,
  telegram: <IconBrandTelegram size={16} />,
  whatsapp: <IconBrandWhatsapp size={16} />,
};

export const CONTACT_LABELS: Record<keyof Prospect['contacts'], string> = {
  phone: 'Телефон',
  email: 'Email',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
};

export const CONTACT_LINKS: Record<keyof Prospect['contacts'], string> = {
  phone: 'tel:',
  email: 'mailto:',
  telegram: 'https://t.me/',
  whatsapp: 'https://wa.me/',
};
