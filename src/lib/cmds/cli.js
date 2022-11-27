#!/usr/bin/env node
const fs = require('fs')
const components = require('../repo/helpers/components.js')
const [,, ... args] = process.argv
const templatesDir =`${__dirname}/../components/form-components/`
const destination = `${process.cwd()}/src/components/form-components/`
if(args[0] == 'backup'){
    console.log('Creating component backup')
    const jsBackupFile =`${__dirname}/../repo/helpers/components.js`
    !fs.existsSync(destination) && fs.mkdirSync(destination,{ recursive: true })
    console.log(args)
    const components = []
    fs.readdirSync(templatesDir).map(file=>{
        console.log(`File - ${file}`)
        const src = `${templatesDir}${file}`
        let contents = fs.readFileSync(src,'utf8')
        contents = contents.replace(`import shApis from '../../repo/helpers/ShApis.js'`,`import { shApis } from '@iankibetsh/shframework'`)
        contents = contents.replace(`import countries from '../../repo/helpers/countries.js'`,`import { countries } from '@iankibetsh/shframework'`)
        components.push({
            fileName: file,
            contents: contents
        })
        //
    })
    const contents = `exports.components = ` + JSON.stringify(components)
    fs.writeFileSync(jsBackupFile,contents)
    console.log("DONE")
} else {
    console.log(`Copying form component files to ${destination}`)
    components.components.map(component=>{
        const file = component.fileName
        const contents = component.contents
        const dest = `${destination}${file}`
        if(!fs.existsSync(dest)){
            console.log(`Copy ${file} to ${destination}`)
            fs.writeFileSync(dest,contents)
        } else {
            console.log(`${file} Exists Already`)
        }
    })
}