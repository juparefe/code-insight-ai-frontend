import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindingsCardComponent } from './findings-card.component';

describe('FindingsCardComponent', () => {
  let component: FindingsCardComponent;
  let fixture: ComponentFixture<FindingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindingsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FindingsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
