import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService{

  private posts: Post[] = [
    { title: 'First Blog post', summary: 'First blog post summary is awesome.' },
    { title: 'Second Blog post', summary: 'Second blog post summary is awesome.' },
    { title: 'Third Blog post', summary: 'Third blog post summary is awesome.' }
  ];
  // posts: Post[];
  private postsUpdated: Subject<Post[]> = new Subject<Post[]>();

  getPostsUpdatedListener(): Observable<Post[]>{
    return this.postsUpdated.asObservable();
  }

  getPosts(): Post[]{
    return [...this.posts];
  }

  addPost(post: Post): void{
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
