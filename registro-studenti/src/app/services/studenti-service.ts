import { Injectable, computed, signal } from '@angular/core';
import { Studente } from '../modelli/studente';

@Injectable({
  providedIn: 'root'
})
export class StudentiService {
  private readonly dati = signal<Studente[]>([
    { id: 1, nome: 'Davide Sinniscalchi', classe: '5d', mediaVoti: 2 },
    { id: 2, nome: 'Kevin Cheng', classe: '5d', mediaVoti: 9.9 },
    { id: 3, nome: 'James Guevarra', classe: '4f', mediaVoti: 6 },
    { id: 4, nome: 'Nardella Aaron', classe: '1A', mediaVoti: 6.4 },
    { id: 5, nome: 'Sebuniak Sto', classe: '3g', mediaVoti: 7.5 },
  ]);

  readonly studenti = this.dati.asReadonly();
  readonly numero = computed(() => this.dati().length);

  readonly migliore = computed(() => {
    const lista = this.dati();
    if (lista.length === 0) {
      return undefined;
    }
    return lista.reduce((m, s) => (s.mediaVoti > m.mediaVoti ? s : m));
  });

  aggiungi(nome: string, classe: string, mediaVoti: number): Studente {
    const nuovo: Studente = { id: this.prossimoId(), nome: nome, classe: classe, mediaVoti: mediaVoti };
    this.dati.update(lista => [...lista, nuovo]);
    return nuovo;
  }

  rimuovi(id: number): void {
    this.dati.update(lista => lista.filter(s => s.id !== id));
  }

  trova(id: number): Studente | undefined {
    return this.dati().find(s => s.id === id);
  }

  successivo(id: number): Studente | undefined {
    const lista = this.dati();
    const i = lista.findIndex(s => s.id === id);
    if (i === -1) {
      return undefined;
    }
    return lista[(i + 1) % lista.length];
  }

  aggiorna(modificato: Studente): void {
    this.dati.update(lista => lista.map(s => s.id === modificato.id ? modificato : s));
  }

  private prossimoId(): number {
    return Math.max(0, ...this.dati().map(s => s.id)) + 1;
  }
}