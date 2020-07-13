import { Component } from "@angular/core";

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
})
export class PostCreateComponent {
  public editor = ClassicEditor;
}
