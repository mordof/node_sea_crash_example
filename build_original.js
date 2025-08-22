// this will build SEA exe from blob

const { copyFile } = require('fs/promises')
const { exec: _exec } = require('child_process')
const { promisify } = require('util')

const exec = promisify(_exec)

const jsonName = 'original_sea.json';
const outName = 'dist/original.exe';
const blobName = 'dist/original.blob';

(async () => {
    // copy the node exe to the dist folder
    console.log('Copying the Node .exe...')
    await copyFile(process.execPath, outName)

    // generate the SEA blob
    console.log('Building the Blob...')
    await exec(`node --experimental-sea-config ${jsonName}`);

    // inject the SEA blob into the EXE
    console.log('Injecting the Blob...')
    await exec(`postject "${outName}" NODE_SEA_BLOB ${blobName} --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 --overwrite`)

    console.log('Done!')
})()
