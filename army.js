const SUPABASE_URL = "https://jjmidrewoampvuohbmsj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_YoENWRUzTo6u46WWKis6OA_LpxkT8M4";

const supabaseClient =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

const messageInput = document.getElementById("army-message");
const charCount = document.getElementById("char-count");
const feed = document.getElementById("army-feed");
const photoInput = document.getElementById("army-photo");
const photoPreview = document.getElementById("photo-preview");

let selectedPhoto = "";

messageInput.addEventListener("input", () => {
    const length = messageInput.value.length;
    charCount.textContent = `${length}/280`;
    charCount.style.color = length > 280 ? "#b83c3c" : "#777";
});

photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];

    if(!file){
        selectedPhoto = "";
        photoPreview.innerHTML = "";
        return;
    }

    selectedPhoto = file;

    const reader = new FileReader();

    reader.onload = function(e){
        photoPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };

    reader.readAsDataURL(file);
});

async function publishPost(){

    const nameInput = document.getElementById("army-name");
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if(!name){
        alert("Write your name first");
        return;
    }

    if(!message && !selectedPhoto){
        alert("Write something or add a photo first");
        return;
    }

    if(message.length > 280){
        alert("Your post is too long");
        return;
    }

    let imageUrl = null;

    if(selectedPhoto){
        const fileName = `${Date.now()}-${selectedPhoto.name}`;

        const { error: uploadError } = await supabaseClient.storage
            .from("army-posts")
            .upload(fileName, selectedPhoto);

        if(uploadError){
            console.log(uploadError);
            alert("Photo upload failed");
            return;
        }

        imageUrl = supabaseClient.storage
            .from("army-posts")
            .getPublicUrl(fileName)
            .data.publicUrl;
    }

    const { error } = await supabaseClient
        .from("army_posts")
        .insert([
            {
                author: name,
                message: message,
                image_url: imageUrl,
                likes: 0
            }
        ]);

    if(error){
        console.log(error);
        alert("Post failed");
        return;
    }

    nameInput.value = "";
    messageInput.value = "";
    photoInput.value = "";
    selectedPhoto = "";
    photoPreview.innerHTML = "";
    charCount.textContent = "0/280";

    loadPosts();
}

async function loadPosts(filter = "all"){

    const { data, error } = await supabaseClient
        .from("army_posts")
        .select("*")
        .order("created_at", { ascending:false });

    if(error){
        console.log(error);
        return;
    }

    const { data: comments, error: commentsError } = await supabaseClient
    .from("army_comments")
    .select("*");

    if(commentsError){
    console.log(commentsError);
    }

    feed.innerHTML = "";

    data.forEach(post => {

        if(filter === "photos" && !post.image_url){
            return;
        }

        const postComments = comments.filter(comment => comment.post_id === post.id);

        const postDate = new Date(post.created_at);

const now = new Date();

const diffMinutes =
Math.floor((now - postDate) / 1000 / 60);

let timeAgo;

if(diffMinutes < 1){

    timeAgo = "Just now";

}else if(diffMinutes < 60){

    timeAgo = `${diffMinutes} min ago`;

}else if(diffMinutes < 1440){

    timeAgo = `${Math.floor(diffMinutes / 60)}h ago`;

}else{

    timeAgo = postDate.toLocaleDateString();
}

        const firstLetter = post.author.charAt(0).toUpperCase();

        const postCard = document.createElement("div");
        postCard.classList.add("army-post");

        if(post.image_url){
            postCard.classList.add("has-photo");
        }

        postCard.innerHTML = `
            <div class="post-top">
                <div class="avatar-img">${firstLetter}</div>

                <div>
                    <h3>
                      ${post.author}
                       <span class="post-time">${timeAgo}</span>
                  </h3>
                </div>

                <span class="dots">•••</span>
            </div>

            <p>${post.message || ""}</p>

            ${post.image_url ? `<img class="post-photo" src="${post.image_url}" alt="ARMY photo">` : ""}

            <div class="post-icons">
                <button onclick="likePost(${post.id}, ${post.likes})">
                    ♡ <span>${post.likes}</span>
                </button>

                <button onclick="openComments(this)">
                 💬 <span>${postComments.length}</span>
                 </button>
            </div>

         <div class="comment-box">
              <input type="text" placeholder="Write a reply and press Enter..." onkeydown="addComment(event, ${post.id}, this)">

          <div class="comments-list">
            ${postComments.map(comment => `
              <div class="single-comment">${comment.comment_text}</div>
           `).join("")}
         </div>
</div>
        `;

        feed.appendChild(postCard);
    });
}

async function likePost(postId, currentLikes){

    let likedPosts =
    JSON.parse(localStorage.getItem("likedArmyPosts")) || [];

    if(likedPosts.includes(postId)){
        alert("You already liked this post ✦");
        return;
    }

    const { error } = await supabaseClient
        .from("army_posts")
        .update({ likes: currentLikes + 1 })
        .eq("id", postId);

    if(error){
        console.log(error);
        return;
    }

    likedPosts.push(postId);
    localStorage.setItem("likedArmyPosts", JSON.stringify(likedPosts));

    loadPosts();
}

function openComments(button){
    const post = button.closest(".army-post");
    const commentBox = post.querySelector(".comment-box");
    commentBox.classList.toggle("active");
}

function filterPosts(type, button){

    document.querySelectorAll(".tabs button").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    loadPosts(type);
}

async function addComment(event, postId, input){

    if(event.key !== "Enter"){
        return;
    }

    const text = input.value.trim();

    const bannedWords = [
    "fuck",
    "shit",
    "bitch",
    "hate",
    "idiot",
    "stupid",
    "kill",
    "racist"
];

const lowerText = text.toLowerCase();

const hasBadWord = bannedWords.some(word =>
    lowerText.includes(word)
);

if(hasBadWord){
    alert("Please keep this ARMY space respectful 💜");
    input.value = "";
    return;
}

    if(!text){
        return;
    }

    const { error } = await supabaseClient
        .from("army_comments")
        .insert([
            {
                post_id: postId,
                comment_text: text
            }
        ]);

    if(error){
        console.log(error);
        alert("Comment failed");
        return;
    }

    input.value = "";
    loadPosts();
}

loadPosts();