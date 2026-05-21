"use client";

import { useState } from "react";

export default function ReadabilityChecker() {

const [text,setText]=
useState("");

const [loading,setLoading]=
useState(false);

const [error,setError]=
useState("");

const [result,setResult]=
useState(null);


// =========================
// WORD COUNT
// =========================

const wordCount=

text
.trim()
.split(/\s+/)
.filter(Boolean)
.length;


// =========================
// COPY REPORT
// =========================

function copyResults(){

if(!result) return;

const report=`

WORD COUNT:
${result.wordCount}

CHARACTERS:
${result.characterCount}

SENTENCES:
${result.sentenceCount}

PARAGRAPHS:
${result.paragraphCount}

READING TIME:
${result.readingTime}

SEO SCORE:
${result.seoScore.score}/100

FLESCH SCORE:
${result.fleschReadingEase.score}

RECOMMENDATIONS:

${result.recommendations
.map(

item=>

`${item.priority}: ${item.message}`

)

.join("\n")}

`;

navigator
.clipboard
.writeText(
report
);

alert(
"Results copied"
);

}


// =========================
// CLEAR
// =========================

function clearText(){

setText("");

setResult(null);

setError("");

}


// =========================
// API
// =========================

async function analyzeContent(){

if(

text.trim().length<30

){

setError(
"Minimum 30 characters required"
);

return;

}

try{

setLoading(true);

setError("");

setResult(null);

const response=

await fetch(

"/api/readability-checker",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify({

text

})

}

);

const data=

await response.json();

if(

!data.success

){

setError(
data.message
);

return;

}

setResult(data);

}

catch(error){

console.log(error);

setError(
"Something went wrong"
);

}

finally{

setLoading(false);

}

}


// =========================
// SCORE COLOR
// =========================

function getScoreColor(score){

if(score>=80)
return "bg-green-500";

if(score>=50)
return "bg-yellow-500";

return "bg-red-500";

}


return(

<main className="max-w-7xl mx-auto px-6 py-10">


{/* HEADER */}

<div className="mb-10">

<h1 className="text-5xl font-bold">

Readability Checker

</h1>

<p className="text-gray-500 mt-3">

Analyze readability, readability scores, passive voice and SEO content quality.

</p>

</div>



{/* INPUT */}

<div className="bg-white rounded-3xl shadow p-6">

<textarea

rows={10}

value={text}

onChange={(e)=>

setText(
e.target.value
)

}

placeholder="Paste content here..."

className="w-full border rounded-xl p-5 resize-none outline-none"

/>


<div className="flex flex-wrap gap-6 mt-5 text-gray-500">

<p>

Words:

{wordCount}

</p>

<p>

Characters:

{text.length}

</p>

</div>


<div className="flex gap-4 mt-6 flex-wrap">

<button

onClick={analyzeContent}

disabled={loading}

className={`px-6 py-4 rounded-xl text-white

${

loading

?

"bg-gray-400"

:

"bg-black hover:bg-gray-800"

}

`}

>

{

loading

?

"Analyzing..."

:

"Analyze Content"

}

</button>


<button

onClick={clearText}

className="px-6 py-4 rounded-xl border"

>

Clear Text

</button>


<button

onClick={copyResults}

className="px-6 py-4 rounded-xl border"

>

Copy Results

</button>

</div>


{

error && (

<div className="bg-red-100 text-red-600 rounded-xl mt-5 p-4">

{error}

</div>

)

}

</div>



{/* LOADING */}

{

loading && (

<div className="bg-white rounded-3xl p-10 shadow mt-10">

<div className="flex gap-5 items-center">

<div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"/>

<p>

Analyzing readability...

</p>

</div>

</div>

)

}



{/* EMPTY */}

{

!loading &&
!result &&

(

<div className="bg-gray-50 rounded-3xl p-16 mt-10 text-center">

<div className="text-7xl">

📄

</div>

<h2 className="text-2xl font-bold mt-5">

Paste content to analyze readability

</h2>

</div>

)

}



{/* RESULTS */}

{

result?.success && (

<div className="space-y-8 mt-10">


{/* DASHBOARD */}

<div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">

<Card
title="Words"
value={result.wordCount}
/>

<Card
title="Characters"
value={result.characterCount}
/>

<Card
title="Sentences"
value={result.sentenceCount}
/>

<Card
title="Paragraphs"
value={result.paragraphCount}
/>

<Card
title="Reading Time"
value={result.readingTime}
/>

<Card
title="Avg Words"
value={result.averageWordsPerSentence}
/>

</div>



{/* SCORE */}

<div className="bg-white rounded-3xl shadow p-8">

<h2 className="text-3xl font-bold">

SEO Score

</h2>

<p className="mt-3 text-gray-500">

{result.seoScore.status}

</p>

<div className="mt-5 bg-gray-200 rounded-full h-6">

<div

className={`h-6 rounded-full

${

getScoreColor(

result.seoScore.score

)

}

`}

style={{

width:

`${result.seoScore.score}%`

}}

>

</div>

</div>

<h3 className="mt-5 text-5xl font-bold">

{result.seoScore.score}/100

</h3>

</div>



{/* METRICS */}

<Section title="Readability Metrics">

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

<Card

title="Flesch Reading"

value={

result.fleschReadingEase.score

}

/>

<Card

title="Flesch Grade"

value={

result.fleschKincaid.grade

}

/>

<Card

title="Gunning Fog"

value={

result.gunningFog.score

}

/>

<Card

title="Coleman"

value={

result.colemanLiau.score

}

/>

<Card

title="ARI"

value={

result.automatedReadability.score

}

/>

<Card

title="Difficult Words"

value={

result.difficultWords.count

}

/>

</div>

</Section>



{/* PASSIVE */}

<Section title="Passive Voice">

<p>

Count:

{result.passiveVoice.count}

</p>

<p>

Percentage:

{result.passiveVoice.percentage}

</p>

</Section>



{/* TRANSITIONS */}

<Section title="Transition Words">

<div className="flex gap-3 flex-wrap">

{

result.transitionWords.words.map(

(item,index)=>(

<span

key={index}

className="bg-blue-100 text-blue-700 px-3 py-2 rounded-full"

>

{item.word}

</span>

)

)

}

</div>

</Section>



{/* LONG */}

<Section title="Long Sentences">

{

result.longSentences.sentences.map(

(sentence,index)=>(

<div

key={index}

className="bg-gray-100 p-4 rounded-xl mb-3"

>

{sentence}

</div>

)

)

}

</Section>



{/* RECOMMENDATIONS */}

<Section title="Recommendations">

<div className="space-y-4">

{

result.recommendations.map(

(item,index)=>(

<div

key={index}

className="border rounded-xl p-5"

>

<span className="font-bold">

{item.priority}

</span>

<p>

{item.message}

</p>

</div>

)

)

}

</div>

</Section>

</div>

)

}

</main>

);

}



// =========================
// CARD
// =========================

function Card({

title,

value

}){

return(

<div className="bg-white rounded-3xl p-6 shadow">

<p className="text-gray-500">

{title}

</p>

<h3 className="text-3xl font-bold mt-2">

{value}

</h3>

</div>

);

}


// =========================
// SECTION
// =========================

function Section({

title,

children

}){

return(

<div className="bg-white rounded-3xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">

{title}

</h2>

{children}

</div>

);

}