import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendationsCardComponent } from './recommendations-card.component';

describe('RecommendationsCard', () => {
  let component: RecommendationsCardComponent;
  let fixture: ComponentFixture<RecommendationsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
