import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostService } from "../post.service";
import { Post } from "../post.model";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
})
export class PostDetailComponent implements OnInit {
  post: Post;
  slug: string;

  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.slug = paramMap.get("slug");
    });
  }

  ngOnInit() {
    this.post = this.postService.getSelectedPost();
    if (this.post == null) {
      this.postService
        .getPostsByAttribute("slug", this.slug)
        .subscribe((posts: Post[]) => {
          this.post = posts.pop();
        });
    }
  }
}
