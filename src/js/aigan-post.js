
decorate_post();
function decorate_post() {
  const $post = document.querySelector("#post-body");
  if (!$post) return;
  const $last = $post.lastElementChild;
  const txt = $last.textContent;
  const $links = [];

  const $feedback = document.querySelector("aside.social-share");

  const re = /\[\[\s*(.*?)\s*\]\]/g;
  for (const match of txt.matchAll(re)) {
    const $link = place(match[1]);
    if (!$link) continue;
    $links.push($link);
  }

  if ($links.length) {
    // $last.remove(); // style will hide last paragraph. Don't remove it without changing that.
    $feedback.innerHTML = `<svg class="icon icon--comments"><use xlink:href="#icon-comments"></use></svg> Discuss on`;

    for (let i = 0; i < $links.length; i++) {
      $feedback.append($links[i]);
      if (i + 1 < $links.length) $feedback.append("and");
    }
  } else {
    $last.style.height = "auto";
  }
}

function place(url) {
  const $link = document.createElement('a');

  const title = url.match(/^https?:\/\/(www\.)?([^\.]+)/)[2];
  const expl = `Comment on ${title}`;

  for (const [key, value] of Object.entries({
    class: "godo-tracking p-2 inline-block underline underline-offset-4 hover:text-primary",
    "data-event-category": "Feedback",
    "data-event-action": "Social",
    "data-event-non-interactive": "true",
    "data-event-label": title,
    target: "_blank",
    rel: "noopener noreferrer",
    title: expl,
    "aria-label": expl,
    href: url,
  })) {
    $link.setAttribute(key, value);
  }

  $link.innerText = title;
  return $link;
}
