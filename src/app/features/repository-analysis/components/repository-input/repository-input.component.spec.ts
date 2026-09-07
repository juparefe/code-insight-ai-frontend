import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryInputComponent } from './repository-input.component';
import { AnalyzeRepositoryRequest } from '../../models/analyze-repository-request.model';

describe('RepositoryInputComponent', () => {
  let fixture: ComponentFixture<RepositoryInputComponent>;
  let component: RepositoryInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('GIVEN the component under test, WHEN it is created, then the instance exists', () => {
    expect(component).toBeTruthy();
  });

  it('GIVEN a URL padded with whitespace, WHEN submit is called, then a GITHUB request with the trimmed URL is emitted', () => {
    const emitted: AnalyzeRepositoryRequest[] = [];
    component.analyze.subscribe((request) => emitted.push(request));

    component.repositoryUrl = '  https://github.com/acme/tasks  ';
    component.submit();

    expect(emitted).toEqual([
      { source: { type: 'GITHUB', url: 'https://github.com/acme/tasks' } },
    ]);
  });

  it('GIVEN an empty or whitespace-only URL, WHEN submit is called, then no request is emitted', () => {
    const emit = vi.fn();
    component.analyze.subscribe(emit);

    component.repositoryUrl = '';
    component.submit();

    component.repositoryUrl = '    ';
    component.submit();

    expect(emit).not.toHaveBeenCalled();
  });

  it('GIVEN a valid URL, WHEN the form is submitted, then a GITHUB request is emitted', () => {
    const emit = vi.fn();
    component.analyze.subscribe(emit);
    component.repositoryUrl = 'https://github.com/acme/api';
    fixture.detectChanges();

    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(emit).toHaveBeenCalledWith({
      source: { type: 'GITHUB', url: 'https://github.com/acme/api' },
    });
  });
});
