import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryAnalysisComponent } from './repository-analysis.component';

describe('RepositoryAnalysisComponent', () => {
  let component: RepositoryAnalysisComponent;
  let fixture: ComponentFixture<RepositoryAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryAnalysisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryAnalysisComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
