# Wen Zhong Academic Homepage

This repository contains a lightweight personal academic homepage designed for direct static deployment on GitHub Pages. It uses plain HTML, CSS, and a small amount of JavaScript so the content can be edited directly without any build step.

## Structure

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- .nojekyll
`-- assets/
    |-- portrait.jpg
    `-- Wen_Zhong_CV.pdf
```

## Edit Content

- Main page content lives in `index.html`.
- Visual style lives in `styles.css`.
- Small interactions such as section highlighting and publication toggling live in `script.js`.
- Replace `assets/portrait.jpg` if you want to update the profile photo later.
- Replace `assets/Wen_Zhong_CV.pdf` with your actual CV PDF when ready.
- Search for `TODO` comments in `index.html` to update placeholder publication and project links.

## Deploy To GitHub Pages

1. Create a GitHub repository and upload these files to the repository root.
2. In the repository settings, open `Pages`.
3. Set the source to `Deploy from a branch`.
4. Choose the branch that contains the site files, usually `main`, and set the folder to `/ (root)`.
5. Save the settings and wait for GitHub Pages to publish the site.

After publishing, your site will be available from the GitHub Pages URL associated with the repository.

## Notes

- The `.nojekyll` file is included so GitHub Pages serves the site as plain static files.
- No external framework or build tool is required.
- All external links in the page open in a new tab by default.
