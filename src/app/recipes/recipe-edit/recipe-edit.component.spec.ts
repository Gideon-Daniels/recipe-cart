import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditComponent } from './recipe-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import {RecipeService} from "../recipe.service";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

fdescribe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  class FakeRecipeService{
    constructor() {
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [RecipeEditComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        BrowserDynamicTestingModule,
        BrowserAnimationsModule],
    providers: [
        { provide: RecipeService, useClass: FakeRecipeService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
