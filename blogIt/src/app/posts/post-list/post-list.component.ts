import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({

  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'Fisrt Post', content: 'This is the first post\'s content'},
  //   {title: 'Second Post', content: 'This is the Second post\'s content'},
  //   {title: 'Third Post', content: 'This is the Third post\'s content'}

  // ];

posts: Post[] = [];
isLoading = false;
private  postsSub: Subscription;


  constructor(public postsService: PostsService) {}

  ngOnInit(){
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
    });
  }

  OnDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
