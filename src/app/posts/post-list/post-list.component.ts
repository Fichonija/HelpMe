import { Component, OnInit, OnDestroy } from "@angular/core";

import { Post } from "../post.model";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";

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
    private authService: AuthService
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
}
