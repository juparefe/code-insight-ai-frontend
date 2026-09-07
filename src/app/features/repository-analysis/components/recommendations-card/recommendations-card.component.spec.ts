import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsCardComponent } from './recommendations-card.component';
import { Recommendation } from '../../models/repository-analysis.model';

describe('RecommendationsCardComponent', () => {
  let fixture: ComponentFixture<RecommendationsCardComponent>;
  let component: RecommendationsCardComponent;

  const recommendations: Recommendation[] = [
    {
      priority: 'HIGH',
      title: 'Rotar credenciales',
      description: 'Generar nuevas claves y revocar las expuestas.',
      reason: 'Las claves actuales están comprometidas.',
    },
    {
      priority: 'LOW',
      title: 'Agregar linter',
      description: 'Configurar ESLint en CI.',
      reason: 'Homogeneiza el estilo del código.',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationsCardComponent);
    component = fixture.componentInstance;
  });

  it('GIVEN the default inputs, WHEN the component renders, then the instance is created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('GIVEN known and unknown priorities, WHEN getPriorityLabel is called, then known priorities are translated and unknown ones returned unchanged', () => {
    expect(component.getPriorityLabel('HIGH')).toBe('Alta');
    expect(component.getPriorityLabel('MEDIUM')).toBe('Media');
    expect(component.getPriorityLabel('LOW')).toBe('Baja');
    expect(component.getPriorityLabel('CRITICAL')).toBe('CRITICAL');
  });

  it('GIVEN a list of recommendations, WHEN the component renders, then each recommendation article carries its priority modifier class', () => {
    component.recommendations = recommendations;
    fixture.detectChanges();

    const articles = fixture.nativeElement.querySelectorAll(
      'article.recommendation',
    );
    expect(articles).toHaveLength(2);
    expect(articles[0].classList).toContain('recommendation-high');
    expect(articles[1].classList).toContain('recommendation-low');
    expect(articles[0].querySelector('.reason p')?.textContent).toContain(
      'Las claves actuales están comprometidas.',
    );
  });

  it('GIVEN an empty recommendations list, WHEN the component renders, then the empty state message is displayed', () => {
    component.recommendations = [];
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.querySelector('article.recommendation')).toBeNull();
    expect(host.querySelector('.empty-state')?.textContent).toContain(
      'No se generaron recomendaciones para este repositorio.',
    );
  });
});
