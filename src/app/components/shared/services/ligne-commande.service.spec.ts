import { TestBed } from '@angular/core/testing';

import { LigneCommandeService } from './ligne-commande.service';

describe('LigneCommandeService', () => {
  let service: LigneCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
