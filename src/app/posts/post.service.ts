import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";

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
    this.http.get<{message: string, data: any}>('http://localhost:3000/api/posts')
    .pipe(map(res => {
      return res.data.map(post => { return { id: post._id, title: post.title, summary: post.summary } })
    }))
    .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
    });
  }

  addPost(post: Post): void{
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post).subscribe(
      (res) => {
        console.log(res.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      }
    );
  }
}
