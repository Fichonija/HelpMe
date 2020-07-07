import { Component, OnInit } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../post.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
})
export class PostDetailComponent implements OnInit {
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.post = this.postService.getSelectedPost();
    console.log(this.post);
  }
}
