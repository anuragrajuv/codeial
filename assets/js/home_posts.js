// method to submit the form data for new post using AJAx
let createPost = function(){
    let newPostForm = $('#new-post-form');

    newPostForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            url:'/posts/create',
            data: newPostForm.serialize(),
            success: function(data){
                let newPost = newPostDom(data.data);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button',newPost));
                $('#new-post-form>textarea').val("");
                $('#new-post-form>textarea').focus();
                
                createComment(data.data.post._id);

                new Noty({
                    theme: 'relax',
                    text: "Post published!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },
            error:function(error){
                console.log(error.responseText);
            }
        })
    });
}

// method to create a POST in DOM.
let newPostDom = function(data){
    return $(`<li class="post" id="post-${ data.post._id }">
                <small style="display: flex;justify-content: space-between;">
                    <b>${ data.user }:</b>
                    <b><a class="delete-post-button" href="/posts/destroy/${ data.post._id }"><i class="fa-solid fa-trash"></i></a></b>
                </small>
                
                ${ data.post.content }
                <div class="post-comments">
                    <form action="/comments/create" method="post" class="comment-form">
                        <input type="text" name="content" placeholder="Type here to add comment" required>
                        <input type="hidden" name="post" value="${ data.post._id }">
                        <input type="submit" value="Add Comment">
                    </form>

                    <div class="post-comments-list">
                        <ul id="post-comments-${ data.post._id }">
                        </ul>
                    </div>
                </div>
            </li>`)
}


// method to delete a Post from the DOM
let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:"get",
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.data.post_id}`).remove();
                console.log("Post Deleted");
                new Noty({
                    theme: 'relax',
                    text: "Post Deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },
            error:function(err){
                console.log(err.responseText)
            }
        })
    })
}

createPost()


let attachDeleteFunctionality = function() {
    $(".delete-post-button").each(function() {
        deletePost(this); // Attach deletePost to each delete button
    });
};


// Call the function to attach handlers on page load
$(document).ready(function() {
    attachDeleteFunctionality();
});