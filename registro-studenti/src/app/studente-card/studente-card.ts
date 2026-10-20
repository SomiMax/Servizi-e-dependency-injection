import { Component, input, output } from '@angular/core';
import { Studente } from '../modelli/studente';

@Component({
  selector: 'app-studente-card',
  imports: [],
  templateUrl: './studente-card.html',
  styleUrl: './studente-card.css',
  host: { class: 'card d-block' }
})
export class StudenteCard {
  readonly studente = input.required<Studente>();
  readonly azioni = input(true);
  readonly rimosso = output<Studente>();

  rimuovi(): void {
    this.rimosso.emit(this.studente());
  }
}