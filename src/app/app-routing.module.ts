import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostDetailComponent } from "./posts/post-detail/post-detail.component";

const routes: Routes = [
  { path: "posts", component: PostListComponent },
  { path: "posts/:id", component: PostDetailComponent },
  { path: "", component: PostListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
