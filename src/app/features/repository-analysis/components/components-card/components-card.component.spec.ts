import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsCardComponent } from './components-card.component';

describe('ComponentsCard', () => {
  let component: ComponentsCardComponent;
  let fixture: ComponentFixture<ComponentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
