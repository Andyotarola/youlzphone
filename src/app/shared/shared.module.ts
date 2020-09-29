import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OverlayComponent } from 'src/app/shared/components/overlay.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [OverlayComponent, FooterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule
  ],
  exports:[
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    OverlayComponent,
    FooterComponent
  ]
})
export class SharedModule { }
