
const $post = document.querySelector("#post-body");
const $last = $post.lastElementChild;
const txt = $last.textContent;
const $links = [];

const $feedback = document.querySelector("aside.social-share");

const re = /\[\[\s*(.*?)\s*\]\]/g;
for (const match of txt.matchAll(re)) {
  $links.push( place(match[1] ));
}

if (!$links.length) return;

$last.remove();

$feedback.innerHTML = `<svg class="icon icon--comments"><use xlink:href="#icon-comments"></use></svg> Discuss on`;

for (let i = 0; i < $links.length; i++) {
  $feedback.append($links[i]);
  if( i+1 < $links.length ) $feedback.append("or");
}

function place(url) {
  const $link = document.createElement('a');
  $link.setAttribute("class", "godo-tracking p-2 inline-block hover:text-primary");
  $link.setAttribute("data-event-category", "Feedback");
  $link.setAttribute("data-event-action", "Social");
  $link.setAttribute("data-event-non-interactive", "true");
  $link.setAttribute("target", "_blank");
  $link.setAttribute("rel", "noopener noreferrer");

  let title;
  if (url.startsWith("https://twitter")) {
    title = "Twitter";
  } else if (url.startsWith("https://www.reddit.com/")){
    title = "Reddit";
  } else { 
    console.log("url not recognized", url);
    return;
  }

  const expl = `Comment on ${title}`;
  $link.setAttribute("data-event-label", title);
  $link.setAttribute("title", expl);
  $link.setAttribute("aria-label", expl);
  $link.setAttribute("href", url);
  $link.innerText = title;
  return $link;
}
