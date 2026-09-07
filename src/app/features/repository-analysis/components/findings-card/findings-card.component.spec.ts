import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingsCardComponent } from './findings-card.component';
import { Finding } from '../../models/repository-analysis.model';

describe('FindingsCardComponent', () => {
  let fixture: ComponentFixture<FindingsCardComponent>;
  let component: FindingsCardComponent;

  const findings: Finding[] = [
    {
      severity: 'HIGH',
      category: 'SECURITY',
      title: 'Secretos versionados',
      description: '.env está en git.',
      evidence: ['.env'],
    },
    {
      severity: 'MEDIUM',
      category: 'PERFORMANCE',
      title: 'Consultas N+1',
      description: 'El listado hace una query por fila.',
      evidence: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindingsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FindingsCardComponent);
    component = fixture.componentInstance;
  });

  it('GIVEN the default inputs, WHEN the component renders, then the instance is created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('GIVEN known and unknown severities and categories, WHEN the label helpers are called, then known values are translated and unknown ones returned unchanged', () => {
    expect(component.getSeverityLabel('HIGH')).toBe('Alta');
    expect(component.getSeverityLabel('UNKNOWN')).toBe('UNKNOWN');
    expect(component.getCategoryLabel('MAINTAINABILITY')).toBe('Mantenibilidad');
    expect(component.getCategoryLabel('UNKNOWN')).toBe('UNKNOWN');
  });

  it('GIVEN a list of findings, WHEN the component renders, then each finding article carries its severity modifier class', () => {
    component.findings = findings;
    fixture.detectChanges();

    const articles = fixture.nativeElement.querySelectorAll('article.finding');
    expect(articles).toHaveLength(2);
    expect(articles[0].classList).toContain('finding-high');
    expect(articles[1].classList).toContain('finding-medium');
    expect(articles[0].querySelector('.category')?.textContent).toContain(
      'Seguridad',
    );
  });

  it('GIVEN an empty findings list, WHEN the component renders, then the empty state message is displayed', () => {
    component.findings = [];
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.querySelector('article.finding')).toBeNull();
    expect(host.querySelector('.empty-state')?.textContent).toContain(
      'No se detectaron problemas.',
    );
  });
});
