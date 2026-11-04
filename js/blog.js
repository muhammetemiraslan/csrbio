// Blog listesi
renderLayout("blog");

getPosts().then(posts => {
  $("#blogGrid").innerHTML = posts.length
    ? posts.map(postCardHTML).join("")
    : `<div class="empty">Henüz yazı eklenmedi, çok yakında burada olacak.</div>`;
});
