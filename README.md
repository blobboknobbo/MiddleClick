# MiddleClick - Image Embed/Redirector Generator

This is a simple project that allows users to create links to **embed images** (for Discord, Twitter, etc.) but **redirects users** when the image is opened **(middle clicked)**.

## How it works
- Bots like Discord are provided a preview of the image **(embeding it)**.
- Real users who middle click the image are instantly redirected to **your chosen URL**.
- Makes link appear like an **image link**; this allows it to be properly embedded.
- Able to upload **custom images**, as well as having an **automatic default**.

## Hosted Example
Try it live:  [middleclick.blobboknobbo.workers.dev](https://.middleclick.blobboknobbo.workers.dev)

## Files
- 'workers/redirect-worker.js' -Cloudflare Worker script handling **Link Generation**, **Image Embedding**, and **User Redirection**.
- 'images/moonlord.jpg' -Default fallback image.

## Setup
1. Clone the repo.
2. Deploy a Cloudflare Worker. This can be done by selecting from the Cloudflare Dashboard **"Compute (Workers)"**, then **"Workers & Pages"**, then selecting **"Create"** **DO NOT** use a template, select "**Hello World**" when creating it.
3. **Replace** the **starter Worker .js file** with the provided Worker file **(redirect-workers.js)**
4. Copy **your** Worker link, replacing **"INSERT-WORKER-LINK"** on line **51** with **your Worker link**
5. **(OPTIONAL)** Replace **https://raw.githubusercontent.com/blobboknobbo/MiddleClick/main/images/moonlord.jpg** on line **74** with your own default image link. **(NOTE: Link must direct to an image file specifically, not a webpage)** This can be left as is, using the default image from this Github Repository.
6. Select Deploy in the top right corner.

## Credit
The project was coded by me, **Blobboknobbo**.
If used, **provide credit** to **Blobboknobbo** **(This is as simple as providing a link to [github.com/blobboknobbo](https://github.com/blobboknobbo))**. Lots of work went into this project so all the support helps.

Enjoy this simple proof of concept, whether you use the example, or customize it and make your own changes **:)**
