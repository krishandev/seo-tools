"use client";

import { useState } from "react";

export default function FAQGenerator() {

  // =====================
  // STATES
  // =====================

  const [keyword,setKeyword] =
    useState("");

  const [count,setCount] =
    useState(10);

  const [loading,setLoading] =
    useState(false);

  const [error,setError] =
    useState("");

  const [result,setResult] =
    useState(null);

  const [expanded,setExpanded] =
    useState({});

  // =====================
  // API CALL
  // =====================

  async function generateFAQs(){

    if(!keyword){

      setError(
        "Keyword required"
      );

      return;

    }

    try{

      setLoading(true);

      setError("");

      setResult(null);

      const response =
      await fetch(
      "/api/faq-generator",
      {

      method:"POST",

      headers:{

      "Content-Type":
      "application/json"

      },

      body:
      JSON.stringify({

      keyword,

      count

      })

      }

      );

      const data =
      await response.json();

      if(!data.success){

        setError(
          data.message
        );

        return;

      }

      setResult(data);

    }

    catch(error){

      setError(
      "Something went wrong"
      );

      console.log(error);

    }

    finally{

      setLoading(false);

    }

  }

  // =====================
  // COPY FAQS
  // =====================

  function copyFAQs(){

    let text="";

    result?.faqs?.forEach(
    faq=>{

    text+=

`Q: ${faq.question}

A: ${faq.answer}


`;

    });

    navigator.clipboard.writeText(
    text
    );

    alert(
    "FAQs copied"
    );

  }

  // =====================
  // COPY SCHEMA
  // =====================

  function copySchema(){

    navigator.clipboard.writeText(

    JSON.stringify(

    result.schema,

    null,

    2

    )

    );

    alert(
    "Schema copied"
    );

  }

  // =====================
  // EXPAND FAQ
  // =====================

  function toggleFAQ(index){

    setExpanded({

      ...expanded,

      [index]:
      !expanded[index]

    });

  }

  return(

<main className="max-w-7xl mx-auto px-6 py-10">

{/* HEADER */}

<div className="mb-10">

<h1 className="text-5xl font-bold">

FAQ Generator

</h1>

<p className="text-gray-500 mt-3">

Generate SEO-friendly FAQs and FAQ schema instantly

</p>

</div>


{/* INPUT */}

<div className="bg-white rounded-3xl shadow p-6">

<div className="grid md:grid-cols-3 gap-5">

<input

type="text"

placeholder="Enter keyword"

value={keyword}

onChange={(e)=>

setKeyword(
e.target.value
)

}

className="border rounded-xl p-4 w-full"

/>


<select

value={count}

onChange={(e)=>

setCount(
e.target.value
)

}

className="border rounded-xl p-4"

>

<option value={5}>5 FAQs</option>

<option value={10}>10 FAQs</option>

<option value={15}>15 FAQs</option>

<option value={20}>20 FAQs</option>

</select>


<button

onClick={generateFAQs}

disabled={loading}

className={`rounded-xl text-white px-6 py-4

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

"Generating FAQs..."

:

"Generate FAQs"

}

</button>

</div>


{

error && (

<div className="mt-5 bg-red-100 text-red-600 p-4 rounded-xl">

{error}

</div>

)

}

</div>


{/* LOADING */}

{

loading &&

<div className="mt-8 bg-white rounded-3xl p-8 shadow">

<div className="flex gap-4 items-center">

<div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"/>

<p>

Generating SEO FAQs...

</p>

</div>

</div>

}


{/* EMPTY */}

{

!loading &&
!result &&

<div className="bg-gray-50 rounded-3xl p-16 text-center mt-10">

<div className="text-7xl">

❓

</div>

<h2 className="text-2xl font-bold mt-5">

Generate SEO FAQs using keywords

</h2>

</div>

}


{/* RESULTS */}

{

result?.success && (

<div className="mt-10 space-y-8">

{/* TOP */}

<div className="bg-white rounded-3xl p-6 shadow">

<div className="flex flex-wrap justify-between gap-5">

<div>

<h2 className="text-3xl font-bold">

Generated FAQs

</h2>

<p className="text-gray-500 mt-2">

Keyword:

{result.keyword}

</p>

<p>

Total FAQs:

{result.totalFAQs}

</p>

</div>

<button

onClick={copyFAQs}

className="bg-black text-white rounded-xl px-6 py-3"

>

Copy FAQs

</button>

</div>

</div>


{/* FAQS */}

<Section title="FAQs">

<div className="space-y-5">

{

result.faqs.map(

(faq,index)=>(

<FAQCard

key={index}

faq={faq}

index={index}

expanded={expanded[index]}

toggleFAQ={toggleFAQ}

/>

)

)

}

</div>

</Section>


{/* SCHEMA */}

<Section title="FAQ Schema">

<button

onClick={copySchema}

className="mb-5 bg-black text-white rounded-xl px-6 py-3"

>

Copy Schema

</button>

<pre className="bg-gray-100 rounded-xl p-5 overflow-auto text-sm">

{

JSON.stringify(

result.schema,

null,

2

)

}

</pre>

</Section>


{/* SEO */}

<Section title="SEO Suggestions">

<div className="space-y-3">

{

result.seoSuggestions.map(

(item,index)=>(

<div

key={index}

className="bg-green-50 p-4 rounded-xl"

>

✓ {item}

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


// =====================
// FAQ CARD
// =====================

function FAQCard({

faq,

index,

expanded,

toggleFAQ

}){

return(

<div className="bg-white rounded-3xl p-6 shadow hover:shadow-lg transition">

<div className="flex justify-between gap-5">

<h3 className="font-bold">

{faq.question}

</h3>

<button

onClick={()=>

toggleFAQ(index)

}

>

{

expanded

?

"−"

:

"+"

}

</button>

</div>


{

expanded && (

<p className="mt-5 text-gray-600">

{faq.answer}

</p>

)

}

</div>

);

}


// =====================
// SECTION
// =====================

function Section({

title,

children

}){

return(

<div className="bg-white rounded-3xl p-8 shadow">

<h3 className="text-2xl font-bold mb-6">

{title}

</h3>

{children}

</div>

);

}