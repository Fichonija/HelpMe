import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostService {
  private postEndpoint: string = "http://localhost:3000/api/posts";

  private posts: Post[] = [];
  private selectedPost: Post = null;
  private postsUpdated: Subject<Post[]> = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

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

  getPostsByAttribute(key: string, value: string): Observable<Post[]> {
    return this.http
      .get<{ message: string; data: any }>(
        this.postEndpoint + "?" + key + "=" + value
      )
      .pipe(
        map((res) => {
          return res.data.map((posts) => {
            if (Array.isArray(posts)) {
              return posts.map((post) => this.normalizePost(post));
            } else {
              return this.normalizePost(posts);
            }
          });
        })
      );
  }

  addPost(post: Post): void {
    this.http
      .post<{ message: string; data: string }>(this.postEndpoint, post)
      .subscribe((res) => {
        console.log(res.message);

        post.id = res.data;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);

        this.router.navigate(["/"]);
      });
  }

  setSelectedPost(post: Post): void {
    this.selectedPost = post;
  }

  getSelectedPost(): Post {
    return this.selectedPost;
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
