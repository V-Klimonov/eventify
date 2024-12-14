import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  standalone: true,
  imports: [],
  templateUrl: './svg.component.html',
  styleUrl: './svg.component.scss'
})
export class SvgComponent {
  @Input() svg!: string;
  @Input() height: string = "auto";
  @Input() width: string = "auto";
  @Input() fill: string = "#EB42E7";
}
