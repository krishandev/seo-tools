import read from "text-readability";

export async function POST(req) {

try {

const body=
await req.json();

const { text }=
body;


// =========================
// VALIDATION
// =========================

if(

!text ||

text.trim().length<30

){

return Response.json({

success:false,

message:
"Minimum 30 characters required"

});

}


const cleanText=
text.trim();


// =========================
// BASIC ANALYSIS
// =========================

const words=

cleanText.match(/\b[\w']+\b/g)

|| [];

const sentences=

cleanText.match(/[^.!?]+[.!?]?/g)

|| [];

const paragraphs=

cleanText

.split(/\n\s*\n/)

.filter(Boolean);


const wordCount=
words.length;

const characterCount=
cleanText.length;

const sentenceCount=
Math.max(
1,
sentences.length
);

const paragraphCount=
Math.max(
1,
paragraphs.length
);

const averageWordsPerSentence=

Math.round(

wordCount/

sentenceCount

);

const readingTime=

Math.max(

1,

Math.ceil(

wordCount/200

)

);


// =========================
// SAFE SCORE FUNCTIONS
// =========================

function safeScore(fn){

try{

const value=
fn();

return Number.isNaN(value)

? 0
: Math.round(value);

}

catch{

return 0;

}

}


const fleschScore=

safeScore(

()=>read.fleschReadingEase(
cleanText
)

);

const fkGrade=

safeScore(

()=>read.fleschKincaidGrade(
cleanText
)

);

const fog=

safeScore(

()=>read.gunningFog(
cleanText
)

);

const coleman=

safeScore(

()=>read.colemanLiauIndex(
cleanText
)

);


// fallback because some versions don't have ARI

const ari=

typeof read.automatedReadabilityIndex==="function"

?

safeScore(

()=>read.automatedReadabilityIndex(
cleanText
)

)

:

0;


// difficult words fallback

const difficult=

typeof read.difficultWords==="function"

?

safeScore(

()=>read.difficultWords(
cleanText
)

)

:

0;


// =========================
// FLESCH STATUS
// =========================

function getFleschStatus(score){

if(score>=90)
return "Very Easy";

if(score>=80)
return "Easy";

if(score>=70)
return "Fairly Easy";

if(score>=60)
return "Standard";

if(score>=50)
return "Fairly Difficult";

if(score>=30)
return "Difficult";

return "Very Difficult";

}


// =========================
// PASSIVE VOICE
// =========================

const passivePatterns=[

/was\s+\w+/i,
/were\s+\w+/i,
/has\s+been\s+\w+/i,
/have\s+been\s+\w+/i,
/is\s+being\s+\w+/i,
/are\s+being\s+\w+/i

];

const passiveExamples=[];

sentences.forEach(sentence=>{

const found=

passivePatterns.some(

pattern=>

pattern.test(sentence)

);

if(found){

passiveExamples.push(

sentence.trim()

);

}

});

const passiveCount=

passiveExamples.length;

const passivePercentage=

Math.round(

(

passiveCount/

sentenceCount

)*100

);


// =========================
// TRANSITIONS
// =========================

const transitionList=[

"however",
"therefore",
"because",
"meanwhile",
"finally",
"moreover",
"for example",
"in addition",
"although",
"similarly"

];

const foundTransitions=[];

transitionList.forEach(

word=>{

const regex=

new RegExp(

`\\b${word}\\b`,

"gi"

);

const matches=

cleanText.match(
regex
);

if(matches){

foundTransitions.push({

word,

count:
matches.length

});

}

}

);


// =========================
// LONG SENTENCES
// =========================

const longSentences=

sentences.filter(

sentence=>{

const count=

sentence

.trim()

.split(/\s+/)

.length;

return count>20;

}

);


// =========================
// SEO SCORE
// =========================

let seoScore=100;

if(fleschScore<60)
seoScore-=20;

if(passivePercentage>15)
seoScore-=20;

if(foundTransitions.length<3)
seoScore-=15;

if(
averageWordsPerSentence>20
)
seoScore-=20;

if(
paragraphCount<2
)
seoScore-=10;

seoScore=
Math.max(
0,
seoScore
);


// =========================
// RECOMMENDATIONS
// =========================

const recommendations=[];

if(
passivePercentage>15
){

recommendations.push({

priority:"High",

message:
"Reduce passive voice usage"

});

}

if(
averageWordsPerSentence>20
){

recommendations.push({

priority:"Medium",

message:
"Reduce long sentences"

});

}

if(
foundTransitions.length<3
){

recommendations.push({

priority:"Medium",

message:
"Add transition words"

});

}

if(
fleschScore<60
){

recommendations.push({

priority:"High",

message:
"Improve readability score"

});

}


// =========================
// RESPONSE
// =========================

return Response.json({

success:true,

wordCount,
characterCount,
sentenceCount,
paragraphCount,
averageWordsPerSentence,

readingTime:
`${readingTime} min`,

fleschReadingEase:{

score:fleschScore,

status:
getFleschStatus(
fleschScore
)

},

fleschKincaid:{
grade:fkGrade
},

gunningFog:{
score:fog
},

colemanLiau:{
score:coleman
},

automatedReadability:{
score:ari
},

difficultWords:{
count:difficult
},

passiveVoice:{

count:
passiveCount,

percentage:
`${passivePercentage}%`,

examples:
passiveExamples

},

transitionWords:{

count:
foundTransitions.length,

words:
foundTransitions

},

longSentences:{

count:
longSentences.length,

sentences:
longSentences

},

seoScore:{

score:seoScore,

status:

seoScore>=80

? "Good"

: seoScore>=50

? "Average"

: "Poor"

},

recommendations

});

}

catch(error){

return Response.json({

success:false,

message:

error.message ||

"Something went wrong"

});

}

}