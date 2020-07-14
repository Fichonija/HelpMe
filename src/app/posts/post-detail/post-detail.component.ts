import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostService } from "../post.service";
import { Post } from "../post.model";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailComponent implements OnInit {
  loading: boolean = false;

  post: Post;
  slug: string;

  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.slug = paramMap.get("slug");
    });
  }

  ngOnInit() {
    this.loading = true;

    this.post = this.postService.getSelectedPost();
    if (this.post == null) {
      this.postService
        .getPostsByAttribute("slug", this.slug)
        .subscribe((posts: Post[]) => {
          this.loading = false;
          this.post = posts.pop();
        });
    } else {
      this.loading = false;
    }
  }
}
