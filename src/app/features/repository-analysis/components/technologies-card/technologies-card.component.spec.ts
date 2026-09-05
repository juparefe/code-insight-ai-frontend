import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnologiesCardComponent } from './technologies-card.component';

describe('TechnologiesCard', () => {
  let component: TechnologiesCardComponent;
  let fixture: ComponentFixture<TechnologiesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologiesCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologiesCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
