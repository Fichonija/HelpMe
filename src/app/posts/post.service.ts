import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";

import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostService{

  private posts: Post[] = [];
  private postsUpdated: Subject<Post[]> = new Subject<Post[]>();

  constructor(private http: HttpClient) {};

  getPostsUpdatedListener(): Observable<Post[]>{

    return this.postsUpdated.asObservable();
  }

  getPosts(): void{
    this.http.get<{message: string, data: Post[]}>('http://localhost:3000/api/posts').subscribe(
      (res) => {
        this.posts = res.data;
        this.postsUpdated.next(this.posts);
      }
    );
  }

  addPost(post: Post): void{
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
