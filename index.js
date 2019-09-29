const metadataParser = require('markdown-yaml-metadata-parser');
var showdown = require('showdown');
var converter = new showdown.Converter();
const fs = require('fs')
const posts = './posts'

fs.readdir(posts, function(error, filelist){
    const l = filelist.length
    let info = []
    for(let i=0;i<l;i++){
        const data = fs.readFileSync(posts+'/'+filelist[i],'utf8')
        const result = metadataParser(data);
        result.content = converter.makeHtml(result.content)
        console.log(result.metadata.url)
        fs.writeFileSync('./db/post/'+result.metadata.url+'.json', JSON.stringify(result), 'utf8')
        info.push(result.metadata)
    }
    fs.writeFileSync('./db/info.json', JSON.stringify(info), 'utf8')
})