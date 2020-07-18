import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";

import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

import { AppComponent } from "./app.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { PostDetailComponent } from "./posts/post-detail/post-detail.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostCreateDialogComponent } from "./posts/post-create/post-create-dialog/post-create-dialog.component";
import { WorkshopListComponent } from "./workshops/workshop-list/workshop-list.component";
import { WorkshopDetailComponent } from "./workshops/workshop-detail/workshop-detail.component";
import { WorkshopApplyDialogComponent } from "./workshops/workshop-detail/workshop-apply-dialog/workshop-apply-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PostListComponent,
    PostDetailComponent,
    PostCreateComponent,
    PostCreateDialogComponent,
    WorkshopListComponent,
    WorkshopDetailComponent,
    WorkshopApplyDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    CKEditorModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [PostCreateDialogComponent, WorkshopApplyDialogComponent],
})
export class AppModule {}
