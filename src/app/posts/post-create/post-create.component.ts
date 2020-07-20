import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { PostService } from "../post.service";
import { Post } from "../post.model";
import { AdminCrudDialogComponent } from "src/app/utility/dialogs/admin-crud-dialog.component";
import { ActivatedRoute, UrlSegment } from "@angular/router";
import { stringify } from "querystring";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  public loading: boolean = false;
  public postCreated: boolean = false;

  public actionType: string;
  public postForEdit: Post;

  public dialogTitle: string;
  public dialogAction: string;

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
    public postCreateDialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url.subscribe((urlSegments: UrlSegment[]) => {
      this.actionType = urlSegments.pop().path;
      if (this.actionType == "edit") {
        this.postForEdit = this.postService.getPostForEdit();
        this.dialogTitle = "Update Post?";
        this.dialogAction = "update post";

        this.postForm.setValue({
          postTitle: this.postForEdit.title,
          postSummary: this.postForEdit.summary,
          postSlug: this.postForEdit.slug,
        });
        this.editorContent = this.postForEdit.content;
      } else if (this.actionType == "create") {
        this.dialogTitle = "Create new Post?";
        this.dialogAction = "create new post";
      }
    });
  }

  onSavePost() {
    const dialogRef = this.postCreateDialog.open(AdminCrudDialogComponent, {
      width: "500px",
      data: {
        title: this.dialogTitle,
        action: this.dialogAction,
        model: { title: this.postForm.value.postTitle },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.actionType == "create") {
          this.createNewPost();
        } else if (this.actionType == "edit") {
          this.editSelectedPost();
        }
      }
    });
  }

  private createNewPost() {
    this.loading = true;

    let newPost: Post = {
      id: "",
      title: this.postForm.get("postTitle").value,
      summary: this.postForm.get("postSummary").value,
      slug: this.postForm.get("postSlug").value,
      content: this.editorContent,
    };
    this.postService.addPost(newPost).subscribe((res) => {
      this.postCreated = true;
      this.loading = false;
    });
  }

  private editSelectedPost() {
    this.loading = true;

    let editedPost: Post = {
      id: "",
      title: this.postForm.get("postTitle").value,
      summary: this.postForm.get("postSummary").value,
      slug: this.postForm.get("postSlug").value,
      content: this.editorContent,
    };
    this.postService
      .updatePost(this.postForEdit.id, editedPost)
      .subscribe((response) => {
        this.postCreated = true;
        this.loading = false;
      });
  }
}
