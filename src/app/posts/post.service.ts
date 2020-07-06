import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Post } from "./post.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class PostService {
  private postEndpoint: string = "http://localhost:3000/api/posts";

  private posts: Post[] = [];
  private postsUpdated: Subject<Post[]> = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPostsUpdatedListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  getPosts(): void {
    this.http
      .get<{ message: string; data: any }>(this.postEndpoint)
      .pipe(
        map((res) => {
          return res.data.map((post) => {
            return this.normalizePost(post);
          });
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string): void {
    this.http
      .get<{ message: string; data: any }>(this.postEndpoint + "/" + id)
      .pipe(
        map((res) => {
          return res.data.map((post) => {
            return this.normalizePost(post);
          });
        })
      );
  }

  addPost(post: Post): void {
    this.http
      .post<{ message: string }>(this.postEndpoint, post)
      .subscribe((res) => {
        console.log(res.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  normalizePost(apiPost: any): Post {
    return {
      id: apiPost._id,
      title: apiPost.title,
      summary: apiPost.summary,
      slug: apiPost.slug,
      content: apiPost.content,
    };
  }
}
