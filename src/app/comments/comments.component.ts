import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CommentService } from '../comment.service';
import { UserService } from '../user.service';
import { CommentDto } from '../comment-dto';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{

  @Input()
  videoId: String = '';

  showCommentSection: boolean = true;
  commentsForm: FormGroup;
  commentsDto: CommentDto[] = [];

  constructor(private commentService: CommentService, private userService: UserService, private matSnackBar: MatSnackBar) {

    this.commentsForm = new FormGroup({ 
      comment: new FormControl('comment'),
    });
  }

  ngOnInit(): void {
    this.getAllComments();
  }


  showCommentButton() {
    this.showCommentSection = true;
  }

  postComment() {
    const commentText: string = this.commentsForm.get('comment')?.value;
    const commentDto = {
      "commentText": commentText,
      "commentAuthor": this.userService.getUserId(),
      "likeCount": 0,
      "disLikeCount": 0
    }
    
    this.commentService.postComment(commentDto, this.videoId)
      .subscribe(() => {
        this.matSnackBar.open("Comment Added Successfully", "OK");
        //this.showCommentSection = false;

        this.commentsForm.get('comment')?.reset();
        this.getAllComments();
      });
  }

  getAllComments(){
    this.commentService.getComments(this.videoId).subscribe(data => { this.commentsDto = data });
  }
}
