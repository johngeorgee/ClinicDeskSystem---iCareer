import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  title = input.required<string>();
  value = input.required<string | number>();
  icon = input<string>('');
  trend = input<string>('');
  trendDirection = input<'up' | 'down' | 'neutral'>('neutral');
}
