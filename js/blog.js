// Blog listesi
renderLayout("blog");

getPosts().then(posts => {
  const grid = $("#blogGrid");
  if(!posts.length && grid.dataset.prerendered) return;
  grid.innerHTML = posts.length
    ? posts.map(postCardHTML).join("")
    : `<div class="empty">Henüz yazı eklenmedi, çok yakında burada olacak.</div>`;
});
