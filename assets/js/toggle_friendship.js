document.getElementById('toggleFriendButton').addEventListener('click', function() {
    const button = this;
    const friendId = button.getAttribute('data-friend-id');

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Please wait...';


    fetch('/friendships/toggle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({friendId}),
    })
    .then(response => response.json())
    .then(data => {
        // check the response message and update the button text accordingly
        if(data.message.toLowerCase().includes('added')){
            button.textContent = 'Remove Friend';
        }else if(data.message.toLowerCase().includes('removed')) {
            button.textContent = 'Add Friend';
        }else{
            button.textContent = originalText;
        }
        // alert(data.message);
        // console.log('Success:', data); 
    })
    .catch((error) => {
        console.error('Error:', error);
        button.textContent = originalText;
        alert('An error occurred. Please try again later.');
    })
    .finally(() => {
        button.disabled = false;
    });
});