var express     = require('express');
var fs          = require('fs');
var request     = require('request');
var cheerio     = require('cheerio');
var app         = express();
var bodyParser  = require('body-parser')
var connect     = require('connect');
var http        = require('http');
var path        = require('path');

var natural = require('natural');

tokenizer = new natural.WordTokenizer();

// View Engine Setup //
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var wikiraw;
var wikisplit;
var wikinext;
var arrayCount;
var arrayIndex = [];
var output;
var num;
var count;
var inputFile;
var useLocalFile;
var repetitions;
var testfield;
var HTTPReq;

var input;
var input2;
var input3;
var input4;
var finished;

app.get('/', function(req, res) {
    res.render('index');   
});

app.use(function(req, res){
    
    repetitions = 5;
    finished = 0;
    HTTPReq = "";
    useLocalFile = false;
    
    input = req.path;
    input2 = input.split('_');
    input3 = input2.join(' ');
    
    if(useLocalFile == true) {
        fs.readFile('input.html', function read(err, data) {
            if (err) {
                throw err;
            }
            
            inputFile = data;
            
            var $ = cheerio.load(inputFile);
            
            $('#mw-content-text').each(function() {
                wikiraw = $(this).text();
                
                console.log("Before Split");
                wikisplit = wikiraw.split(".");
                console.log("After Split");
                
                arrayCount = 0;
                arrayIndex = [];
                wikinext = tokenizer.tokenize(wikisplit[arrayCount]);
                console.log(wikinext);
        
                while(arrayIndex.length <= repetitions) {
                    
                    if ((wikinext.indexOf('is') >= 0 || wikinext.indexOf('are') >= 0) && !(wikinext.indexOf('article') >= 0)) {
                        
                        //if(wikinext.indexOf('article') == 0) {
                            
                            if(arrayIndex.length <= repetitions) {
                                
                                arrayIndex.push(arrayCount);
                                //console.log(tokenizer.tokenize(wikisplit[arrayCount]));
                            
                                arrayCount += 1;
                                console.log(arrayCount);
                                wikinext = tokenizer.tokenize(wikisplit[arrayCount]);
                                console.log(wikinext);
                            
                                if(arrayIndex.length == repetitions) {
                                
                                    //console.log(arrayIndex.length)
                                
                                    for (i = 0; i < arrayIndex.length; i++) {
                                        num = arrayIndex[i];
                                        if(wikisplit[num].charAt(0) == "[") {
                                            textfield = wikisplit[num].substring(1);
                                            if(wikisplit[num].charAt(1) != "]") {
                                                textfield = wikisplit[num].substring(2);
                                                //if(wikisplit[num].charAt)
                                            }
                                            
                                            else {
                                                output += "<li>" + wikisplit[num] + "</li>" + "<br />";
                                                console.log(output);    
                                            }
                                        }
                                        
                                        else {
                                            output += "<li>" + wikisplit[num] + "</li>" + "<br />";
                                            console.log(output);      
                                        }
                                    }
                                    
                                    console.log(output);
                                    input4 = input3.substring(1);
                                    res.render('answer', {answer: output, input: input4});
                                    console.log(input3);
                                }
                            }
                            
                            else {
                                //res.send(output);
                                console.log("End"); 
                            }
                        //}
                        
                        //else {
                            arrayCount += 1;
                            console.log(arrayCount);
                            wikinext = tokenizer.tokenize(wikisplit[arrayCount]);
                        //}
                    }
                    
            
                    else {
                        arrayCount += 1;
                        console.log(arrayCount);
                        wikinext = tokenizer.tokenize(wikisplit[arrayCount]);
                        
                    }
                    
                }
                
            });
            
        });   
    }
    
    output = "";
    
    count = 0;
    
	url = 'http://en.wikipedia.org/wiki' + input;

    if(useLocalFile == false) {
        
        HTTPReq = request(url).pipe(fs.createWriteStream('input.html'));
        HTTPReq.on('finish', function() {
        
        fs.readFile('input.html', function read(err, data) {
            if (err) {
                throw err;
            }
            
            inputFile = data;
            
            var $ = cheerio.load(inputFile);
            
            $('#mw-content-text').each(function() {
                wikiraw = $(this).text();
                
                //console.log("Before Split");
                wikisplit = wikiraw.split(".");
                //console.log("After Split");
                
                arrayCount = 0;
                arrayIndex = [];
                wikinext = tokenizer.tokenize(wikisplit[arrayCount]);
                
                //console.log(wikinext);
        
                while(arrayIndex.length <= repetitions) {
                    
                    if ((wikinext.indexOf('is') >= 0 || wikinext.indexOf('are') >= 0) && !(wikinext.indexOf('article') >= 0)) {
                        
                        //if(wikinext.indexOf('article') == 0) {
                            
                            if(arrayIndex.length <= repetitions) {
                                
                                arrayIndex.push(arrayCount);
                                
                                if(finished == 0) {
                                arrayCount += 1;
                                //console.log(arrayCount);
                                //wikinext = tokenizer.tokenize(wikisplit[arrayCount]);
                                }
                                
                                //console.log(wikinext);
                            
                                if(arrayIndex.length == repetitions) {
                                
                                    //console.log(arrayIndex.length)
                                
                                    for (i = 0; i < arrayIndex.length; i++) {
                                        num = arrayIndex[i];
                                        /*if(wikisplit[num].charAt(0) == "[") {
                                            textfield = wikisplit[num].substring(1);
                                            console.log(textfield);
                                            if(wikisplit[num].charAt(1) != "]") {
                                                textfield = wikisplit[num].substring(1);
                                                output += "<li>" + textfield + "</li>" + "<br />";
                                                //if(wikisplit[num].charAt)
                                            }
                                            
                                            else {
                                                output += "<li>" + wikisplit[num] + "</li>" + "<br />";
                                                //console.log(output);    
                                            }
                                        } */
                                        
                                        //else {
                                            output += "<li>" + wikisplit[num] + "</li>" + "<br />";
                                            //console.log(output);      
                                        //}
                                    }
                                    
                                    //console.log(output);
                                    input4 = input3.substring(1);
                                    res.render('answer', {answer: output, input: input4});
                                    finished = 1;
                                    //console.log(input3);
                                }
                            }
                        //}
                        
                        //else {
                        if(finished = 0) {
                            arrayCount += 1;
                            //console.log(arrayCount);
                            wikinext = tokenizer.tokenize(wikisplit[arrayCount]);
                        //}
                        }
                    }
                    
            
                    else {
                        arrayCount += 1;
                        //console.log(arrayCount);
                        wikinext = tokenizer.tokenize(wikisplit[arrayCount]);
                        
                    }
                    
                }
                
            });
            
        });
        });   
    }
})

app.listen('1111')
console.log('API runs on port 1111');
exports = module.exports = app;