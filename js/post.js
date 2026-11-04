// Blog yazısı — yazi.html?id=...
renderLayout("blog");

getPosts().then(posts => {
  const post = posts.find(x => String(x.id) === String(params.get("id")));
  if(!post){
    $("#article").innerHTML = `<div class="empty"><h1 style="font-size:26px;font-weight:500">Yazı bulunamadı</h1>
      <p style="margin:10px 0 20px">Yazı kaldırılmış ya da bağlantı hatalı olabilir.</p>
      <a href="blog.html" class="btn btn--green">Bloga Dön</a></div>`;
    $("#morePosts").classList.add("hidden");
    return;
  }
  document.title = `${post.title} | ${SITE.name}`;
  $("#postCrumbs").insertAdjacentHTML("beforeend", `<span>/</span><b>${esc(post.title)}</b>`);

  const paras = String(post.content || "").split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  $("#article").innerHTML = `
    ${post.image_url ? `<div class="article__cover"><img src="${esc(post.image_url)}" alt="${esc(post.title)}"></div>` : ""}
    <div class="article__meta">${post.category ? `<span>${esc(post.category)}</span>` : ""}<time>${formatDate(post.created_at)}</time></div>
    <h1>${esc(post.title)}</h1>
    <div class="article__body">${(paras.length ? paras : [post.excerpt || ""]).map(p => `<p>${esc(p)}</p>`).join("")}</div>
    <a class="btn btn--wa" style="margin-top:10px" href="${waLink(`Merhaba, "${post.title}" yazınızla ilgili bilgi almak istiyorum.`)}" target="_blank" rel="noopener">${ICON.whatsapp} Bu konuda bize sorun</a>`;

  const more = posts.filter(x => x.id !== post.id).slice(0, 3);
  if(more.length) $("#moreGrid").innerHTML = more.map(postCardHTML).join("");
  else $("#morePosts").classList.add("hidden");
});
