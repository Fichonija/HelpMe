import { Component, OnInit, OnDestroy } from "@angular/core";

import { Post } from "../post.model";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  posts: Post[];
  private postsSubscription: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loading = true;

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
  }

  onPostSelected(post: Post) {
    this.postService.setSelectedPost(post);
  }
}
