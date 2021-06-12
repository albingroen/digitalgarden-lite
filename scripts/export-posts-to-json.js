const fs = require("fs");

function exportPostsToJson() {
  const files = fs.readdirSync("../posts", "utf8");
  const posts = files.map((fileName) => {
    const fileContent = fs.readFileSync(`../posts/${fileName}`, "utf8");

    const lines = fileContent.split("\n");
    lines.splice(0, 1);
    const firstLine = lines[0];

    const title = firstLine.split("title: ")[1].split('"')[1];
    const slug = fileName.split(".mdx")[0];

    return {
      link: `https://blog.albingroen.com/posts/${slug}`,
      title,
    };
  });

  fs.writeFileSync("../public/posts.json", JSON.stringify(posts, null, 2));

  console.log("Done!");
}

exportPostsToJson();
