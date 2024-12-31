import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

export const upsizeAnimation = trigger('upsize', [
  transition(':enter', [
    query('.upsize-item', [
      style({ transform: 'scale(1)', opacity: 1 }),
      animate('100ms 100ms', style({})),
      stagger('80ms', [
        animate('0s', style({ transform: 'scale(1)' })),
        animate('200ms ease-out', style({ transform: 'scale({{ scale }})' })),
        animate('300ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ])
]);