import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsCardComponent } from './components-card.component';
import { ComponentAnalysis } from '../../models/repository-analysis.model';

describe('ComponentsCardComponent', () => {
  let fixture: ComponentFixture<ComponentsCardComponent>;
  let component: ComponentsCardComponent;

  const components: ComponentAnalysis[] = [
    {
      type: 'CONTROLLER',
      name: 'TasksController',
      path: 'src/tasks/tasks.controller.ts',
      responsibility: 'Expone endpoints de tareas.',
      evidence: ['@Controller("tasks")'],
    },
    {
      type: 'CUSTOM_TYPE',
      name: 'Thing',
      path: 'src/thing.ts',
      responsibility: 'Sin mapeo.',
      evidence: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentsCardComponent);
    component = fixture.componentInstance;
  });

  it('GIVEN the default inputs, WHEN the component renders, then the instance is created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('GIVEN known and unknown component types, WHEN getComponentTypeLabel is called, then known types are translated and unknown ones returned unchanged', () => {
    expect(component.getComponentTypeLabel('REPOSITORY')).toBe('Repositorio');
    expect(component.getComponentTypeLabel('DATABASE_CONNECTION')).toBe(
      'Conexión de base de datos',
    );
    expect(component.getComponentTypeLabel('CUSTOM_TYPE')).toBe('CUSTOM_TYPE');
  });

  it('GIVEN a list of components, WHEN the component renders, then one article per component is displayed with its translated type', () => {
    component.components = components;
    fixture.detectChanges();

    const articles = fixture.nativeElement.querySelectorAll('article.component');
    expect(articles).toHaveLength(2);
    expect(articles[0].querySelector('.component-type')?.textContent).toContain(
      'Controlador',
    );
    expect(articles[0].querySelector('.component-path')?.textContent).toContain(
      'src/tasks/tasks.controller.ts',
    );
  });

  it('GIVEN an empty components list, WHEN the component renders, then the empty state message is displayed', () => {
    component.components = [];
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.querySelector('article.component')).toBeNull();
    expect(host.querySelector('.empty-state')?.textContent).toContain(
      'No se detectaron componentes relevantes.',
    );
  });
});
