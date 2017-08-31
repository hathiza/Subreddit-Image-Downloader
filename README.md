# Subreddit Image Downloader
This is a WebTask that lets you download a ZIP of all JPG/PNG files present on a subreddit. It supports the following query string parameters:
- subreddit (default is **pics**)
- mode (hot | new | rising | controversial | top) - default is **hot**
- number (default is **10** files, maximum is 100)

Examples:

```
https://ENDPOINT?subreddit
```

```
https://ENDPOINT?subreddit=mildlyinteresting
```

```
https://ENDPOINT?subreddit=mildlyinteresting&mode=new&limit=20
```
