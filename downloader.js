var Request = require('request-promise');
var Archiver = require('archiver');

module.exports = function(context, req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream'    
    });
    var subreddit = context.data.subreddit || "pics";
    var mode = context.data.mode || "hot";
    var limit = context.data.number || "10";

    fetchImages(subreddit, mode, limit, res);
}

function fetchImages(subreddit, mode, limit, res) {
    var subredditURL = `https://www.reddit.com/r/${subreddit}/${mode}/.json?limit=${limit}`;
    var opts = {
        uri: subredditURL,
        headers: {
            'User-Agent': 'subreddit_image_downloader/1.0'
        },
        transform: (body) => {
            var data = JSON.parse(body)["data"]["children"];
            var images = [];
            for(var i=0; i<data.length; i++) {
                var image = data[i]["data"]["url"];
                if (image.endsWith(".jpg") || image.endsWith(".png")) {
                    images.push(image);
                }
            }
            return images;
        }
    };

    Request(opts).then((images) => {
        var archive = Archiver('zip', {
            zlib: { level: 9 }
        });
        Promise.all(images.map((image) => {
            var opts = {
                uri: image,
                encoding: null
            };
            return Request(opts);
        })).then((data) => {
            for(var i=0; i<data.length; i++) {
                archive.append(data[i], { name: `${i}.jpg` });
            }
            archive.finalize();
            res.writeHead(200, {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename="images.zip"'
            });
            archive.pipe(res);
        });
    });
}
