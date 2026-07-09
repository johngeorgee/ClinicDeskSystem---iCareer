import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

/**
 * Array of Angular Material modules to be imported by standalone components.
 * This avoids creating a generic feature module (NgModule), keeping the app architecture simple.
 */
export const MATERIAL_IMPORTS = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatChipsModule,
];
