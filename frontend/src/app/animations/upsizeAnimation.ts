import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

export const upsizeAnimation = trigger('upsize', [
  transition(':enter', [
    query('.upsize-item', [
      style({ transform: 'scale(1)', opacity: 1 }),
      animate('150ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
      stagger('80ms', [
        animate('200ms ease-out', style({ transform: 'scale(1.2)' })),
        animate('300ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ])
]);