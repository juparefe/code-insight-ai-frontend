import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryInputComponent } from './repository-input.component';

describe('RepositoryInput', () => {
  let component: RepositoryInputComponent;
  let fixture: ComponentFixture<RepositoryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
