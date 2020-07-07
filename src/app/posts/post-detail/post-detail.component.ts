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
  slug: string;

  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get("slug");
    });
  }

  ngOnInit() {
    this.post = this.postService.getSelectedPost();
    if (this.post == null) {
      this.postService
        .getPostsByAttribute("slug", this.slug)
        .subscribe((posts) => {
          this.post = posts.pop();
        });
    }
  }
}
