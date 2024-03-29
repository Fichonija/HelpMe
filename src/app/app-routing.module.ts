import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./auth/auth.guard";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostDetailComponent } from "./posts/post-detail/post-detail.component";
import { LoginComponent } from "./auth/login/login.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { WorkshopListComponent } from "./workshops/workshop-list/workshop-list.component";
import { WorkshopDetailComponent } from "./workshops/workshop-detail/workshop-detail.component";
import { WorkshopCreateComponent } from "./workshops/workshop-create/workshop-create.component";
import { GoalsComponent } from "./goals/goals.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "posts", component: PostListComponent },
  {
    path: "posts/create",
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "posts/edit",
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: "posts/:slug", component: PostDetailComponent },
  { path: "", component: PostListComponent },
  { path: "workshops", component: WorkshopListComponent },
  {
    path: "workshops/create",
    component: WorkshopCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "workshops/edit",
    component: WorkshopCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: "workshops/:slug", component: WorkshopDetailComponent },
  { path: "goals", component: GoalsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
