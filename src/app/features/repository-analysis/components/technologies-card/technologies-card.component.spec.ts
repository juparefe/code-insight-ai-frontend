import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesCardComponent } from './technologies-card.component';
import { TechnologyAnalysis } from '../../models/repository-analysis.model';

describe('TechnologiesCardComponent', () => {
  let fixture: ComponentFixture<TechnologiesCardComponent>;
  let component: TechnologiesCardComponent;

  const technologies: TechnologyAnalysis[] = [
    {
      name: 'Angular',
      role: 'Framework frontend',
      evidence: ['@angular/core en package.json', 'angular.json'],
    },
    {
      name: 'Vitest',
      role: 'Test runner',
      evidence: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologiesCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologiesCardComponent);
    component = fixture.componentInstance;
  });

  it('GIVEN the default inputs, WHEN the component renders, then the instance is created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('GIVEN a list of technologies, WHEN the component renders, then one card per technology is displayed with its name and role', () => {
    component.technologies = technologies;
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('article.technology');
    expect(cards).toHaveLength(2);
    expect(cards[0].querySelector('h3')?.textContent).toContain('Angular');
    expect(cards[0].querySelector('.role')?.textContent).toContain(
      'Framework frontend',
    );
  });

  it('GIVEN technologies with and without evidence, WHEN the component renders, then the evidence block appears only for those that have evidence', () => {
    component.technologies = technologies;
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('article.technology');
    expect(cards[0].querySelector('.evidence')).not.toBeNull();
    expect(cards[1].querySelector('.evidence')).toBeNull();
  });
});
