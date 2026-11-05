// ==========================================================
// Blog yazısı — /yazi/<slug>/  (eski adres: yazi.html?id=...)
// ==========================================================
renderLayout("blog");

function ensurePostRoot(){
  if(!$("#article")){
    $(".footer").insertAdjacentHTML("beforebegin", `<main>
      <section class="page-head"><nav class="crumbs" id="postCrumbs"><a href="index.html">Anasayfa</a><span>/</span><a href="blog.html">Blog</a></nav></section>
      <article class="article" id="article"><div class="skeleton" style="height:360px"></div></article>
      <section class="section" style="padding-top:0" id="morePosts">
        <div class="container">
          <h2 class="section-title" style="font-weight:400">Diğer Yazılar</h2>
          <div class="blog-grid" id="moreGrid"></div>
        </div>
      </section>
    </main>`);
  }
  return $("#article");
}

const postRoot = ensurePostRoot();

getPosts().then(posts => {
  if(!posts.length && postRoot.dataset.prerendered) return;

  const m = location.pathname.match(/\/yazi\/([^/]+)\/?$/);
  const slug = m ? decodeURIComponent(m[1]) : "";
  const id = params.get("id");
  const post = posts.find(x => (slug && x.slug === slug) || (id && String(x.id) === String(id)));
  if(!post){
    postRoot.innerHTML = `<div class="empty"><h1 style="font-size:26px;font-weight:500">Yazı bulunamadı</h1>
      <p style="margin:10px 0 20px">Yazı kaldırılmış ya da bağlantı hatalı olabilir.</p>
      <a href="blog.html" class="btn btn--green">Bloga Dön</a></div>`;
    $("#morePosts").classList.add("hidden");
    return;
  }
  document.title = `${post.title} | ${SITE.name}`;
  $("#postCrumbs").innerHTML = `<a href="index.html">Anasayfa</a><span>/</span><a href="blog.html">Blog</a><span>/</span><b>${esc(post.title)}</b>`;
  postRoot.innerHTML = articleHTML(post);

  const more = posts.filter(x => x.id !== post.id).slice(0, 3);
  if(more.length) $("#moreGrid").innerHTML = more.map(postCardHTML).join("");
  else $("#morePosts").classList.add("hidden");
});
