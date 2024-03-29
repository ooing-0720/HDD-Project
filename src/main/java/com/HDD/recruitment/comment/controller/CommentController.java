//package com.HDD.recruitment.comment.controller;
//
//import com.HDD.management.webDto.MessageResponse;
//import com.HDD.recruitment.comment.model.Comment;
//import com.HDD.recruitment.comment.service.CommentService;
//import com.HDD.recruitment.comment.webDto.CommentRequest;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RequestMapping("/{boardId}")
//@RestController
//public abstract class CommentController {
//
//    protected CommentService commentService;
//
//    @PostMapping("/comment")
//    public ResponseEntity<?> writeComment(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String boardId, @RequestBody CommentRequest request) throws Exception {
//        Comment comment = new Comment(userDetails.getUsername(), boardId, request);
//        commentService.insertComment(boardId, null, comment);
//        return ResponseEntity.ok(new MessageResponse("댓글이 등록되었습니다"));
//    }
//
//    @PostMapping("/comment/{commentId}")
//    public ResponseEntity<?> writeReply(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String boardId, @PathVariable String commentId, @RequestBody CommentRequest request) throws Exception {
//        Comment comment = new Comment(userDetails.getUsername(), boardId, request);
//        commentService.insertComment(boardId, commentId, comment);
//        return ResponseEntity.ok(new MessageResponse("댓글이 등록되었습니다"));
//    }
//
//    @GetMapping("/{commentId}/cdelete")
//    public ResponseEntity<?> deleteComment(@PathVariable String boardId, @PathVariable String commentId) throws Exception {
//        commentService.deleteComment(boardId, commentId);
//        return ResponseEntity.ok(new MessageResponse("댓글이 삭제되었습니다"));
//    }
//}
