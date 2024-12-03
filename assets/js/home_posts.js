{
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
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    console.log(data);
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        });
    }
    // method to create a POST in DOM.
    let newPostDom = function(post){
        return $(`<li class="post" id="post-${ post._id }">
                    <small style="display: flex;justify-content: space-between;">
                        <b>${ post.user.name }:</b>
                        <b><a class="delete-post-button" href="posts/destroy/${ post.id }"><i class="fa-solid fa-trash"></i></a></b>
                    </small>
                    
                    ${ post.content }
                    <div class="post-comments">
                        <form action="/comments/create" method="post" class="comment-form">
                            <input type="text" name="content" placeholder="Type here to add comment" required>
                            <input type="hidden" name="post" value="${ post._id }">
                            <input type="submit" value="Add Comment">
                        </form>

                        <div class="post-comments-list">
                            <ul id="post-comments-${ post.id }">
                            </ul>
                        </div>
                    </div>
                </li>`)
    }
    createPost()
}


