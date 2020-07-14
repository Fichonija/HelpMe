import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./auth/auth.guard";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostDetailComponent } from "./posts/post-detail/post-detail.component";
import { LoginComponent } from "./auth/login/login.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "posts", component: PostListComponent },
  {
    path: "posts/create",
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: "posts/:slug", component: PostDetailComponent },
  { path: "", component: PostListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
