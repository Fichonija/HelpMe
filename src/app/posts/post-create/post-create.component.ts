import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { PostService } from "../post.service";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent {
  public editor = ClassicEditor;
  public editorConfig = {
    placeholder: "Post Content",
  };
  public editorContent = "";

  postForm: FormGroup = new FormGroup({
    postTitle: new FormControl(""),
    postSummary: new FormControl(""),
    postSlug: new FormControl(""),
  });

  constructor(private postService: PostService) {}

  onSavePost() {
    console.log(this.postForm);
    console.log(this.editorContent);

    let newPost: Post = {
      id: "",
      title: this.postForm.get("postTitle").value,
      summary: this.postForm.get("postSummary").value,
      slug: this.postForm.get("postSlug").value,
      content: this.editorContent,
    };

    this.postService.addPost(newPost);
  }
}
