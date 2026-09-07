import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureCardComponent } from './architecture-card.component';
import { ArchitectureAnalysis } from '../../models/repository-analysis.model';

describe('ArchitectureCardComponent', () => {
  let fixture: ComponentFixture<ArchitectureCardComponent>;
  let component: ArchitectureCardComponent;

  const architecture: ArchitectureAnalysis = {
    pattern: 'HEXAGONAL',
    confidence: 0.736,
    evidence: ['Puertos y adaptadores', 'Carpeta application/ports'],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchitectureCardComponent);
    component = fixture.componentInstance;
    component.architecture = architecture;
    fixture.detectChanges();
  });

  it('GIVEN an architecture input, WHEN the component renders, then the instance is created', () => {
    expect(component).toBeTruthy();
  });

  it('GIVEN a fractional confidence of 0.736, WHEN confidencePercentage is read, then it returns 74', () => {
    expect(component.confidencePercentage).toBe(74);
  });

  it('GIVEN the known pattern HEXAGONAL, WHEN architectureLabel is read, then it returns "Arquitectura Hexagonal"', () => {
    expect(component.architectureLabel).toBe('Arquitectura Hexagonal');
  });

  it('GIVEN a pattern missing from the label map, WHEN architectureLabel is read, then it returns the raw pattern', () => {
    component.architecture = { ...architecture, pattern: 'SPACE_BASED' as never };
    expect(component.architectureLabel).toBe('SPACE_BASED');
  });

  it('GIVEN an architecture input, WHEN the component renders, then the label, percentage and every evidence item are displayed', () => {
    const host: HTMLElement = fixture.nativeElement;

    expect(host.querySelector('h2')?.textContent).toContain(
      'Arquitectura Hexagonal',
    );
    expect(host.querySelector('.confidence-header strong')?.textContent).toContain(
      '74%',
    );

    const items = Array.from(host.querySelectorAll('.evidence li')).map((li) =>
      li.textContent?.trim(),
    );
    expect(items).toEqual([
      'Puertos y adaptadores',
      'Carpeta application/ports',
    ]);
  });
});
