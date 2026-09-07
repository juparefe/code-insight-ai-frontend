import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { RepositoryAnalysisComponent } from './repository-analysis.component';
import { RepositoryAnalysisService } from '../../services/repository-analysis.service';
import { AnalyzeRepositoryRequest } from '../../models/analyze-repository-request.model';
import {
  AnalysisStatus,
  RepositoryAnalysis,
} from '../../models/repository-analysis.model';
import { createMockAnalysis } from '../../testing/mock-analysis';

describe('RepositoryAnalysisComponent', () => {
  let fixture: ComponentFixture<RepositoryAnalysisComponent>;
  let component: RepositoryAnalysisComponent;
  let analyze$: Subject<RepositoryAnalysis>;
  let serviceSpy: { analyze: ReturnType<typeof vi.fn> };

  const request: AnalyzeRepositoryRequest = {
    source: { type: 'GITHUB', url: 'https://github.com/acme/tasks' },
  };

  beforeEach(async () => {
    analyze$ = new Subject<RepositoryAnalysis>();
    serviceSpy = { analyze: vi.fn().mockReturnValue(analyze$.asObservable()) };

    await TestBed.configureTestingModule({
      imports: [RepositoryAnalysisComponent],
      providers: [
        { provide: RepositoryAnalysisService, useValue: serviceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('GIVEN the page component, WHEN it is created, then the instance exists', () => {
    expect(component).toBeTruthy();
  });

  it('GIVEN a freshly created page, WHEN no analysis has run, then the status is IDLE', () => {
    expect(component.status()).toBe(AnalysisStatus.IDLE);
  });

  it('GIVEN an analyze request, WHEN analyzeRepository is called, then the status is LOADING and the service receives the request', () => {
    component.analyzeRepository(request);

    expect(serviceSpy.analyze).toHaveBeenCalledWith(request);
    expect(component.status()).toBe(AnalysisStatus.LOADING);
    expect(component.analysisResult).toBeNull();
    expect(component.errorMessage).toBeNull();
  });

  it('GIVEN an in-flight analysis, WHEN the service emits a result, then the status is SUCCESS and the result is stored', () => {
    const analysis = createMockAnalysis();
    component.analyzeRepository(request);

    analyze$.next(analysis);

    expect(component.status()).toBe(AnalysisStatus.SUCCESS);
    expect(component.analysisResult).toBe(analysis);
  });

  it('GIVEN a successful analysis, WHEN the view renders, then the result cards are displayed', () => {
    component.analyzeRepository(request);
    analyze$.next(createMockAnalysis());
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    expect(host.querySelector('app-analysis-summary')).not.toBeNull();
    expect(host.querySelector('app-architecture-card')).not.toBeNull();
    expect(host.querySelector('app-recommendations-card')).not.toBeNull();
  });

  it('GIVEN an in-flight analysis, WHEN the service errors with a body message, then the status is ERROR and that message is used', () => {
    component.analyzeRepository(request);

    analyze$.error({ status: 422, error: { message: 'Repo privado' } });

    expect(component.status()).toBe(AnalysisStatus.ERROR);
    expect(component.errorMessage).toBe('Repo privado');
  });

  it('GIVEN an error carrying a nested error.message, WHEN the analysis fails, then the nested message is used', () => {
    component.analyzeRepository(request);

    analyze$.error({ error: { error: { message: 'Timeout al clonar' } } });

    expect(component.errorMessage).toBe('Timeout al clonar');
  });

  it('GIVEN an error with a plain string body, WHEN the analysis fails, then the string is used as the message', () => {
    component.analyzeRepository(request);

    analyze$.error({ error: 'Falla cruda' });

    expect(component.errorMessage).toBe('Falla cruda');
  });

  it('GIVEN an error with an unusable body but a status, WHEN the analysis fails, then a status-based message is used', () => {
    component.analyzeRepository(request);

    analyze$.error({ status: 500, error: null });

    expect(component.errorMessage).toBe('El backend respondió con el estado 500.');
  });

  it('GIVEN an error with neither a usable body nor a status, WHEN the analysis fails, then a generic message is used', () => {
    component.analyzeRepository(request);

    analyze$.error({ error: null });

    expect(component.errorMessage).toBe('No fue posible analizar el repositorio.');
  });

  it('GIVEN a failed analysis, WHEN the view renders, then the error message is displayed', () => {
    component.analyzeRepository(request);
    analyze$.error({ status: 404, error: { message: 'No encontrado' } });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No encontrado');
  });
});
