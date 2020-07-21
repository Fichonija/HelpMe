import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

import { Post } from "../post.model";
import { PostService } from "../post.service";
import { AuthService } from "src/app/auth/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { AdminCrudDialogComponent } from "src/app/utility/dialogs/admin-crud-dialog.component";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  private authSubscription: Subscription;
  public userAuthenticated: boolean = false;

  posts: Post[];
  private postsSubscription: Subscription;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    public postDeleteDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getAuthInfo();

    this.postService.getPosts();
    this.postsSubscription = this.postService
      .getPostsUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  getAuthInfo() {
    this.userAuthenticated = this.authService.getIsAuthenticated();
    this.authSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userAuthenticated = isAuthenticated;
      });
  }

  onPostSelected(post: Post) {
    this.postService.setSelectedPost(post);
  }

  onPostEdit(post: Post) {
    this.postService.setPostForEdit(post);
    this.router.navigate(["posts", "edit"]);
  }

  onPostDelete(post: Post) {
    const dialogRef = this.postDeleteDialog.open(AdminCrudDialogComponent, {
      width: "500px",
      data: {
        title: "Delete Post?",
        action: "delete post",
        model: { title: post.title },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true;
        this.postService.deletePost(post.id).subscribe((response) => {
          this.loading = false;
          console.log(response);
        });
      }
    });
  }
}
