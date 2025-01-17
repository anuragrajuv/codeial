

let createComment = function(postId){
    $(document).on('submit', `#comment-form-${postId}`, function(e) {
        e.preventDefault();
        let newCommentForm = $(this);
        $.ajax({
            type:'post',
            url:'/comments/create',
            data:newCommentForm.serialize(),
            success:function(data){

                let newComment = newCommentDom(data.data.comment);
                $(`#post-comments-${data.data.comment.post._id}`).prepend(newComment);
                deleteComment($(' .delete-comment-button', newComment));
                new ToggleLike($(' .toggle-like-button',newComment));


                new Noty({
                    theme: 'relax',
                    text: "Comment published!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },
            error:function(error){
                console.log(error.responseText);
            }
        })
    })
}

let newCommentDom = function(comment) {
    // console.log("comment:",comment)
    return $(`
        <li id="comment-${ comment._id }">
            <small>
                <b>${comment.user.name}:</b>${comment.content}
                <small>
                    <small>
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">0 Likes</a>
                    </small>
                    <a href="/comments/destroy/${comment._id}" class="delete-comment-button">
                        <i class="fa-solid fa-trash"></i>
                    </a>
                </small>
            </small>
        </li>
    `);
};

let deleteComment = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                $(`#comment-${data.data.comment_id}`).remove();

                new Noty({
                    theme: 'relax',
                    text: "Comment Deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },error: function(error){
                console.log(error.responseText);
            }
        });

    });
}

$(document).ready(function() {
    // Attach delete functionality to all existing delete buttons
     $('.delete-comment-button').each(function() {
        deleteComment(this); // Correctly call the deleteComment function
    });
    
    $('.comment-form').each(function() {
        let postId = $(this).find('input[name="post"]').val(); // Get post ID from the hidden input
        createComment(postId);
    });
});