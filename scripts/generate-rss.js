// https://github.com/leerob/leerob.io/blob/main/scripts/generate-rss.js
// https://github.com/hangindev/blog/blob/master/scripts/postbuild.js

const fs = require("fs");
const path = require("path");
const RSS = require('rss');
const cheerio = require("cheerio");

function isPageFile(filename) {
    return path.extname(filename) === ".html" && !filename.endsWith("404.html");
}


function getPageFiles(directory, files = []) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    entries.forEach(entry => {
        const absolutePath = path.resolve(directory, entry.name);
        if (entry.isDirectory()) {
            getPageFiles(absolutePath, files);
        } else if (isPageFile(absolutePath)) {
            files.push(absolutePath);
        }
    });
    return files;
}

function buildRss(pageFiles, pagesDir) {
    const rssData = new RSS({
        title: 'Ajutorul Educatorului',
        site_url: 'https://ajutoruleducatorului.ro',
        feed_url: 'https://ajutoruleducatorului.ro/feed.xml'
    });

    pageFiles.map((file) => {
        const pathname = path.relative(pagesDir, file).slice(0, -".html".length);

        if (pathname.startsWith("fise")) {
            const htmlString = fs.readFileSync(file, "utf8");
            const $ = cheerio.load(htmlString);
            rssData.item({
                url: $(`meta[property='og:url']`).attr("content"),
                id: pathname.substring("fise/".length),
                title: $(`meta[property='og:title']`).attr("content"),
                description: $(`meta[name='description']`).attr("content"),
                image: $(`meta[property='og:image']`).attr("content"),
            });
        }
        return rssData;
    },
    );
    fs.writeFileSync('./public/feed.xml', rssData.xml({ indent: true }));
}

function buildSiteMap(pageFiles) {
    const urls = pageFiles.map(file => {
        const htmlString = fs.readFileSync(file, "utf8");
        const $ = cheerio.load(htmlString);
        return $(`meta[property='og:url']`).attr("content");
    });
    const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
    xmlns:xhtml="http://www.w3.org/1999/xhtml" 
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${urls
            .map(
                url => {
                    if (url === undefined || url === "undefined") {
                        return (
                            `<url>
                                <loc>https://ajutoruleducatorului.ro</loc>
                            </url>`)
                    }
                    else {
                        return (
                            `<url>
                                <loc>${url}</loc>
                            </url>`
                        )
                    }
                }
            )
            .join("")}  
  </urlset>
  `;
    fs.writeFileSync('./public/sitemap.xml', sitemap);
}


function main() {
    // 'pages' location in Vercel environment
    let pagesDir = './.next/serverless/pages';
    const pageFiles = getPageFiles(pagesDir);
    buildRss(pageFiles, pagesDir);
    buildSiteMap(pageFiles);
}

main();

