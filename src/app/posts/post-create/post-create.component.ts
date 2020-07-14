import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { PostService } from "../post.service";
import { Post } from "../post.model";
import { PostCreateDialogComponent } from "./post-create-dialog/post-create-dialog.component";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent {
  public editor = ClassicEditor;
  public editorConfig = {
    placeholder: "Post content",
  };
  public editorContent = "";

  public postForm: FormGroup = new FormGroup({
    postTitle: new FormControl(""),
    postSummary: new FormControl(""),
    postSlug: new FormControl(""),
  });

  constructor(
    private postService: PostService,
    public postCreateDialog: MatDialog
  ) {}

  onSavePost() {
    const dialogRef = this.postCreateDialog.open(PostCreateDialogComponent, {
      width: "500px",
      data: { postTitle: this.postForm.value.postTitle },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        let newPost: Post = {
          id: "",
          title: this.postForm.get("postTitle").value,
          summary: this.postForm.get("postSummary").value,
          slug: this.postForm.get("postSlug").value,
          content: this.editorContent,
        };
        this.postService.addPost(newPost);
      }
    });
  }
}
