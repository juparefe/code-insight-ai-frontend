import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisSummaryComponent } from './analysis-summary.component';

describe('AnalysisSummaryComponent', () => {
  let fixture: ComponentFixture<AnalysisSummaryComponent>;
  let component: AnalysisSummaryComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalysisSummaryComponent);
    component = fixture.componentInstance;
  });

  it('GIVEN a functionalDescription input, WHEN the component renders, then the instance is created', () => {
    component.functionalDescription = 'Descripción de prueba.';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('GIVEN a functionalDescription input, WHEN the component renders, then the description text is displayed', () => {
    component.functionalDescription =
      'Servicio que sincroniza pedidos con el ERP.';
    fixture.detectChanges();

    const description = fixture.nativeElement.querySelector('.description');
    expect(description?.textContent?.trim()).toBe(
      'Servicio que sincroniza pedidos con el ERP.',
    );
  });
});
