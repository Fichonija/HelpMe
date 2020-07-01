import { Component } from '@angular/core';

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostsComponent{

  posts = [
    { title: 'First Blog post', summary: 'First blog post summary is awesome.' },
    { title: 'Second Blog post', summary: 'Second blog post summary is awesome.' },
    { title: 'Third Blog post', summary: 'Third blog post summary is awesome.' }
  ]

  onPostClicked(){
    alert("Post Clicked!");
  }
}
