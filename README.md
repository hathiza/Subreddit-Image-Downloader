# Subreddit Image Downloader
This is a WebTask that lets you download a ZIP of all JPG/PNG files present on a subreddit. It supports the following query string parameters:
- subreddit (default value is **pics**)
- mode (hot | new | rising | controversial | top) - default value is **hot**
- number (default value is **10**) - The ZIP file will contain a maximum of `number` files
- after - Any post older than this post id will not considered

Examples:

```
https://ENDPOINT?subreddit
```

```
https://ENDPOINT?subreddit=mildlyinteresting
```

```
https://ENDPOINT?subreddit=mildlyinteresting&mode=new&number=20
```
