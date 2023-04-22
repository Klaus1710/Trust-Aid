const path = require('path');
const solc = require('solc');
const fs= require('fs-extra');

const buildPath = path.resolve(__dirname,'build'); //path for the build folder which is having the compiled contracts
fs.removeSync(buildPath); //To delete the build folder in order to compile once again and store the new compiled file in the folder

const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');  //path for the Campaign.sol file
const source = fs.readFileSync(campaignPath,'utf8'); //utf8 is the encoding
const output = solc.compile(source,1).contracts; //output variable will be having both campaign factory and campaign creator contraacts

fs.ensureDirSync(buildPath);  //If build folder does not exist then it creates a new folder for build, simply ensures its existence

for(let contract in output){ //looping over the contracts in the output variable and building the build folder having the compiled code in json.
    fs.outputJSONSync( //this function is just gonna write the compile files
        path.resolve(buildPath , contract.replace(':','') +'.json'), //it is going to provide the path
        output[contract] //this is the actual output which the files are going to have
    );
}
